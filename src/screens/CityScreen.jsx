import { CITIES, SPOTS } from "../../data.js";
import { getCharactersByCity } from "../../characters.js";
import { useStore } from "../store.js";

export default function CityScreen({ cityId, onBack, onOpenDialog }) {
  const state = useStore();
  const city = CITIES[cityId];
  const spots = SPOTS[cityId] || [];
  const chars = getCharactersByCity(cityId);
  const arrival = state.arrivals?.[cityId];
  const heroImg = arrival?.url || city.photo;

  return (
    <div className="app-shell" style={{ paddingTop: 0 }}>
      <div className="city-detail-hero">
        <button className="city-detail-back back-btn" onClick={onBack}>← 返回</button>
        <img src={heroImg} alt={city.nameZh} />
      </div>

      <div className="city-detail-title-block">
        <h1 className="city-detail-name-zh">{city.nameZh}</h1>
        <p className="city-detail-name-en">{city.en}</p>
        <p className="city-detail-dates">{city.dates}</p>
      </div>

      {/* 名言 — 双语 */}
      <blockquote className="quote-block">
        <p className="quote-original">「{city.quote.original}」</p>
        <p className="quote-zh">「{city.quote.zh}」</p>
        <p className="quote-attr">
          — <strong>{city.quote.author}</strong> · {city.quote.source}
        </p>
      </blockquote>

      {/* 进入对话 CTA */}
      <button className="city-chat-cta" onClick={onOpenDialog}>
        <span className="chat-cta-emojis">
          {chars.map(c => c.emoji).join('')}
        </span>
        <div className="chat-cta-text">
          <p className="chat-cta-title">
            和{chars.map(c => c.nameZh).join(' & ')}聊聊
          </p>
          <p className="chat-cta-sub">
            ta 们在等你
          </p>
        </div>
        <span className="chat-cta-arrow">›</span>
      </button>

      {/* 景点列表 */}
      {spots.length > 0 && (
        <div className="spots-section">
          <h2 className="spots-heading">Places</h2>
          <p className="spots-heading-zh">这座城市的地方</p>
          {spots.map(spot => (
            <div key={spot.id} className="spot-card">
              <img className="spot-card-img" src={spot.photo} alt={spot.nameZh} />
              <div className="spot-card-body">
                <p className="spot-card-zh">{spot.nameZh}</p>
                <p className="spot-card-en">{spot.name}</p>
                <p className="spot-card-vibe">{spot.vibe}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
