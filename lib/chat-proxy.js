// ═══════════════════════════════════════════
// LLM Chat Proxy — OpenAI-compatible
// 默认 OpenAI gpt-4o-mini, 兼容所有 OpenAI 格式 API
// ═══════════════════════════════════════════
//
// 切换提供商:改环境变量 LLM_ENDPOINT + LLM_MODEL + LLM_API_KEY
//   - OpenAI         : api.openai.com (默认)
//   - DeepSeek       : api.deepseek.com (省钱开发用)
//   - Moonshot/Kimi  : api.moonshot.cn (国内访问稳定)
//
// 支持多轮对话 — 前端把历史消息一并传过来

const DEFAULT_ENDPOINT = "https://api.openai.com/v1/chat/completions";
const DEFAULT_MODEL    = "gpt-4o-mini";

export async function createChatResponse({
  method   = "POST",
  system,           // 系统 prompt(双人对话合体 prompt)
  user,             // 用户当前消息
  history,          // 多轮历史 [{role:'user'|'assistant', content:'...'}]
  apiKey   = process.env.LLM_API_KEY    || process.env.OPENAI_API_KEY,
  endpoint = process.env.LLM_ENDPOINT   || DEFAULT_ENDPOINT,
  model    = process.env.LLM_MODEL      || DEFAULT_MODEL,
}) {
  if (method !== "POST") {
    return {
      status:  405,
      headers: { Allow: "POST" },
      body:    { error: "Method not allowed" },
    };
  }

  const normalizedKey = apiKey?.trim().replace(/^Bearer\s+/i, "");
  if (!normalizedKey) {
    return {
      status: 500,
      body: {
        code:  "no-key",
        error: "缺少 API Key —— 请在环境变量配置 LLM_API_KEY 或 OPENAI_API_KEY",
      },
    };
  }

  if (typeof user !== "string" || !user.trim()) {
    return {
      status: 400,
      body:   { code: "bad-request", error: "Missing user message" },
    };
  }

  // 组装 messages: system → 历史 → 当前用户消息
  const messages = [];
  if (typeof system === "string" && system.trim()) {
    messages.push({ role: "system", content: system.slice(0, 8000) });
  }

  // 历史消息(多轮),最多保留最近 10 轮防 token 爆炸
  if (Array.isArray(history)) {
    for (const msg of history.slice(-10)) {
      if (
        msg &&
        (msg.role === "user" || msg.role === "assistant") &&
        typeof msg.content === "string" &&
        msg.content.trim()
      ) {
        messages.push({
          role:    msg.role,
          content: msg.content.slice(0, 1500),
        });
      }
    }
  }

  messages.push({ role: "user", content: user.slice(0, 2000) });

  try {
    const response = await fetch(endpoint, {
      method:  "POST",
      headers: {
        "Content-Type":  "application/json",
        Authorization:   `Bearer ${normalizedKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        max_tokens:  500,
        temperature: 0.85,  // 角色扮演稍高,有人味
      }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      return {
        status: response.status,
        body: {
          code:  "llm-error",
          error: data.error?.message || `LLM API 请求失败 (${response.status})`,
        },
      };
    }

    return {
      status: 200,
      body: {
        text:  data.choices?.[0]?.message?.content || "",
        usage: data.usage,
      },
    };
  } catch {
    return {
      status: 502,
      body: {
        code:  "network-error",
        error: "网络错误,无法连接到 LLM 服务",
      },
    };
  }
}
