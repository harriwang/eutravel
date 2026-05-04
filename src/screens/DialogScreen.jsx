import { useState, useEffect, useRef } from "react";
import { CITIES, SUGGESTED_QUESTIONS } from "../../data.js";
import { CHARACTERS, DUAL_DIALOG, getCharactersByCity } from "../../characters.js";
import { parseDualDialog } from "../../lib/dialog-parser.js";
import { useStore, store } from "../store.js";

export default function DialogScreen({ cityId, onBack }) {
  const state = useStore();
  const city = CITIES[cityId];
  const chars = getCharactersByCity(cityId);
  const dual = DUAL_DIALOG[cityId];
  const suggestions = SUGGESTED_QUESTIONS[cityId] || [];
  const dialog = state.dialogs?.[cityId] || [];

  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [err, setErr] = useState("");
  const bodyRef = useRef(null);

  // 自动滚到底
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [dialog, sending]);

  // 自动放上"开场金句 + 引言"消息
  useEffect(() => {
    if (dialog.length === 0) {
      const intros = chars.map(c => ({
        role: "assistant",
        type: "quote",
        speakerId: c.id,
        speakerName: c.nameZh,
        speakerEmoji: c.emoji,
        speakerColor: c.color,
        original: c.quote.original,
        zh: c.quote.zh,
        source: c.quote.source,
      }));
      const greeting = {
        role: "assistant",
        type: "text",
        speakerId: chars[0].id,
        speakerName: chars[0].nameZh,
        speakerEmoji: chars[0].emoji,
        speakerColor: chars[0].color,
        content: `欢迎来到${city.nameZh}。我和${chars[1].nameZh}都在,问吧。`,
      };
      store.setDialog(cityId, [...intros, greeting]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cityId]);

  async function send(text) {
    const t = (text ?? draft).trim();
    if (!t || sending) return;
    setErr("");

    // user bubble
    store.appendDialog(cityId, {
      role: "user",
      type: "text",
      content: t,
    });
    setDraft("");
    setSending(true);

    // 历史:把过去的消息映射成 OpenAI 格式
    // 跳过 type==='quote'(那是 UI 装饰),只送实际对话
    const history = (state.dialogs?.[cityId] || [])
      .filter(m => m.type === "text")
      .map(m => ({
        role: m.role,
        content: m.role === "assistant"
          ? `[${m.speakerName}]\n${m.content}`
          : m.content,
      }));

    try {
      const r = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system: dual.systemPrompt,
          user: t,
          history,
        }),
      });
      if (!r.ok) {
        const data = await r.json().catch(() => ({}));
        throw new Error(data.error || `chat failed: ${r.status}`);
      }
      const data = await r.json();
      const text = (data.text || "").trim();
      if (!text) throw new Error("LLM 返回为空");

      // 解析双人对话格式
      const bubbles = parseDualDialog(text, chars);
      // 把每段拆成单独的 dialog 消息
      bubbles.forEach(b => {
        const ch = chars.find(c => c.id === b.speakerId) || chars[0];
        store.appendDialog(cityId, {
          role: "assistant",
          type: "text",
          speakerId: ch.id,
          speakerName: ch.nameZh,
          speakerEmoji: ch.emoji,
          speakerColor: ch.color,
          content: b.content,
        });
      });
    } catch (e) {
      setErr(e.message || "发送失败");
    } finally {
      setSending(false);
    }
  }

  function onTextareaKey(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <div className="dialog-screen">
      <header className="dialog-header">
        <button className="back-btn" onClick={onBack}>← {city.nameZh}</button>
        <p className="dialog-title">
          <span className="dialog-title-emojis">
            {chars.map(c => c.emoji).join('')}
          </span>
          {chars.map(c => c.nameZh).join(' & ')}
        </p>
      </header>

      <div className="dialog-body" ref={bodyRef}>
        {dialog.map((msg, i) => {
          if (msg.role === "user") {
            return (
              <div key={i} className="bubble-user-wrap">
                <div className="bubble-user">{msg.content}</div>
              </div>
            );
          }
          if (msg.type === "quote") {
            return (
              <div key={i} className="bubble-group">
                <div className="bubble-speaker" style={{ color: msg.speakerColor }}>
                  <span className="emoji">{msg.speakerEmoji}</span>{msg.speakerName}
                </div>
                <div className="bubble bubble-quote" style={{ color: msg.speakerColor }}>
                  <p className="bubble-quote-original">「{msg.original}」</p>
                  <p className="bubble-quote-zh">「{msg.zh}」</p>
                  <p className="bubble-quote-attr">— {msg.source}</p>
                </div>
              </div>
            );
          }
          // 普通文本气泡
          return (
            <div key={i} className="bubble-group">
              <div className="bubble-speaker" style={{ color: msg.speakerColor }}>
                <span className="emoji">{msg.speakerEmoji}</span>{msg.speakerName}
              </div>
              <div
                className="bubble"
                style={{
                  background: hexToRgba(msg.speakerColor, 0.08),
                  borderLeft: `2px solid ${msg.speakerColor}`,
                }}
              >
                {msg.content}
              </div>
            </div>
          );
        })}

        {sending && (
          <div className="dialog-typing">
            <span className="dot">·</span>
            <span className="dot">·</span>
            <span className="dot">·</span>
          </div>
        )}

        {err && <div className="gate-error">{err}</div>}
      </div>

      {dialog.length <= chars.length + 1 && suggestions.length > 0 && (
        <div className="suggested">
          {suggestions.map((q, i) => (
            <button
              key={i}
              className="suggested-chip"
              onClick={() => send(q)}
              disabled={sending}
            >
              {q}
            </button>
          ))}
        </div>
      )}

      <div className="dialog-input-row">
        <textarea
          className="dialog-input"
          placeholder="问点什么…"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={onTextareaKey}
          rows={1}
          disabled={sending}
        />
        <button
          className="dialog-send"
          onClick={() => send()}
          disabled={sending || !draft.trim()}
        >
          发送
        </button>
      </div>
    </div>
  );
}

// 把 hex 颜色转成带 alpha 的 rgba
function hexToRgba(hex, alpha) {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
