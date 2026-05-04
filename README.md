# eutravel

巴黎 → 普罗旺斯 / 蔚蓝海岸 → 威尼斯 → 佛罗伦萨 → 罗马
2026.5.16 — 5.31

---

## 项目结构

```
eutravel/
├── api/
│   ├── chat.js          LLM 对话代理
│   ├── upload.js        抵达照片上传
│   └── sync.js          口令 + 状态云同步
├── src/
│   ├── main.jsx         入口
│   ├── App.jsx          路由
│   ├── store.js         全局状态
│   ├── styles.css       全局样式
│   └── screens/
│       ├── GateScreen.jsx       口令登录/注册
│       ├── WelcomeScreen.jsx    欢迎页(每口令只看一次)
│       ├── HomeScreen.jsx       全程清单
│       ├── ArrivalScreen.jsx    抵达打卡上传
│       ├── CityScreen.jsx       城市详情
│       ├── DialogScreen.jsx     双人对话
│       └── PosterScreen.jsx     海报弹窗
├── lib/
│   ├── chat-proxy.js
│   ├── dialog-parser.js
│   ├── poster-canvas.js
│   └── unlock-state.js
├── data.js              5 城 + 景点 + 名言
├── characters.js        9 角色 + 双人对话 prompt
├── index.html
├── vite.config.js
└── package.json
```

---

## 部署到 Vercel —— 完整步骤

### Step 1. GitHub 建仓库

1. 去 https://github.com/new
2. 仓库名:`eutravel`,选 **Private**
3. 不勾任何额外文件,点 `Create repository`
4. 把本目录所有文件传上去(除了 `node_modules/`、`dist/`、`.env*`)
   - 网页:`Add file → Upload files`,把整个文件夹拖进去 → commit

### Step 2. Vercel 导入

1. 去 https://vercel.com,用 **GitHub 登录**
2. Dashboard → `Add New... → Project`
3. 找到 `eutravel`,点 `Import`
4. 配置页:
   - **Framework Preset**: Vite (自动识别)
   - **Build Command**: `npm run build` (默认)
   - **Output Directory**: `dist` (默认)

### Step 3. 配置环境变量(关键)

在 Vercel 的导入配置页,**展开 Environment Variables**,添加 **3** 条:

| Name | Value |
|---|---|
| `LLM_API_KEY` | `sk-...` 你的 OpenAI key |
| `LLM_ENDPOINT` | `https://api.openai.com/v1/chat/completions` |
| `LLM_MODEL` | `gpt-4o-mini` |

每条加完点 `Add`。**Vercel 加密存储,看不到也不进 GitHub。**

### Step 4. Deploy

点 `Deploy`,等 1–2 分钟。完成后 Vercel 给你一个 `xxxxx.vercel.app` 网址。

### Step 5. 配 Vercel Blob(照片存储 + 用户数据)

1. 进项目 Dashboard → 点 `Storage` 标签
2. `Create Database` → 选 **Blob**
3. 起个名字(随便),点创建
4. 完成 — Vercel 自动注入 `BLOB_READ_WRITE_TOKEN` 环境变量,并触发重新部署

### Step 6. 测试

打开 `xxxxx.vercel.app`:
1. 选 **登录** Tab,输入 `test`,点进入 → 应该跳到欢迎页
2. 看完欢迎页,点"开始冒险" → 进首页
3. 点任何一个城市 → 上传一张照片 → 应该解锁
4. 进城市 → 点对话 CTA → 应该看到两个人的开场金句和欢迎消息

---

## 测试口令(预创建)

| 口令 | 用途 |
|---|---|
| `test` | 第一次输入会自动看欢迎页;之后再输入直接进首页 |
| `test2` | 同上,留给你测多账号互不干扰 |

`xiaomaoAdventure` 是你将来真旅行用的口令,不要预先在测试时用掉它(否则欢迎页就被消耗了,真旅行时看不到了)。

---

## 重新看欢迎页(开发调试用)

如果你想再看一次欢迎页:

1. 在浏览器 DevTools → Console 输入:
   ```js
   localStorage.removeItem('eutravel:passcode');
   localStorage.removeItem('eutravel:state');
   location.reload();
   ```
2. 用一个新口令重新创建(不要用 `test` 或 `test2`,因为它们的 welcomeSeen 已经被你 mark 了)

或者:用 `test3`、`test4` 这种新口令,自动会经历"创建 → 欢迎"流程一次。

---

## 切换 LLM 提供商

代码兼容 OpenAI 格式。换 DeepSeek / Kimi 改 3 个环境变量就行,代码不动:

**DeepSeek**(便宜 5-10 倍,可作开发期省钱方案):
```
LLM_API_KEY=sk-...
LLM_ENDPOINT=https://api.deepseek.com/chat/completions
LLM_MODEL=deepseek-chat
```

**Kimi**(国内访问最稳):
```
LLM_API_KEY=...
LLM_ENDPOINT=https://api.moonshot.cn/v1/chat/completions
LLM_MODEL=moonshot-v1-8k
```

---

## 已知限制

- 浏览器 localStorage 是设备本地的;同步靠 `/api/sync` 用口令拉数据
- 抵达照片存到 Vercel Blob(public URL)—— 别人猜到你的 URL 也能看图,但猜不到(随机文件名)
- 口令本身是访问凭证,谁有谁能读你的数据,所以**不要用敏感词当口令**
- LLM 偶尔不严格遵循 `[角色名]` 格式 —— parser 有 fallback,会把整段当成第一个角色说的
