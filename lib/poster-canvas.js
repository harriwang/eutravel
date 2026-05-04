// ═══════════════════════════════════════════
// poster-canvas.js
// 拍立得风格海报生成器
// ═══════════════════════════════════════════
//
// 输入:5 张抵达照片的 URL(已上传到 Vercel Blob)
//       + 5 个城市的元数据(名字、日期等)
//
// 输出:一个 dataURL(PNG),前端可以下载或直接 <img src=...> 显示
//
// 风格:
//   - 米白色背景(#F5F1E8 复古纸张感)
//   - 5 张拍立得照片错落贴在画布上,各自轻微旋转
//   - 每张拍立得底部用手写感字体写"巴黎 5/16"这种
//   - 画布顶部有标题 "EUTRAVEL · 2026.5.16 — 5.31"
//   - 不依赖任何外部库,纯原生 Canvas
//
// 用法:
//   import { generatePoster } from './lib/poster-canvas';
//   const dataURL = await generatePoster([
//     { cityId: 'paris',    url: '...', nameZh: '巴黎',     dates: '5/16' },
//     { cityId: 'riviera',  url: '...', nameZh: '南法',     dates: '5/19' },
//     ...
//   ]);
//   downloadLink.href = dataURL;
//   downloadLink.download = 'eutravel-poster.png';

const POSTER_W = 1080;
const POSTER_H = 1620;  // 2:3 接近竖版海报比例
const BG_COLOR = "#F5F1E8";

const POLAROID = {
  w:           360,
  h:           420,    // 宽高比 6:7 像真拍立得
  borderTop:   18,
  borderSide:  18,
  borderBottom: 90,    // 底部留白用来写名字
  imgW:        324,
  imgH:        324,    // 拍立得照片是正方形的
  shadowBlur:  20,
  shadowOffsetY: 8,
};

// 5 张拍立得在 1080x1620 画布上的布局(x, y, 旋转角度)
// 错落感:不规则位置 + 每张 -8° 到 +8° 之间的旋转
const LAYOUT = [
  { x: 200, y: 280,  rotate: -6 },  // Paris
  { x: 600, y: 380,  rotate: 4 },   // Riviera
  { x: 150, y: 720,  rotate: 7 },   // Venice
  { x: 580, y: 850,  rotate: -3 },  // Florence
  { x: 320, y: 1180, rotate: 5 },   // Rome
];

/**
 * 加载图片,返回 Promise<HTMLImageElement>
 * 处理跨域 — Vercel Blob 是公开 URL,需要 crossOrigin
 */
function loadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload  = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
    img.src = url;
  });
}

/**
 * 把图片按"cover"方式画进一个正方形
 * (居中裁切,不变形)
 */
function drawCoverImage(ctx, img, dx, dy, dw, dh) {
  const scale  = Math.max(dw / img.width, dh / img.height);
  const sw     = dw / scale;
  const sh     = dh / scale;
  const sx     = (img.width  - sw) / 2;
  const sy     = (img.height - sh) / 2;
  ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
}

/**
 * 画单张拍立得
 */
function drawPolaroid(ctx, img, x, y, rotateDeg, label) {
  ctx.save();

  // 移到拍立得中心,旋转,再画
  const cx = x + POLAROID.w / 2;
  const cy = y + POLAROID.h / 2;
  ctx.translate(cx, cy);
  ctx.rotate((rotateDeg * Math.PI) / 180);
  ctx.translate(-POLAROID.w / 2, -POLAROID.h / 2);

  // 阴影
  ctx.shadowColor   = "rgba(0,0,0,0.18)";
  ctx.shadowBlur    = POLAROID.shadowBlur;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = POLAROID.shadowOffsetY;

  // 白色底板
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, POLAROID.w, POLAROID.h);

  // 阴影只在底板上,画照片和文字时关掉
  ctx.shadowColor   = "transparent";
  ctx.shadowBlur    = 0;
  ctx.shadowOffsetY = 0;

  // 照片本体
  drawCoverImage(
    ctx,
    img,
    POLAROID.borderSide,
    POLAROID.borderTop,
    POLAROID.imgW,
    POLAROID.imgH,
  );

  // 标签:城市名 + 日期
  ctx.fillStyle    = "#333333";
  ctx.font         = "italic 28px 'Cormorant Garamond', 'Georgia', serif";
  ctx.textAlign    = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(
    label,
    POLAROID.w / 2,
    POLAROID.borderTop + POLAROID.imgH + (POLAROID.borderBottom / 2),
  );

  ctx.restore();
}

/**
 * 主函数:生成海报
 * @param {Array<{ cityId, url, nameZh, dates }>} arrivals — 必须刚好 5 项,按行程顺序
 * @returns {Promise<string>} dataURL (image/png)
 */
export async function generatePoster(arrivals) {
  if (!Array.isArray(arrivals) || arrivals.length !== 5) {
    throw new Error("generatePoster expects exactly 5 arrival items");
  }

  // 创建离屏 canvas
  const canvas = document.createElement("canvas");
  canvas.width  = POSTER_W;
  canvas.height = POSTER_H;
  const ctx = canvas.getContext("2d");

  // 1. 背景
  ctx.fillStyle = BG_COLOR;
  ctx.fillRect(0, 0, POSTER_W, POSTER_H);

  // 2. 顶部标题
  ctx.fillStyle    = "#2C2C2C";
  ctx.textAlign    = "center";
  ctx.textBaseline = "middle";

  ctx.font = "italic 64px 'Cormorant Garamond', 'Georgia', serif";
  ctx.fillText("Harri & Dottie", POSTER_W / 2, 110);

  ctx.font = "300 26px 'Cormorant Garamond', 'Georgia', serif";
  ctx.fillStyle = "#666666";
  ctx.fillText("2026.5.16 — 5.31", POSTER_W / 2, 170);

  // 横线分隔
  ctx.strokeStyle = "#999999";
  ctx.lineWidth   = 1;
  ctx.beginPath();
  ctx.moveTo(POSTER_W / 2 - 60, 210);
  ctx.lineTo(POSTER_W / 2 + 60, 210);
  ctx.stroke();

  // 3. 加载 5 张照片(并行,失败重试一次)
  const images = await Promise.all(
    arrivals.map(a =>
      loadImage(a.url).catch(() => loadImage(a.url)) // 简单重试一次
    ),
  );

  // 4. 画 5 张拍立得
  arrivals.forEach((arr, i) => {
    const layout = LAYOUT[i];
    const label  = `${arr.nameZh} · ${arr.dates}`;
    drawPolaroid(ctx, images[i], layout.x, layout.y, layout.rotate, label);
  });

  // 5. 底部签名
  ctx.fillStyle    = "#888888";
  ctx.textAlign    = "center";
  ctx.font         = "italic 22px 'Cormorant Garamond', 'Georgia', serif";
  ctx.fillText(
    "Paris · Riviera · Venezia · Firenze · Roma",
    POSTER_W / 2,
    POSTER_H - 70,
  );

  return canvas.toDataURL("image/png", 0.95);
}

/** 浏览器下载工具 */
export function downloadDataURL(dataURL, filename = "harri-and-dottie.png") {
  const a = document.createElement("a");
  a.href     = dataURL;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
