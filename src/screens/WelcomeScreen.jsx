import { store } from "../store.js";

export default function WelcomeScreen({ onContinue }) {
  function start() {
    store.markWelcomeSeen();
    onContinue();
  }

  return (
    <div className="welcome">
      <h1 className="welcome-title">French &amp; Italy</h1>

      <div className="ornament"><span>小猫大冒险</span></div>

      <div className="welcome-dates">2026.5.16 — 5.31</div>

      <p className="welcome-route">
        从巴黎出发<br />
        穿过普罗旺斯与蔚蓝海岸<br />
        抵达威尼斯、佛罗伦萨<br />
        终于罗马
      </p>

      <div style={{ height: 36 }} />

      <p className="welcome-prose">
        每到一个城市,<br />
        拍下你看到的第一眼,<br />
        解锁那座城市的全部内容。
      </p>

      <div style={{ height: 24 }} />

      <p className="welcome-prose">
        每个地方,<br />
        已经有人在等你了。
      </p>

      <div className="welcome-spacer" />

      <button className="btn-primary" onClick={start}>
        开始冒险
      </button>
    </div>
  );
}
