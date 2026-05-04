import { useState } from "react";
import { fetchCloudState, createCloudState, store } from "../store.js";

// 口令屏幕 — 两种模式 tab:登录已有 / 创建新口令
export default function GateScreen({ onGated }) {
  const [mode, setMode] = useState("login");  // 'login' | 'create'
  const [val, setVal]   = useState("");
  const [err, setErr]   = useState("");
  const [busy, setBusy] = useState(false);

  async function submit() {
    const passcode = val.trim();
    if (!passcode) {
      setErr("请输入口令");
      return;
    }
    if (!/^[\w\u4e00-\u9fa5-]+$/u.test(passcode)) {
      setErr("口令只能包含字母、数字、汉字、下划线、连字符");
      return;
    }
    setErr("");
    setBusy(true);

    try {
      if (mode === "login") {
        const result = await fetchCloudState(passcode);
        if (!result.exists) {
          setErr("找不到这个口令。如果是第一次,请切换到「设置新口令」");
          setBusy(false);
          return;
        }
        store.setPasscodeAndState(passcode, result.state);
        // 是否看欢迎页 → 由 state.welcomeSeen 决定,App 来调度
        onGated({ isNewPasscode: false });
      } else {
        // create
        const result = await createCloudState(passcode);
        if (result.conflict) {
          setErr("这个口令已被使用,换一个,或切换到「登录」");
          setBusy(false);
          return;
        }
        store.setPasscodeAndState(passcode, result.state);
        onGated({ isNewPasscode: true });
      }
    } catch (e) {
      setErr("网络问题,请稍后再试");
      setBusy(false);
    }
  }

  function onKey(e) {
    if (e.key === "Enter") submit();
  }

  return (
    <div className="gate">
      <h1 className="gate-title">eutravel</h1>
      <p className="gate-sub">
        一段属于你的旅行<br />
        用一个口令保存所有记录
      </p>

      <div className="gate-mode-tabs">
        <button
          className={mode === "login" ? "active" : ""}
          onClick={() => { setMode("login"); setErr(""); }}
        >
          登录
        </button>
        <button
          className={mode === "create" ? "active" : ""}
          onClick={() => { setMode("create"); setErr(""); }}
        >
          设置新口令
        </button>
      </div>

      <input
        type="text"
        className="field-line"
        autoFocus
        autoComplete="off"
        autoCapitalize="off"
        autoCorrect="off"
        spellCheck={false}
        placeholder={mode === "login" ? "输入你的口令" : "起一个口令"}
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onKeyDown={onKey}
      />

      {err && <div className="gate-error">{err}</div>}

      <p className="gate-hint">
        {mode === "login"
          ? "用之前设置过的口令找回旅行记录"
          : "在任何设备输入这个口令,都能找回你的旅行"}
      </p>

      <div style={{ marginTop: 32 }}>
        <button className="btn-primary" onClick={submit} disabled={busy}>
          {busy ? "稍等…" : (mode === "login" ? "进入" : "开始")}
        </button>
      </div>
    </div>
  );
}
