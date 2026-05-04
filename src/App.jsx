import { useState, useEffect } from "react";
import { useStore, store, getProgress, isUnlocked, getPasscode } from "./store.js";

import GateScreen     from "./screens/GateScreen.jsx";
import WelcomeScreen  from "./screens/WelcomeScreen.jsx";
import HomeScreen     from "./screens/HomeScreen.jsx";
import ArrivalScreen  from "./screens/ArrivalScreen.jsx";
import CityScreen     from "./screens/CityScreen.jsx";
import DialogScreen   from "./screens/DialogScreen.jsx";
import PosterScreen   from "./screens/PosterScreen.jsx";

import { fetchCloudState } from "./store.js";

export default function App() {
  const state = useStore();
  const [screen, setScreen] = useState(null);
  const [activeCity, setActiveCity] = useState(null);
  const [showPoster, setShowPoster] = useState(false);
  const [bootDone, setBootDone] = useState(false);

  // 启动:有口令 → 拉云端最新 state → 进首页/欢迎页
  useEffect(() => {
    let alive = true;
    (async () => {
      const passcode = getPasscode();
      if (!passcode) {
        setScreen("gate");
        setBootDone(true);
        return;
      }
      // 有本地口令,先用本地 state 进入,再后台拉一次最新
      const initialState = store.state;
      if (!initialState.welcomeSeen) {
        setScreen("welcome");
      } else {
        setScreen("home");
      }
      setBootDone(true);
      try {
        const result = await fetchCloudState(passcode);
        if (!alive) return;
        if (result.exists && result.state) {
          // 用云端覆盖本地(但不再触发 sync)
          store.setState(result.state, { sync: false });
          // 重新决定屏幕(welcomeSeen 可能变了)
          if (!result.state.welcomeSeen) setScreen("welcome");
        }
      } catch {
        // 离线就用本地的
      }
    })();
    return () => { alive = false; };
  }, []);

  // 监测 5 城是否全打卡 → 自动弹海报(看过一次后永久不再自动弹)
  useEffect(() => {
    const { all } = getProgress(state);
    if (all && !state.posterShown && !showPoster && screen === "home") {
      setShowPoster(true);
    }
  }, [state, screen, showPoster]);

  if (!bootDone) {
    return (
      <div style={{ padding: 80, textAlign: "center", color: "var(--ink-faded)" }}>
        <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}>
          French &amp; Italy
        </p>
      </div>
    );
  }

  // ── 屏幕路由 ──

  if (screen === "gate") {
    return (
      <GateScreen
        onGated={() => {
          if (!store.state.welcomeSeen) setScreen("welcome");
          else setScreen("home");
        }}
      />
    );
  }

  if (screen === "welcome") {
    return <WelcomeScreen onContinue={() => setScreen("home")} />;
  }

  if (screen === "arrival" && activeCity) {
    return (
      <ArrivalScreen
        cityId={activeCity}
        onCancel={() => { setScreen("home"); setActiveCity(null); }}
        onArrived={(cityId) => {
          // 抵达成功 → 进城市详情
          setActiveCity(cityId);
          setScreen("city");
        }}
      />
    );
  }

  if (screen === "city" && activeCity) {
    return (
      <CityScreen
        cityId={activeCity}
        onBack={() => { setScreen("home"); setActiveCity(null); }}
        onOpenDialog={() => setScreen("dialog")}
      />
    );
  }

  if (screen === "dialog" && activeCity) {
    return (
      <DialogScreen
        cityId={activeCity}
        onBack={() => setScreen("city")}
      />
    );
  }

  // 默认 home
  return (
    <>
      <HomeScreen
        onPickCity={(cityId) => {
          setActiveCity(cityId);
          if (isUnlocked(state, cityId)) setScreen("city");
          else setScreen("arrival");
        }}
        onShowPoster={() => setShowPoster(true)}
      />
      {showPoster && (
        <PosterScreen onClose={() => setShowPoster(false)} />
      )}
    </>
  );
}
