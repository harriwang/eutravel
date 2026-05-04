import { createChatResponse } from "../lib/chat-proxy.js";

export default async function handler(req, res) {
  const result = await createChatResponse({
    method:  req.method,
    system:  req.body?.system,
    user:    req.body?.user,
    history: req.body?.history,
  });

  if (result.headers) {
    Object.entries(result.headers).forEach(([k, v]) => res.setHeader(k, v));
  }

  return res.status(result.status).json(result.body);
}
