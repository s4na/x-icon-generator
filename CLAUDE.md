# CLAUDE.md - AI開発者向けガイド

このドキュメントは、Claude（AI）がこのプロジェクトで作業する際の参考ガイドです。

## プロジェクト概要

**X Icon Generator** - Xプロフィールアイコン最適化ツール

X（旧Twitter）のプロフィールアイコンを円形表示に最適化するためのWebアプリケーション。ユーザーは画像をアップロードし、カスタマイズ可能な背景と組み合わせ、複数サイズでプレビューしながら最適なアイコンを作成できます。

### 主要機能
- 画像アップロード（ドラッグ＆ドロップ対応）
- 画像調整（拡大縮小、位置調整）
- 背景カスタマイズ（単色、グラデーション、パターン、プリセット、画像）
- マルチサイズプレビュー（200px、48px、24px）
- 円形マスク適用
- PNG/JPGダウンロード（400×400px）

---

## 技術スタック

### フロントエンド
- **HTML5**: セマンティックマークアップ
- **CSS3**: Flexbox、Grid、レスポンシブデザイン
- **Vanilla JavaScript (ES6+)**: フレームワーク不要、クラスベース

### ブラウザAPI
- **Canvas API**: 画像処理、プレビュー生成、円形マスク
- **File API**: 画像ファイル読み込み
- **Drag and Drop API**: ドラッグ＆ドロップ対応
- **Blob API**: ダウンロードファイル生成

### テスト
- **Vitest**: ユニットテストフレームワーク
- **Happy DOM**: DOMエミュレーション

### デプロイ
- **GitHub Pages**: 静的サイトホスティング
- サーバーレス（すべての処理はクライアントサイドで完結）

---

## プロジェクト構造

```
x-icon-generator/
├── index.html              # メインHTMLファイル（UIマークアップ）
├── css/
│   └── style.css           # スタイルシート
├── js/
│   ├── app.js              # メインアプリケーションロジック（XIconGeneratorクラス）
│   ├── canvas.js           # Canvas操作（CanvasManagerクラス）
│   ├── background.js       # 背景生成ロジック（BackgroundGeneratorオブジェクト）
│   └── utils.js            # ユーティリティ関数
├── tests/
│   ├── background.test.js  # 背景生成のテスト
│   ├── canvas.test.js      # Canvas操作のテスト
│   └── utils.test.js       # ユーティリティのテスト
├── vitest.config.js        # Vitestの設定ファイル
├── package.json            # npm設定、依存関係、スクリプト
├── README.md               # プロジェクト説明（ユーザー向け）
├── plan.md                 # 開発計画書（詳細な仕様と実装計画）
├── LICENSE                 # MITライセンス
└── CLAUDE.md               # このファイル（AI開発者向けガイド）
```

---

## アーキテクチャ

### クラス構成

#### 1. **XIconGenerator** (`js/app.js`)
- **役割**: メインアプリケーションクラス
- **責務**:
  - DOM要素の初期化
  - イベントリスナーの設定
  - ユーザーインタラクションの処理
  - CanvasManagerとの連携

**主要メソッド**:
- `initElements()`: DOM要素を取得して初期化
- `initEventListeners()`: イベントリスナーを設定
- `initBackgroundPresets()`: プリセット背景を初期化
- `handleFileUpload()`: 画像アップロード処理
- `handleBackgroundImageUpload()`: 背景画像アップロード処理

#### 2. **CanvasManager** (`js/canvas.js`)
- **役割**: Canvas操作を一元管理
- **責務**:
  - Canvas描画（メイン、プレビュー）
  - 画像の変換・位置調整
  - 背景描画
  - 円形マスクの適用
  - ダウンロード機能

**主要プロパティ**:
```javascript
{
    mainCanvas: HTMLCanvasElement,
    image: Image | null,
    imageX: number,          // 画像のX座標
    imageY: number,          // 画像のY座標
    imageScale: number,      // 画像の拡大率（0.5 - 2.0）
    backgroundImage: Image | null,
    bgImageX: number,
    bgImageY: number,
    bgImageScale: number,
    backgroundConfig: {
        type: 'solid' | 'gradient' | 'pattern' | 'image',
        color: string,
        opacity: number,
        // ... その他の設定
    },
    showGrid: boolean
}
```

**主要メソッド**:
- `loadImage(file)`: 画像を読み込み、初期位置を設定
- `loadBackgroundImage(file)`: 背景画像を読み込み
- `draw()`: メインCanvasと全プレビューを再描画
- `drawBackground(ctx, size)`: 背景を描画
- `applyCircularMask(ctx, centerX, centerY, radius)`: 円形マスクを適用
- `download(format)`: 画像をダウンロード

#### 3. **BackgroundGenerator** (`js/background.js`)
- **役割**: 背景生成のロジック
- **責務**:
  - プリセット背景の定義
  - 単色背景の生成
  - グラデーション背景の生成
  - パターン背景の生成

**主要メソッド**:
- `drawSolid(ctx, size, config)`: 単色背景を描画
- `drawGradient(ctx, size, config)`: グラデーション背景を描画
- `drawPattern(ctx, size, config)`: パターン背景を描画
- `createStripePattern(size, config)`: ストライプパターンを生成
- `createDotPattern(size, config)`: ドットパターンを生成
- `createCheckPattern(size, config)`: チェックパターンを生成
- `createWavePattern(size, config)`: 波模様パターンを生成

#### 4. **Utils** (`js/utils.js`)
- **役割**: 汎用ユーティリティ関数
- **責務**:
  - 色変換
  - 数値計算
  - バリデーション

---

## コーディング規約

### JavaScript

#### クラスとメソッド
```javascript
// クラス名はPascalCase
class XIconGenerator {
    // メソッド名はcamelCase
    initElements() {
        // ...
    }

    // プライベートメソッドも同様（_プレフィックスは使用しない）
    handleFileUpload() {
        // ...
    }
}
```

#### 変数命名
```javascript
// camelCaseを使用
const canvasManager = new CanvasManager();
const backgroundConfig = { type: 'solid' };

// 定数は大文字スネークケース（グローバル定数の場合）
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
```

#### コメント
```javascript
/**
 * JSDoc形式でドキュメント化
 * @param {File} file - アップロードされた画像ファイル
 * @returns {Promise<void>}
 */
async function loadImage(file) {
    // 実装の詳細は単行コメントで説明
    const reader = new FileReader();
    // ...
}
```

### CSS

#### クラス命名（BEM風）
```css
/* Block */
.editor-container { }

/* Element */
.editor-container__canvas { }

/* Modifier */
.editor-container--hidden { }
```

#### レスポンシブ
```css
/* モバイルファースト */
.container {
    /* 基本スタイル（モバイル） */
}

/* タブレット */
@media (min-width: 768px) {
    .container { }
}

/* デスクトップ */
@media (min-width: 1024px) {
    .container { }
}
```

### HTML

#### セマンティックマークアップ
```html
<!-- セマンティックタグを使用 -->
<header>...</header>
<main>...</main>
<section>...</section>
<footer>...</footer>

<!-- 適切なaria属性 -->
<button aria-label="グリッド表示切り替え">Grid</button>
```

---

## 開発ワークフロー

### ローカル開発

#### 1. リポジトリのクローン
```bash
git clone <repository-url>
cd x-icon-generator
```

#### 2. 依存関係のインストール
```bash
npm install
```

#### 3. 開発サーバーの起動
```bash
# Pythonを使用する場合
python -m http.server 8000

# またはindex.htmlを直接ブラウザで開く
```

#### 4. ブラウザで確認
```
http://localhost:8000
```

### テストの実行

```bash
# 全テストを実行
npm test

# ウォッチモード（開発中）
npm run test:watch

# カバレッジレポート
npm run test:coverage
```

### Git ブランチ戦略

- `main`: 本番環境（GitHub Pages）
- `claude/`: AI開発用のフィーチャーブランチ
  - 例: `claude/add-new-feature-011CUo...`

### コミットメッセージ
```
Add feature: 背景画像アップロード機能を追加

Update: プレビュー生成ロジックを改善

Fix: 円形マスクの位置ずれを修正

Refactor: CanvasManagerクラスを整理

Test: 背景生成のテストを追加
```

---

## Canvas操作の重要概念

### 円形マスクの適用

```javascript
// 円形にクリッピングしてから描画
ctx.save();
ctx.beginPath();
ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
ctx.closePath();
ctx.clip();
ctx.drawImage(image, x, y, width, height);
ctx.restore();
```

**重要**:
- `ctx.save()` と `ctx.restore()` で状態を保存・復元
- `clip()` の後に描画すると、パス内のみが表示される

### 背景と画像の合成

```javascript
// 1. 背景を描画
drawBackground(ctx, backgroundConfig);

// 2. 背景画像を描画（オプション）
if (backgroundImage) {
    ctx.drawImage(backgroundImage, bgX, bgY, bgWidth, bgHeight);
}

// 3. 円形マスクでアイコンを描画
applyCircularMask(ctx, centerX, centerY, radius);
ctx.drawImage(iconImage, x, y, width, height);
```

**レイヤー順序**:
1. 背景（単色/グラデーション/パターン）
2. 背景画像（オプション）
3. メインアイコン（円形マスク適用）

### プレビュー生成

```javascript
// 複数サイズのプレビューを生成
const sizes = [
    { canvas: previewLarge, size: 200 },
    { canvas: previewMedium, size: 48 },
    { canvas: previewSmall, size: 24 }
];

sizes.forEach(({ canvas, size }) => {
    const ctx = canvas.getContext('2d');
    canvas.width = size;
    canvas.height = size;

    // メインCanvasから縮小してコピー
    ctx.drawImage(mainCanvas, 0, 0, mainCanvas.width, mainCanvas.height,
                              0, 0, size, size);
});
```

---

## デバッグのヒント

### Canvas のデバッグ

#### 1. Canvasの内容を確認
```javascript
// Canvasを画像として開く（新しいタブ）
const dataURL = canvas.toDataURL();
window.open(dataURL);
```

#### 2. グリッド表示を活用
```javascript
// グリッドを表示して位置を確認
canvasManager.showGrid = true;
canvasManager.draw();
```

#### 3. 座標のログ出力
```javascript
console.log('Image position:', {
    x: this.imageX,
    y: this.imageY,
    scale: this.imageScale
});
```

### よくある問題と解決策

#### 問題1: 画像が円形マスクからはみ出る
**原因**: 画像の初期位置が中央に設定されていない
**解決**: `loadImage()` で中央に配置
```javascript
this.imageX = (this.canvasSize - scaledWidth) / 2;
this.imageY = (this.canvasSize - scaledHeight) / 2;
```

#### 問題2: プレビューが更新されない
**原因**: `draw()` メソッドが呼ばれていない
**解決**: 変更後に必ず `draw()` を呼ぶ
```javascript
this.imageScale = newScale;
this.draw(); // 必ず呼ぶ
```

#### 問題3: 背景が表示されない
**原因**: 背景設定が正しくない、または透明度が0
**解決**: 背景設定を確認
```javascript
console.log('Background config:', this.backgroundConfig);
// opacity が 0 になっていないか確認
```

#### 問題4: ドラッグ操作が動かない
**原因**: イベントリスナーが正しく設定されていない
**解決**: マウスとタッチ両方のイベントを設定
```javascript
canvas.addEventListener('mousedown', startDrag);
canvas.addEventListener('touchstart', startDrag);
```

#### 問題5: モバイルでスクロールが無効になる
**原因**: タッチイベントで `preventDefault()` を呼んでいる
**解決**: Canvas外のスクロールを妨げないように調整
```javascript
canvas.addEventListener('touchmove', (e) => {
    if (isDragging) {
        e.preventDefault(); // ドラッグ中のみ
    }
}, { passive: false });
```

---

## テストガイドライン

### テスト構造

```javascript
import { describe, it, expect, beforeEach } from 'vitest';

describe('BackgroundGenerator', () => {
    let canvas, ctx;

    beforeEach(() => {
        // セットアップ
        canvas = document.createElement('canvas');
        ctx = canvas.getContext('2d');
        canvas.width = 400;
        canvas.height = 400;
    });

    it('単色背景を正しく描画する', () => {
        const config = {
            type: 'solid',
            color: '#FF0000',
            opacity: 1.0
        };

        BackgroundGenerator.drawSolid(ctx, 400, config);

        // 描画が実行されたことを確認
        const imageData = ctx.getImageData(200, 200, 1, 1);
        expect(imageData.data[0]).toBe(255); // R
        expect(imageData.data[1]).toBe(0);   // G
        expect(imageData.data[2]).toBe(0);   // B
    });
});
```

### テスト実行環境

- **Vitest**: 高速なユニットテストフレームワーク
- **Happy DOM**: ブラウザ環境をエミュレート
- Canvas API、FileReader API などが利用可能

### カバレッジ目標

- **ユーティリティ関数**: 90%以上
- **背景生成ロジック**: 80%以上
- **Canvas操作**: 70%以上（UIインタラクションは手動テスト）

---

## パフォーマンス最適化

### 1. 不要な再描画を避ける
```javascript
// ❌ 悪い例：連続で draw() を呼ぶ
this.imageX = newX;
this.draw();
this.imageY = newY;
this.draw();

// ✅ 良い例：まとめて更新してから draw()
this.imageX = newX;
this.imageY = newY;
this.draw();
```

### 2. 大きな画像のリサイズ
```javascript
// 大きすぎる画像は自動的にリサイズ
const MAX_SIZE = 2000;
if (image.width > MAX_SIZE || image.height > MAX_SIZE) {
    // リサイズ処理
}
```

### 3. パターン生成の最適化
```javascript
// パターンは一度生成してキャッシュ
this.currentPattern = ctx.createPattern(patternCanvas, 'repeat');
// 再利用
ctx.fillStyle = this.currentPattern;
```

---

## セキュリティとプライバシー

### クライアントサイド処理
- すべての画像処理はブラウザ上で完結
- サーバーへのアップロードは一切なし
- ユーザーのプライバシーを完全保護

### ファイル検証
```javascript
// ファイルサイズの制限
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

// ファイル形式の検証
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif'];
if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error('サポートされていないファイル形式です');
}
```

---

## ブラウザ互換性

### サポート対象
- **Chrome**: 最新版
- **Firefox**: 最新版
- **Safari**: 最新版（iOS Safari含む）
- **Edge**: 最新版

### 非サポート
- **Internet Explorer 11**: 非対応（ES6+を使用しているため）

### 機能検出
```javascript
// Canvas APIのサポート確認
if (!canvas.getContext) {
    alert('お使いのブラウザはCanvasをサポートしていません');
    return;
}

// File APIのサポート確認
if (!window.FileReader) {
    alert('お使いのブラウザはFile APIをサポートしていません');
    return;
}
```

---

## トラブルシューティング

### GitHub Pages で動かない場合

1. **リポジトリ設定を確認**
   - Settings → Pages
   - Source: `main` branch, `/` (root)

2. **パスの確認**
   - 相対パスを使用（`./css/style.css`）
   - 絶対パス（`/css/style.css`）はサブディレクトリで問題が起きる可能性

3. **キャッシュのクリア**
   - ブラウザのキャッシュをクリア
   - ハードリロード（Ctrl+Shift+R / Cmd+Shift+R）

### ローカルでCORSエラーが出る場合

**原因**: `file://` プロトコルでは一部の機能が制限される

**解決**:
```bash
# HTTPサーバーを起動
python -m http.server 8000

# または
npx http-server
```

---

## 参考リソース

### 公式ドキュメント
- [Canvas API - MDN](https://developer.mozilla.org/ja/docs/Web/API/Canvas_API)
- [File API - MDN](https://developer.mozilla.org/ja/docs/Web/API/File_API)
- [Drag and Drop API - MDN](https://developer.mozilla.org/ja/docs/Web/API/HTML_Drag_and_Drop_API)

### プロジェクト内ドキュメント
- `README.md`: ユーザー向けプロジェクト説明
- `plan.md`: 詳細な開発計画と仕様
- `LICENSE`: MITライセンス

### X (Twitter) 仕様
- [プロフィール画像のガイドライン](https://help.twitter.com/ja/managing-your-account/common-issues-when-uploading-profile-photo)
- 推奨サイズ: 400×400px以上
- 表示形式: 円形

---

## AI開発時の注意事項

### コード変更時のチェックリスト

1. **既存機能を壊していないか確認**
   - テストを実行: `npm test`
   - ブラウザで動作確認

2. **レスポンシブデザインを維持**
   - モバイル、タブレット、デスクトップで確認
   - ブレークポイント: 768px, 1024px

3. **アクセシビリティ**
   - キーボード操作が可能か
   - 適切な`aria-label`があるか

4. **パフォーマンス**
   - 不要な再描画がないか
   - メモリリークがないか

5. **コメントとドキュメント**
   - 複雑なロジックにはコメントを追加
   - このCLAUDE.mdを更新（必要に応じて）

### 新機能追加時

1. **plan.md を確認**
   - 実装計画に沿っているか
   - フェーズ2の機能かフェーズ1の機能か

2. **テストを書く**
   - 新しい関数にはテストを追加
   - `tests/` ディレクトリに配置

3. **README.md を更新**
   - ユーザー向けの機能説明を追加

---

## クイックリファレンス

### 重要なファイルパス

```
メインアプリケーション:     js/app.js
Canvas操作:               js/canvas.js
背景生成:                 js/background.js
ユーティリティ:            js/utils.js
スタイル:                 css/style.css
テスト:                   tests/*.test.js
```

### 主要なクラス・オブジェクト

```javascript
const app = new XIconGenerator();
const canvasManager = new CanvasManager();
const BackgroundGenerator = { ... };
```

### よく使うコマンド

```bash
npm test                    # テスト実行
npm run test:watch          # ウォッチモード
npm run test:coverage       # カバレッジ
python -m http.server 8000  # ローカルサーバー
git status                  # Git状態確認
```

---

**最終更新**: 2025-11-05
**バージョン**: 1.0.0
**メンテナー**: Claude Code
