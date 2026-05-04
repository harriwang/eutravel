import { useEffect, useState } from "react";
import { CITIES } from "../../data.js";
import { generatePoster, downloadDataURL } from "../../lib/poster-canvas.js";
import { useStore, store, getOrderedArrivals } from "../store.js";

export default function PosterScreen({ onClose }) {
  const state = useStore();
  const [dataURL, setDataURL] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    const arrivals = getOrderedArrivals(state).map(a => ({
      ...a,
      nameZh: CITIES[a.cityId].nameZh,
      dates:  CITIES[a.cityId].dates.split(" – ")[0].replace(/\s/g, ""),
    }));
    if (arrivals.length !== 5) {
      setErr("还没全部抵达");
      return;
    }
    generatePoster(arrivals)
      .then(setDataURL)
      .catch(e => setErr(e.message || "生成失败"));
  }, [state]);

  function download() {
    if (!dataURL) return;
    downloadDataURL(dataURL, `harri-and-dottie-${Date.now()}.png`);
  }

  function close() {
    // 关闭时记下"看过海报",云端同步,以后不再自动弹
    store.markPosterShown();
    onClose();
  }

  return (
    <div className="poster-overlay" onClick={close}>
      <div className="poster-modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="poster-title">旅行完成</h2>
        <p className="poster-sub">2026.5.16 — 5.31</p>

        {err && <div className="gate-error">{err}</div>}

        {!dataURL && !err && (
          <div className="poster-loading">
            正在拼贴你的旅行…
          </div>
        )}

        {dataURL && (
          <>
            <img className="poster-image" src={dataURL} alt="poster" />
            <div style={{ display: "flex", gap: 10, flexDirection: "column" }}>
              <button className="btn-primary" onClick={download}>
                下载海报
              </button>
              <button className="btn-ghost" onClick={close}>
                关闭并继续浏览
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
