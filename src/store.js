// ═══════════════════════════════════════════
// sync-cloud.js — 云端状态管理
// ═══════════════════════════════════════════
// 给前端用的统一接口:
//   - 当前口令 (localStorage)
//   - 当前 state (从云端拉,本地缓存)
//   - mutators: setArrival / appendDialog / markWelcomeSeen
//   - 自动 debounce 同步到云端

const PASSCODE_KEY  = "eutravel:passcode";
const STATE_KEY     = "eutravel:state";

// ── 口令 ──
export function getPasscode() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(PASSCODE_KEY);
}
export function setPasscode(p) {
  if (typeof window === "undefined") return;
  localStorage.setItem(PASSCODE_KEY, p);
}
export function clearPasscode() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(PASSCODE_KEY);
  localStorage.removeItem(STATE_KEY);
}

// ── 本地缓存 state ──
function readLocalState() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STATE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}
function writeLocalState(state) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STATE_KEY, JSON.stringify(state));
  } catch {}
}

function emptyState() {
  return {
    arrivals: {},
    dialogs: {},
    welcomeSeen: false,
    posterShown: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

// ── 云端 API ──
export async function fetchCloudState(passcode) {
  const r = await fetch(`/api/sync?passcode=${encodeURIComponent(passcode)}`, {
    method: "GET",
  });
  if (!r.ok) throw new Error(`fetchCloudState failed: ${r.status}`);
  return r.json();  // { exists, state?, created? }
}

export async function createCloudState(passcode) {
  const r = await fetch(`/api/sync?passcode=${encodeURIComponent(passcode)}`, {
    method: "PUT",
  });
  if (r.status === 409) {
    return { ok: false, conflict: true };
  }
  if (!r.ok) throw new Error(`createCloudState failed: ${r.status}`);
  const data = await r.json();
  return { ok: true, ...data };
}

let writeTimer = null;
let pendingState = null;

function scheduleWrite(passcode) {
  if (writeTimer) clearTimeout(writeTimer);
  writeTimer = setTimeout(async () => {
    if (!pendingState) return;
    const stateToWrite = pendingState;
    pendingState = null;
    try {
      await fetch(`/api/sync?passcode=${encodeURIComponent(passcode)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(stateToWrite),
      });
    } catch (err) {
      // 写失败,等用户下次操作再尝试
      console.warn("Cloud sync write failed (will retry):", err);
    }
  }, 600);
}

// ── State Manager ──
// 简单的发布订阅 + cloud 同步
class StateManager {
  constructor() {
    this.state = readLocalState() || emptyState();
    this.passcode = getPasscode();
    this.subs = new Set();
  }

  subscribe(fn) {
    this.subs.add(fn);
    return () => this.subs.delete(fn);
  }

  notify() {
    this.subs.forEach(fn => fn(this.state));
  }

  setState(newState, { sync = true } = {}) {
    this.state = newState;
    writeLocalState(this.state);
    this.notify();
    if (sync && this.passcode) {
      pendingState = this.state;
      scheduleWrite(this.passcode);
    }
  }

  setPasscodeAndState(passcode, state) {
    setPasscode(passcode);
    this.passcode = passcode;
    this.setState(state, { sync: false });
  }

  // ── Mutators ──
  setArrival(cityId, arrivalData) {
    this.setState({
      ...this.state,
      arrivals: { ...this.state.arrivals, [cityId]: arrivalData },
    });
  }

  appendDialog(cityId, msg) {
    const prev = this.state.dialogs[cityId] || [];
    this.setState({
      ...this.state,
      dialogs: { ...this.state.dialogs, [cityId]: [...prev, msg] },
    });
  }

  setDialog(cityId, msgs) {
    this.setState({
      ...this.state,
      dialogs: { ...this.state.dialogs, [cityId]: msgs },
    });
  }

  markWelcomeSeen() {
    if (this.state.welcomeSeen) return;
    this.setState({ ...this.state, welcomeSeen: true });
  }

  markPosterShown() {
    if (this.state.posterShown) return;
    this.setState({ ...this.state, posterShown: true });
  }

  reset() {
    clearPasscode();
    this.passcode = null;
    this.state = emptyState();
    writeLocalState(this.state);
    this.notify();
  }
}

export const store = new StateManager();

// ── React hook ──
import { useState, useEffect } from "react";
export function useStore() {
  const [s, setS] = useState(store.state);
  useEffect(() => store.subscribe(setS), []);
  return s;
}

// ── Helpers ──
export const ALL_CITY_IDS = ["paris", "riviera", "venice", "florence", "rome"];

export function getProgress(state) {
  const a = state.arrivals || {};
  const done = ALL_CITY_IDS.filter(id => a[id]?.url).length;
  return { done, total: ALL_CITY_IDS.length, all: done === ALL_CITY_IDS.length };
}

export function isUnlocked(state, cityId) {
  return Boolean(state.arrivals?.[cityId]?.url);
}

export function getOrderedArrivals(state) {
  return ALL_CITY_IDS
    .map(id => ({ cityId: id, ...(state.arrivals?.[id] || {}) }))
    .filter(a => a.url);
}
