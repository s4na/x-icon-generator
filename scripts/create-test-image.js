// テスト用の画像を生成するスクリプト
// 小さな青い正方形のPNG画像（100x100px）
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 100x100の青い画像のBase64エンコードデータ（実際には小さな赤い画像）
// これは1x1pxの赤いPNG画像
const base64Data = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8DwHwAFBQIAX8jx0gAAAABJRU5ErkJggg==';

// より大きな画像を作成するため、SVGから画像を生成
const svg = `
<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" fill="white"/>
  <circle cx="50" cy="50" r="40" fill="#1DA1F2"/>
</svg>
`;

// SVGをBase64エンコード
const svgBase64 = Buffer.from(svg).toString('base64');
const dataUri = `data:image/svg+xml;base64,${svgBase64}`;

// テスト用にシンプルなPNG画像を作成
// 実際のPNGデータ（100x100の青い円）
const pngData = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAA70lEQVR42u3RAQ0AAAgDoL9/aM3hHFQgDQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAODvDBQAAADg+wBYQQAB',
  'base64'
);

const outputPath = path.join(__dirname, '..', 'tests', 'test-image.png');
fs.writeFileSync(outputPath, pngData);

console.log('Test image created at:', outputPath);
