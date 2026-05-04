// ═══════════════════════════════════════════
// /api/sync — 按口令读写用户数据
// ═══════════════════════════════════════════

import { put, list } from "@vercel/blob";

export const config = {
  api: { bodyParser: { sizeLimit: "1mb" } },
};

const PRESET_TEST_PASSCODES = ["test", "test2"];

function sanitizePasscode(p) {
  if (typeof p !== "string") return null;
  const trimmed = p.trim();
  if (!trimmed || trimmed.length > 40) return null;
  if (!/^[\w\u4e00-\u9fa5-]+$/u.test(trimmed)) return null;
  return trimmed;
}

function blobPath(passcode) {
  return `users/${passcode}.json`;
}

async function findBlob(passcode) {
  const { blobs } = await list({ prefix: blobPath(passcode) });
  return blobs.find(b => b.pathname === blobPath(passcode)) || null;
}

async function readState(passcode) {
  const blob = await findBlob(passcode);
  if (!blob) return null;
  try {
    const r = await fetch(blob.url, { cache: "no-store" });
    if (!r.ok) return null;
    return await r.json();
  } catch {
    return null;
  }
}

async function writeState(passcode, state) {
  const json = JSON.stringify(state);
  await put(blobPath(passcode), json, {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

function emptyState() {
  return {
    arrivals: {},
    dialogs:  {},
    welcomeSeen: false,
    posterShown: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export default async function handler(req, res) {
  const passcode = sanitizePasscode(req.query?.passcode);
  if (!passcode) {
    return res.status(400).json({ error: "Invalid passcode" });
  }

  if (req.method === "GET") {
    try {
      let state = await readState(passcode);
      const isPreset = PRESET_TEST_PASSCODES.includes(passcode);
      if (!state) {
        if (isPreset) {
          state = emptyState();
          await writeState(passcode, state);
          return res.status(200).json({ exists: true, state, created: true });
        }
        return res.status(200).json({ exists: false });
      }
      return res.status(200).json({ exists: true, state });
    } catch (err) {
      return res.status(500).json({ error: err.message || "read failed" });
    }
  }

  if (req.method === "POST") {
    try {
      const incoming = req.body;
      if (!incoming || typeof incoming !== "object") {
        return res.status(400).json({ error: "Invalid body" });
      }
      const state = {
        arrivals:    incoming.arrivals    || {},
        dialogs:     incoming.dialogs     || {},
        welcomeSeen: !!incoming.welcomeSeen,
        posterShown: !!incoming.posterShown,
        createdAt:   incoming.createdAt   || new Date().toISOString(),
        updatedAt:   new Date().toISOString(),
      };
      await writeState(passcode, state);
      return res.status(200).json({ ok: true, state });
    } catch (err) {
      return res.status(500).json({ error: err.message || "write failed" });
    }
  }

  if (req.method === "PUT") {
    try {
      const existing = await readState(passcode);
      if (existing) {
        return res.status(409).json({ error: "passcode already exists" });
      }
      const state = emptyState();
      await writeState(passcode, state);
      return res.status(200).json({ ok: true, state, created: true });
    } catch (err) {
      return res.status(500).json({ error: err.message || "create failed" });
    }
  }

  res.setHeader("Allow", "GET, POST, PUT");
  return res.status(405).json({ error: "Method not allowed" });
}
