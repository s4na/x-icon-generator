# X Icon Generator - 開発計画書

## 📋 プロジェクト概要

### Purpose / 目的
Xのプロフィールアイコンが円形に切り抜かれて表示される際、特にモバイルで小さく表示されたときにイメージと異なって見える問題を解決する。画像をアップロードしてXでの表示をプレビューし、**カスタマイズ可能な背景と組み合わせて**最適なサイズに加工してダウンロードできるツールを提供する。

### Target Users / ターゲットユーザー
- Xのプロフィール画像を最適化したい一般ユーザー
- SNS運用担当者
- デザイナー

### User Flow / ユーザーフロー

```
1. 画像アップロード
   ↓
2. トリミング・調整
   - 拡大縮小
   - 位置調整
   - 回転（オプション）
   ↓
3. 背景選択・カスタマイズ
   - 単色/グラデーション/パターン/プリセット
   - 透明度調整
   ↓
4. プレビュー確認
   - 大サイズ（200x200px）- デスクトップ表示
   - 中サイズ（48x48px）- タイムライン表示
   - 小サイズ（24x24px）- リプライ表示
   ↓
5. ダウンロード
   - PNG/JPG形式選択
   - 400x400px 最終出力
```

### Device Support / デバイス対応
- **PC**: マウス操作、広い画面レイアウト
- **タブレット**: タッチ操作、中間レイアウト
- **スマートフォン**: タッチ操作、縦並びレイアウト
- **レスポンシブブレークポイント**:
  - デスクトップ: 1024px以上
  - タブレット: 768px - 1023px
  - モバイル: 767px以下

---

## 🎯 機能要件

### Core Features / コア機能

#### 1. 画像アップロード機能
- **File Upload**: ファイル選択ボタンからのアップロード
- **Drag & Drop**: ドラッグ&ドロップ対応
- **対応フォーマット**: JPG, PNG, GIF（非アニメーション）
- **ファイルサイズ制限**: 最大10MB

#### 2. トリミング・画像調整機能
- **拡大縮小**:
  - スライダーで調整（PC/モバイル共通）
  - マウスホイールズーム（PC）
  - ピンチイン・ピンチアウト（モバイル/タブレット）
  - 倍率表示（50% - 200%）
- **位置調整**:
  - ドラッグで画像の位置を移動（マウス/タッチ対応）
  - 矢印キーでの微調整（PC）
- **回転機能**（オプション）:
  - 90度ずつ回転
  - 自由角度調整スライダー
- **円形エリア表示**: トリミング範囲をリアルタイム表示
- **グリッド表示**: 位置調整を補助（オン/オフ切替可能）
- **リセット機能**: 初期状態に戻す

#### 3. プレビュー機能 ⭐ 重要
- **メインプレビュー**: 編集中のリアルタイムプレビュー（円形マスク適用）
- **マルチサイズプレビュー**: 実際のX表示を再現
  - **大サイズ（200x200px）**: デスクトップ・プロフィールページ表示
    - ラベル: "プロフィールページ"
  - **中サイズ（48x48px）**: タイムライン表示
    - ラベル: "タイムライン"
  - **小サイズ（24x24px）**: リプライ・リツイート表示
    - ラベル: "リプライ"
- **プレビュー表示方法**:
  - PC: 横並びまたはグリッド表示（3サイズ同時表示）
  - モバイル: 縦並び表示（スクロール可能）
  - 各プレビューに背景も反映
- **リアルタイムプレビュー**: 調整がすべてのプレビューに即座に反映
- **モックアップ表示**（オプション）: X UIのモックアップ内にプレビュー表示

#### 4. 背景生成機能 ⭐ NEW
- **単色背景**: カラーピッカーで自由に色選択
- **グラデーション背景**:
  - 2色グラデーション（線形・放射状）
  - グラデーション方向調整（0°, 45°, 90°, 135°, 180° など）
- **パターン背景**:
  - ストライプ（縦・横・斜め）
  - ドット
  - チェック
  - 波模様
- **プリセット背景**:
  - トレンドカラー配色（10-15種類）
  - SNS映えする配色セット
  - ビジネス向け配色
- **背景の透明度調整**: 画像とのブレンド具合を調整
- **背景プレビュー**: 選択した背景とアイコンの組み合わせをリアルタイム表示

#### 5. ダウンロード機能
- **背景込みで生成**: アイコンと背景を合成した完成画像を生成
- **正方形フォーマット**: 400x400px（Xの推奨サイズ）
- **フォーマット選択**:
  - PNG（高品質、透明度対応）
  - JPG（ファイルサイズ小）
- **ダウンロードオプション**:
  - 背景付きアイコン（正方形）
  - アイコンのみ（透過PNG、円形切り抜き）※オプション
- **ファイル名**: `x-icon-{timestamp}.png` または `x-icon-{timestamp}.jpg`

---

## 🛠 技術仕様

### Technology Stack / 技術スタック

#### Frontend Only / フロントエンドのみ
- **HTML5**: セマンティックマークアップ
- **CSS3**: モダンレイアウト（Flexbox, Grid）、アニメーション
- **Vanilla JavaScript (ES6+)**: クライアントサイド処理のみ

#### Browser APIs / ブラウザAPI
- **Canvas API**: 画像の加工、プレビュー生成
- **File API**: 画像ファイルの読み込み
- **Drag and Drop API**: ドラッグ&ドロップ対応
- **Blob API**: ダウンロードファイル生成

#### Deployment / デプロイ
- **GitHub Pages**: 静的サイトホスティング
- **No Backend Required**: すべての処理をブラウザ上で完結

---

## 🎨 UI/UX デザイン

### Design Principles / デザイン原則
- **モダンでクリーン**: ミニマルで直感的なインターフェース
- **レスポンシブ**: モバイル・タブレット・デスクトップ対応
- **アクセシビリティ**: キーボード操作対応、適切なコントラスト
- **パフォーマンス**: 軽量で高速な動作

### Layout / レイアウト構成

#### デスクトップレイアウト（1024px以上）

```
┌─────────────────────────────────────────────────────────┐
│                Header / ヘッダー                        │
│        "X Icon Generator" + 説明                        │
├──────────────────────┬──────────────────────────────────┤
│                      │                                  │
│   Upload & Editor    │    Multi-Size Preview Panel      │
│   アップロード・編集  │    マルチサイズプレビュー         │
│                      │                                  │
│  ┌────────────────┐  │  ┌────────────────────────────┐ │
│  │                │  │  │ [プロフィールページ]        │ │
│  │   Main Editor  │  │  │   ⚪ 200x200px             │ │
│  │   メイン編集    │  │  │                            │ │
│  │   Canvas       │  │  ├────────────────────────────┤ │
│  │   (円形表示)    │  │  │ [タイムライン]              │ │
│  │                │  │  │   ⚪ 48x48px               │ │
│  └────────────────┘  │  ├────────────────────────────┤ │
│                      │  │ [リプライ]                  │ │
│  Image Controls      │  │   ⚪ 24x24px               │ │
│  - Scale: [====|==]  │  └────────────────────────────┘ │
│  - Position: Drag    │                                  │
│  - Zoom: 100%        │                                  │
│                      │                                  │
├──────────────────────┴──────────────────────────────────┤
│  Background Generator / 背景ジェネレーター ⭐            │
│  [Solid] [Gradient] [Pattern] [Preset]                 │
│  - Color picker / カラー選択                            │
│  - Opacity slider / 透明度                              │
├─────────────────────────────────────────────────────────┤
│  Download Section / ダウンロード                        │
│  [Download PNG] [Download JPG]                          │
└─────────────────────────────────────────────────────────┘
```

#### モバイルレイアウト（767px以下）

```
┌──────────────────────┐
│  Header / ヘッダー    │
│  "X Icon Generator"  │
├──────────────────────┤
│                      │
│  ┌────────────────┐  │
│  │                │  │
│  │  Main Editor   │  │
│  │  メイン編集     │  │
│  │  Canvas        │  │
│  │  (円形表示)     │  │
│  │                │  │
│  └────────────────┘  │
│                      │
│  Image Controls      │
│  - Scale: [====|=]   │
│  - Zoom: 100%        │
│                      │
├──────────────────────┤
│  Preview Sizes       │
│  プレビューサイズ     │
│                      │
│  [プロフィールページ] │
│    ⚪ 200x200px      │
│                      │
│  [タイムライン]       │
│    ⚪ 48x48px        │
│                      │
│  [リプライ]          │
│    ⚪ 24x24px        │
│                      │
├──────────────────────┤
│  Background          │
│  背景ジェネレーター   │
│                      │
│  [Solid] [Gradient]  │
│  [Pattern] [Preset]  │
│                      │
│  カラー選択          │
│  透明度調整          │
│                      │
├──────────────────────┤
│  Download            │
│  [PNG] [JPG]         │
└──────────────────────┘
```

#### タブレットレイアウト（768px - 1023px）

```
┌────────────────────────────────────┐
│         Header / ヘッダー           │
│    "X Icon Generator" + 説明       │
├────────────────────────────────────┤
│                                    │
│  ┌──────────────────────────────┐  │
│  │      Main Editor / 編集       │  │
│  │      Canvas (円形表示)        │  │
│  └──────────────────────────────┘  │
│                                    │
│  Image Controls                    │
│  - Scale: [=====|===]              │
│  - Zoom: 100%                      │
│                                    │
├────────────────────────────────────┤
│  Preview Panel / プレビュー         │
│  ┌─────┐ ┌─────┐ ┌─────┐          │
│  │ 200 │ │ 48  │ │ 24  │          │
│  │ px  │ │ px  │ │ px  │          │
│  └─────┘ └─────┘ └─────┘          │
│                                    │
├────────────────────────────────────┤
│  Background Generator ⭐            │
│  [Solid] [Gradient] [Pattern]      │
│                                    │
├────────────────────────────────────┤
│  Download / ダウンロード            │
│  [Download PNG] [Download JPG]     │
└────────────────────────────────────┘
```

### Color Scheme / カラースキーム
- **Primary**: Xブランドカラー（#1DA1F2）を参考に
- **Background**: クリーンなホワイト/ライトグレー
- **Accent**: コントラストの高いアクセントカラー
- **オプション**: ダークモード対応（フェーズ2）

---

## 📐 X (Twitter) アイコン仕様

### Official Specifications / 公式仕様
- **Display Shape**: 円形（Circle）
- **Recommended Size**: 400x400px 以上
- **File Size**: 最大2MB
- **Aspect Ratio**: 1:1（正方形）
- **Supported Formats**: JPG, PNG, GIF

### プレビューサイズ参考
- **プロフィールページ**: 約200x200px（円形）
- **タイムライン**: 約48x48px（円形）
- **リプライ・RT**: 約24x24px（円形）

---

## 🏗 実装計画

### Phase 1: 基本機能実装

#### Step 1: プロジェクトセットアップ
- [ ] ディレクトリ構成作成
- [ ] HTML基本構造作成
- [ ] CSS初期設定（リセット、変数定義）
- [ ] JavaScript基本構造作成

#### Step 2: アップロード機能
- [ ] ファイル選択UI実装
- [ ] ドラッグ&ドロップ実装
- [ ] ファイル検証（形式、サイズ）
- [ ] プレビュー画像読み込み

#### Step 3: プレビュー機能
- [ ] メインプレビューCanvas実装（編集用）
- [ ] 円形マスク適用
- [ ] マルチサイズプレビュー生成
  - [ ] 大サイズ（200x200px）プレビュー
  - [ ] 中サイズ（48x48px）プレビュー
  - [ ] 小サイズ（24x24px）プレビュー
- [ ] プレビューラベル表示（"プロフィールページ", "タイムライン", "リプライ"）
- [ ] リアルタイム更新機能（調整が即座に反映）
- [ ] レスポンシブレイアウト
  - [ ] デスクトップ: 横並びレイアウト（左に編集、右にプレビュー）
  - [ ] タブレット: 縦並びレイアウト（上に編集、下にプレビュー横並び）
  - [ ] モバイル: 完全縦並びレイアウト（プレビュー縦配置）

#### Step 4: 画像調整機能（トリミング）
- [ ] 拡大縮小スライダー実装
- [ ] ドラッグで位置調整実装（マウス対応）
- [ ] タッチ操作対応（ドラッグ）
- [ ] マウスホイールズーム対応（PC）
- [ ] ピンチイン・ピンチアウト対応（モバイル/タブレット）
- [ ] 矢印キーでの微調整（PC）
- [ ] 円形トリミングエリア表示
- [ ] グリッド表示機能（オン/オフ切替）
- [ ] 倍率表示（50% - 200%）
- [ ] リセット機能実装

#### Step 5: 背景生成機能 ⭐
- [ ] 背景タイプ選択UI実装（タブまたはボタン）
- [ ] 単色背景機能
  - [ ] カラーピッカー実装
  - [ ] Canvas背景描画
- [ ] グラデーション背景機能
  - [ ] 2色選択UI
  - [ ] グラデーション方向選択（線形・放射状）
  - [ ] Canvas gradientコード実装
- [ ] パターン背景機能
  - [ ] ストライプパターン生成
  - [ ] ドットパターン生成
  - [ ] チェックパターン生成
  - [ ] 波模様パターン生成
- [ ] プリセット背景機能
  - [ ] 10-15種類の配色データ準備
  - [ ] プリセット選択UI（グリッド表示）
  - [ ] ワンクリック適用
- [ ] 背景透明度調整スライダー実装
- [ ] 背景とアイコンの合成処理

#### Step 6: ダウンロード機能
- [ ] 背景とアイコンを合成したCanvas生成
- [ ] Canvas→Blob変換（PNG/JPG）
- [ ] ダウンロードトリガー実装
- [ ] ファイル名生成（タイムスタンプ付き）
- [ ] フォーマット選択UI（PNG/JPG切り替え）
- [ ] ダウンロードオプション（背景付き/アイコンのみ）

#### Step 7: UI/UX改善
- [ ] ローディング表示
- [ ] エラーハンドリング
- [ ] トーストメッセージ
- [ ] アニメーション追加
- [ ] 背景選択時の視覚的フィードバック
- [ ] ツールチップ・ヘルプテキスト

#### Step 8: テスト・最適化
- [ ] 各種ブラウザテスト
- [ ] モバイルテスト
- [ ] パフォーマンス最適化
- [ ] アクセシビリティチェック

### Phase 2: 拡張機能（オプション）
- [ ] 複数画像の一括処理
- [ ] ダークモード対応
- [ ] 高度な背景カスタマイズ（カスタムパターンアップロード）
- [ ] 背景ぼかし効果
- [ ] テキスト追加機能（名前、キャッチフレーズなど）
- [ ] フィルター・エフェクト（セピア、モノクロなど）
- [ ] 過去の編集履歴保存（LocalStorage）
- [ ] SNSプレビュー（X以外：Instagram, Facebook など）

---

## 📁 ファイル構成

```
x-icon-generator/
├── index.html          # メインHTMLファイル
├── css/
│   └── style.css       # スタイルシート
├── js/
│   ├── app.js          # メインアプリケーションロジック
│   ├── canvas.js       # Canvas操作関連（画像処理）
│   ├── background.js   # 背景生成ロジック ⭐
│   └── utils.js        # ユーティリティ関数
├── assets/
│   └── sample.png      # サンプル画像（オプション）
├── README.md           # プロジェクト説明
└── plan.md             # この開発計画書
```

---

## 🚀 デプロイ手順

### GitHub Pages Setup / GitHub Pages セットアップ

1. **リポジトリ設定**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: X Icon Generator"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **GitHub Pages有効化**
   - リポジトリ設定 → Pages
   - Source: `main` branch, `/` (root)
   - Save

3. **公開URL**
   - `https://<username>.github.io/x-icon-generator/`

---

## 🎓 技術的なポイント

### 1. Canvas での円形切り抜き実装例

```javascript
// 円形マスクの適用
ctx.save();
ctx.beginPath();
ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
ctx.closePath();
ctx.clip();
ctx.drawImage(image, x, y, width, height);
ctx.restore();
```

### 2. 背景生成実装例 ⭐

#### 単色背景
```javascript
// 単色背景の描画
ctx.fillStyle = selectedColor;
ctx.fillRect(0, 0, canvas.width, canvas.height);
```

#### グラデーション背景（線形）
```javascript
// 線形グラデーション
const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
gradient.addColorStop(0, color1);
gradient.addColorStop(1, color2);
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, canvas.width, canvas.height);
```

#### グラデーション背景（放射状）
```javascript
// 放射状グラデーション
const gradient = ctx.createRadialGradient(
  centerX, centerY, 0,
  centerX, centerY, radius
);
gradient.addColorStop(0, color1);
gradient.addColorStop(1, color2);
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, canvas.width, canvas.height);
```

#### パターン背景（ストライプ）
```javascript
// ストライプパターン
const patternCanvas = document.createElement('canvas');
patternCanvas.width = 20;
patternCanvas.height = 20;
const pCtx = patternCanvas.getContext('2d');

pCtx.fillStyle = color1;
pCtx.fillRect(0, 0, 10, 20);
pCtx.fillStyle = color2;
pCtx.fillRect(10, 0, 10, 20);

const pattern = ctx.createPattern(patternCanvas, 'repeat');
ctx.fillStyle = pattern;
ctx.fillRect(0, 0, canvas.width, canvas.height);
```

#### パターン背景（ドット）
```javascript
// ドットパターン
const patternCanvas = document.createElement('canvas');
patternCanvas.width = 20;
patternCanvas.height = 20;
const pCtx = patternCanvas.getContext('2d');

pCtx.fillStyle = color1;
pCtx.fillRect(0, 0, 20, 20);
pCtx.fillStyle = color2;
pCtx.beginPath();
pCtx.arc(10, 10, 4, 0, Math.PI * 2);
pCtx.fill();

const pattern = ctx.createPattern(patternCanvas, 'repeat');
ctx.fillStyle = pattern;
ctx.fillRect(0, 0, canvas.width, canvas.height);
```

### 3. 背景とアイコンの合成

```javascript
// 1. 背景を描画
drawBackground(ctx, backgroundConfig);

// 2. 円形マスクでアイコンを描画
ctx.save();
ctx.beginPath();
ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
ctx.closePath();
ctx.clip();
ctx.drawImage(iconImage, x, y, width, height);
ctx.restore();

// 3. 円形の境界線を追加（オプション）
ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
ctx.lineWidth = 2;
ctx.beginPath();
ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
ctx.stroke();
```

### 4. ダウンロード実装例

```javascript
// Canvas → Blob → Download
canvas.toBlob((blob) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `x-icon-${Date.now()}.png`;
  link.click();
  URL.revokeObjectURL(url);
}, 'image/png');
```

### 5. タッチ操作実装例（モバイル対応）⭐

#### ドラッグ操作（タッチ対応）
```javascript
let isDragging = false;
let startX, startY;

// マウスとタッチ両対応
canvas.addEventListener('mousedown', startDrag);
canvas.addEventListener('touchstart', startDrag);

canvas.addEventListener('mousemove', drag);
canvas.addEventListener('touchmove', drag);

canvas.addEventListener('mouseup', endDrag);
canvas.addEventListener('touchend', endDrag);

function startDrag(e) {
  isDragging = true;
  const point = getEventPoint(e);
  startX = point.x - imageX;
  startY = point.y - imageY;
}

function drag(e) {
  if (!isDragging) return;
  e.preventDefault(); // スクロール防止
  const point = getEventPoint(e);
  imageX = point.x - startX;
  imageY = point.y - startY;
  redraw();
}

function endDrag() {
  isDragging = false;
}

function getEventPoint(e) {
  const rect = canvas.getBoundingClientRect();
  if (e.touches) {
    // タッチイベント
    return {
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top
    };
  } else {
    // マウスイベント
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }
}
```

#### ピンチイン・ピンチアウト（ズーム）
```javascript
let initialDistance = 0;
let initialScale = 1;

canvas.addEventListener('touchstart', (e) => {
  if (e.touches.length === 2) {
    // 2本指タッチ開始
    initialDistance = getDistance(e.touches[0], e.touches[1]);
    initialScale = currentScale;
  }
});

canvas.addEventListener('touchmove', (e) => {
  if (e.touches.length === 2) {
    e.preventDefault();
    const currentDistance = getDistance(e.touches[0], e.touches[1]);
    const scale = (currentDistance / initialDistance) * initialScale;
    currentScale = Math.max(0.5, Math.min(2.0, scale)); // 0.5x - 2.0x
    redraw();
  }
});

function getDistance(touch1, touch2) {
  const dx = touch2.clientX - touch1.clientX;
  const dy = touch2.clientY - touch1.clientY;
  return Math.sqrt(dx * dx + dy * dy);
}
```

### 6. レスポンシブCSS実装例 ⭐

```css
/* 基本スタイル（モバイルファースト） */
.container {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;
}

.editor-section {
  width: 100%;
}

.preview-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.preview-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

/* タブレット（768px以上） */
@media (min-width: 768px) {
  .preview-section {
    flex-direction: row;
    justify-content: space-around;
  }

  .preview-item {
    flex: 1;
  }
}

/* デスクトップ（1024px以上） */
@media (min-width: 1024px) {
  .container {
    flex-direction: row;
    max-width: 1400px;
    margin: 0 auto;
  }

  .editor-section {
    width: 50%;
    flex-shrink: 0;
  }

  .preview-section {
    width: 50%;
    flex-direction: column;
  }
}

/* タッチデバイス用のタッチターゲット拡大 */
@media (hover: none) and (pointer: coarse) {
  button {
    min-height: 44px; /* iOSガイドライン */
    min-width: 44px;
  }

  input[type="range"] {
    height: 44px;
  }
}
```

---

## ✅ 成功基準

### Functional Requirements / 機能要件
- ✅ 画像を選択・アップロードできる
- ✅ **画像のトリミング・調整ができる（拡大縮小、位置調整）** ⭐
- ✅ **マルチサイズプレビューが正確に表示される（200px, 48px, 24px）** ⭐
- ✅ 各プレビューサイズで実際の表示を確認できる
- ✅ **背景を自由に選択・カスタマイズできる（単色、グラデーション、パターン、プリセット）** ⭐
- ✅ 背景とアイコンを合成したプレビューが正確に表示される
- ✅ 背景付き400x400pxの正方形画像をダウンロードできる
- ✅ GitHub Pagesで正常に動作する

### Non-Functional Requirements / 非機能要件
- ✅ **PC・タブレット・スマートフォンで快適に動作** ⭐
- ✅ **レスポンシブデザインで各デバイスに最適化されたレイアウト** ⭐
- ✅ **タッチ操作に対応（ドラッグ、ピンチイン・ピンチアウト）** ⭐
- ✅ **マウス操作に対応（ドラッグ、ホイールズーム）** ⭐
- ✅ 画像処理が1秒以内に完了
- ✅ リアルタイムプレビュー更新が遅延なく動作
- ✅ 直感的で分かりやすいUI
- ✅ 主要ブラウザで動作（Chrome, Firefox, Safari, Edge）
- ✅ タッチターゲットがモバイルで十分なサイズ（44px以上）

---

## 🎨 プリセット背景カラーパレット ⭐

### トレンド配色（Gradient Presets）

```javascript
const presetBackgrounds = [
  {
    name: 'Sunset Gradient',
    type: 'gradient',
    colors: ['#FF6B6B', '#FFE66D'],
    direction: 'linear',
    angle: 135
  },
  {
    name: 'Ocean Blue',
    type: 'gradient',
    colors: ['#4A90E2', '#50E3C2'],
    direction: 'linear',
    angle: 45
  },
  {
    name: 'Purple Dream',
    type: 'gradient',
    colors: ['#A855F7', '#EC4899'],
    direction: 'radial'
  },
  {
    name: 'Forest Green',
    type: 'gradient',
    colors: ['#10B981', '#34D399'],
    direction: 'linear',
    angle: 90
  },
  {
    name: 'Warm Orange',
    type: 'gradient',
    colors: ['#F59E0B', '#EF4444'],
    direction: 'linear',
    angle: 180
  },
  {
    name: 'Cool Mint',
    type: 'gradient',
    colors: ['#06B6D4', '#8B5CF6'],
    direction: 'linear',
    angle: 45
  },
  {
    name: 'Soft Peach',
    type: 'gradient',
    colors: ['#FBBF24', '#F472B6'],
    direction: 'radial'
  },
  {
    name: 'Deep Ocean',
    type: 'gradient',
    colors: ['#1E3A8A', '#3B82F6'],
    direction: 'linear',
    angle: 135
  },
  {
    name: 'Lavender Sky',
    type: 'gradient',
    colors: ['#E0E7FF', '#C7D2FE'],
    direction: 'linear',
    angle: 90
  },
  {
    name: 'Dark Night',
    type: 'gradient',
    colors: ['#1F2937', '#374151'],
    direction: 'linear',
    angle: 180
  }
];
```

### ビジネス向け単色

```javascript
const businessColors = [
  { name: 'Professional Blue', color: '#1E40AF' },
  { name: 'Trusty Navy', color: '#1E3A8A' },
  { name: 'Corporate Gray', color: '#6B7280' },
  { name: 'Executive Black', color: '#1F2937' },
  { name: 'Clean White', color: '#FFFFFF' }
];
```

---

## 📚 参考リソース

### X (Twitter) 公式ガイド
- プロフィール画像仕様: https://help.twitter.com/en/managing-your-account/common-issues-when-uploading-profile-photo

### 技術ドキュメント
- Canvas API: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
- File API: https://developer.mozilla.org/en-US/docs/Web/API/File_API
- Drag and Drop API: https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API

---

## 📝 メモ・注意事項

### セキュリティ
- 画像処理は完全にクライアントサイドで実行
- サーバーへのアップロードは一切なし
- ユーザーのプライバシー保護

### パフォーマンス
- 大きな画像は自動でリサイズ（メモリ節約）
- Canvas操作の最適化
- 不要なリレンダリング防止

### ブラウザ互換性
- モダンブラウザ対応（ES6+）
- 必要に応じてpolyfill追加検討
- IE11は非対応（GitHub Pagesの要件に準拠）

---

**作成日**: 2025-10-31
**最終更新**: 2025-10-31
**バージョン**: 2.1 - トリミングフロー・レスポンシブ対応・マルチサイズプレビュー追加 ⭐
**ステータス**: 計画フェーズ
