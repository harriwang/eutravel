// ═══════════════════════════════════════════
// dialog-parser.js
// 把 LLM 返回的双人对话文本拆成气泡数组
// ═══════════════════════════════════════════
//
// 输入(LLM 原始输出):
//   "[米开朗基罗]
//    大卫不是市政厅广场那个,是学院美术馆的本体。
//    
//    [但丁]
//    我那个时代还没有大卫——我去世 200 年后才有的。"
//
// 输出(气泡数组):
//   [
//     { speakerName: '米开朗基罗', content: '大卫不是市政厅广场那个,...' },
//     { speakerName: '但丁',       content: '我那个时代还没有大卫——...' },
//   ]
//
// 用法:在前端拿到 /api/chat 的 text 后调用:
//   const bubbles = parseDualDialog(response.text, characters);
//   bubbles.forEach(b => renderBubble(b));

/**
 * 解析双人对话文本
 * @param {string} text  — LLM 原始输出
 * @param {Object[]} characters — 城市的两个角色 [{ id, nameZh, ... }]
 * @returns {Array<{ speakerId, speakerName, content }>}
 */
export function parseDualDialog(text, characters = []) {
  if (typeof text !== 'string' || !text.trim()) return [];

  // 用正则把 [名字] 当分隔符 —— 用名字的中文版匹配
  // 同时兼容方括号和中文括号
  const namePattern = characters
    .map(c => escapeRegex(c.nameZh))
    .filter(Boolean)
    .join('|');

  if (!namePattern) {
    // 没有角色信息,作为单条消息返回
    return [{ speakerId: null, speakerName: null, content: text.trim() }];
  }

  // 匹配  [名字] 或 【名字】 或 「名字」
  const re = new RegExp(
    `[\\[【「](${namePattern})[\\]】」]\\s*`,
    'g',
  );

  // 用正则切分文本
  const parts = [];
  let lastIndex = 0;
  let lastSpeaker = null;
  let m;

  while ((m = re.exec(text)) !== null) {
    if (m.index > lastIndex && lastSpeaker) {
      parts.push({
        speakerName: lastSpeaker,
        content:     text.slice(lastIndex, m.index).trim(),
      });
    } else if (m.index > lastIndex && !lastSpeaker) {
      // 第一个标签前面有内容 —— 没有归属,丢弃或作为系统消息
      // 这里我们丢弃(LLM 偶尔会先说一句旁白)
    }
    lastSpeaker = m[1];
    lastIndex   = re.lastIndex;
  }

  // 最后一段
  if (lastIndex < text.length && lastSpeaker) {
    parts.push({
      speakerName: lastSpeaker,
      content:     text.slice(lastIndex).trim(),
    });
  }

  // 兜底:如果根本没匹配到任何 [名字] 标记
  // 把整段当做第一个角色说的话(避免内容丢失)
  if (parts.length === 0 && characters.length > 0) {
    parts.push({
      speakerName: characters[0].nameZh,
      content:     text.trim(),
    });
  }

  // 给每段附上 speakerId
  return parts
    .filter(p => p.content) // 去掉空内容
    .map(p => {
      const char = characters.find(c => c.nameZh === p.speakerName);
      return {
        speakerId:   char?.id || null,
        speakerName: p.speakerName,
        content:     p.content,
      };
    });
}

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// ═══════════════════════════════════════════
// 自检 — 跑一遍小例子(开发时取消注释验证)
// ═══════════════════════════════════════════
/*
const sample = `[米开朗基罗]
大卫不是市政厅广场那个,是学院美术馆的本体。

[但丁]
我那个时代还没有大卫——我去世 200 年后才有的。`;

const chars = [
  { id: 'michelangelo', nameZh: '米开朗基罗' },
  { id: 'dante',        nameZh: '但丁' },
];

console.log(parseDualDialog(sample, chars));
// 应输出:
// [
//   { speakerId: 'michelangelo', speakerName: '米开朗基罗', content: '大卫不是市政厅广场那个,是学院美术馆的本体。' },
//   { speakerId: 'dante',        speakerName: '但丁',       content: '我那个时代还没有大卫——我去世 200 年后才有的。' },
// ]
*/
