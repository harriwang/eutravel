// ═══════════════════════════════════════════
// /api/upload — 抵达照片上传到 Vercel Blob
// ═══════════════════════════════════════════
//
// 工作流程:
//   1. 用户在前端选/拍一张照片 → 转 base64 / FormData 传过来
//   2. 后端把照片放到 Vercel Blob(免费云存储)
//   3. 返回照片的公开 URL
//   4. 前端把这个 URL 存到 localStorage 作为"该城市的抵达照片"
//
// 部署前要做的事:
//   1. npm install @vercel/blob
//   2. 在 Vercel Dashboard → 项目 → Storage → Create Database → 选 Blob
//      Vercel 会自动注入 BLOB_READ_WRITE_TOKEN 环境变量
//
// 前端调用示例:
//   const fd = new FormData();
//   fd.append('photo', file);
//   fd.append('cityId', 'paris');
//   const res = await fetch('/api/upload', { method: 'POST', body: fd });
//   const { url } = await res.json();

import { put } from "@vercel/blob";

// Vercel 默认会把 multipart/form-data 解析掉,我们禁用这个让 put 直接拿到原始流
export const config = {
  api: { bodyParser: false },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  // 从 query 拿 cityId(因为 bodyParser 关了,从 URL 取最简单)
  const cityId = req.query?.cityId || "unknown";

  // 校验 cityId,只允许 5 个合法值
  const VALID_CITIES = ["paris", "riviera", "venice", "florence", "rome"];
  if (!VALID_CITIES.includes(cityId)) {
    return res.status(400).json({ error: "Invalid cityId" });
  }

  // 文件名加时间戳,避免重复上传时覆盖
  const filename = `arrival/${cityId}-${Date.now()}.jpg`;

  try {
    const blob = await put(filename, req, {
      access: "public",
      // contentType 让 Vercel 自动检测
    });

    return res.status(200).json({
      url:      blob.url,
      cityId,
      uploaded: new Date().toISOString(),
    });
  } catch (err) {
    console.error("Blob upload failed:", err);
    return res.status(500).json({
      error: err.message || "Upload failed",
      code:  "upload-error",
    });
  }
}
