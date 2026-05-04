import { useState, useRef } from "react";
import { CITIES } from "../../data.js";
import { store } from "../store.js";

export default function ArrivalScreen({ cityId, onCancel, onArrived }) {
  const city = CITIES[cityId];
  const [preview, setPreview] = useState(null);
  const [file, setFile]       = useState(null);
  const [busy, setBusy]       = useState(false);
  const [err, setErr]         = useState("");
  const fileRef = useRef(null);

  function onFileChange(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setErr("");
  }

  async function upload() {
    if (!file) {
      setErr("先选一张照片");
      return;
    }
    setBusy(true);
    setErr("");
    try {
      const res = await fetch(`/api/upload?cityId=${cityId}`, {
        method: "POST",
        body: file,
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `upload failed: ${res.status}`);
      }
      const data = await res.json();
      store.setArrival(cityId, {
        url: data.url,
        date: new Date().toISOString(),
      });
      onArrived(cityId);
    } catch (e) {
      setErr(e.message || "上传失败,稍后再试");
      setBusy(false);
    }
  }

  return (
    <div className="arrival-screen">
      <button className="back-btn" onClick={onCancel}>← 返回</button>

      <div className="arrival-card">
        <h2 className="arrival-city-name">{city.en}</h2>
        <p className="arrival-city-zh">{city.nameZh}</p>

        <p className="arrival-prompt">
          你到这里了吗?<br />
          拍下你看到的第一眼。
        </p>

        <div className={`arrival-photo-frame ${preview ? "has-photo" : ""}`}>
          {preview
            ? <img src={preview} alt="arrival" />
            : <span className="arrival-photo-icon">＋</span>}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="arrival-photo-input"
            onChange={onFileChange}
            disabled={busy}
          />
        </div>

        {err && <div className="gate-error">{err}</div>}

        <div className="arrival-actions">
          <button
            className="btn-primary"
            onClick={upload}
            disabled={busy || !file}
          >
            {busy ? "上传中…" : (preview ? "确认抵达" : "选张照片")}
          </button>
          {!busy && (
            <button className="btn-ghost" onClick={onCancel}>
              还没到 / 取消
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
