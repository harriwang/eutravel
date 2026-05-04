import { CITIES, CITY_ORDER, PHOTOS } from "../../data.js";
import { useStore, isUnlocked, getProgress } from "../store.js";

export default function HomeScreen({ onPickCity }) {
  const state = useStore();
  const { done, total } = getProgress(state);

  return (
    <div className="app-shell" style={{ paddingTop: 0 }}>
      <header className="home-header">
        <h1 className="home-title">eutravel</h1>
        <p className="home-sub">2026.5.16 — 5.31</p>
      </header>

      <div className="home-progress">
        <p className="home-progress-label">
          已抵达 {done} / {total}
        </p>
        <div className="home-progress-bar">
          <div
            className="home-progress-bar-fill"
            style={{ width: `${(done / total) * 100}%` }}
          />
        </div>
      </div>

      <ul className="home-cities" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {CITY_ORDER.map((id, idx) => {
          const c = CITIES[id];
          const unlocked = isUnlocked(state, id);
          const photo = unlocked ? state.arrivals[id].url : PHOTOS[id];
          return (
            <li key={id} style={{ listStyle: 'none' }}>
              <button
                className={`city-card ${unlocked ? "unlocked" : "locked"}`}
                onClick={() => onPickCity(id)}
              >
                <img className="city-card-img" src={photo} alt={c.nameZh} />
                <div className="city-card-body">
                  <div className="city-card-num">
                    NO. {String(idx + 1).padStart(2, "0")}
                  </div>
                  <div className="city-card-name">
                    <span className="city-card-zh">{c.nameZh}</span>
                    <span className="city-card-en">{c.en}</span>
                  </div>
                  <div className="city-card-meta">
                    <span>{c.dates}</span>
                    <span className={`city-card-status ${unlocked ? "unlocked" : "locked"}`}>
                      {unlocked ? "已抵达" : "未抵达"}
                    </span>
                  </div>
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
