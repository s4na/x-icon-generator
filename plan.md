# X Icon Generator - 開発計画書

## 📋 プロジェクト概要

### Purpose / 目的
Xのプロフィールアイコンが円形に切り抜かれて表示される際、特にモバイルで小さく表示されたときにイメージと異なって見える問題を解決する。画像をアップロードしてXでの表示をプレビューし、**カスタマイズ可能な背景と組み合わせて**最適なサイズに加工してダウンロードできるツールを提供する。

### Target Users / ターゲットユーザー
- Xのプロフィール画像を最適化したい一般ユーザー
- SNS運用担当者
- デザイナー

---

## 🎯 機能要件

### Core Features / コア機能

#### 1. 画像アップロード機能
- **File Upload**: ファイル選択ボタンからのアップロード
- **Drag & Drop**: ドラッグ&ドロップ対応
- **対応フォーマット**: JPG, PNG, GIF（非アニメーション）
- **ファイルサイズ制限**: 最大10MB

#### 2. プレビュー機能
- **円形プレビュー**: Xでの実際の表示を再現（円形マスク）
- **マルチサイズプレビュー**:
  - 大サイズ（200x200px）- デスクトップ表示
  - 中サイズ（48x48px）- タイムライン表示
  - 小サイズ（24x24px）- リプライ・リツイート表示
- **リアルタイムプレビュー**: 調整がリアルタイムで反映

#### 3. 画像調整機能
- **拡大縮小**: スライダーまたはホイールで調整
- **位置調整**: ドラッグで画像の位置を移動
- **リセット機能**: 初期状態に戻す

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

```
┌─────────────────────────────────────────┐
│           Header / ヘッダー              │
│  "X Icon Generator" + 説明              │
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────────┐  ┌─────────────────┐ │
│  │             │  │                 │ │
│  │   Upload    │  │   Preview       │ │
│  │   Area      │  │   Panel         │ │
│  │             │  │  - Large (200px)│ │
│  │ アップロード │  │  - Med (48px)   │ │
│  │   エリア     │  │  - Small (24px) │ │
│  └─────────────┘  └─────────────────┘ │
│                                         │
│  ┌─────────────────────────────────────┐│
│  │  Image Controls / 画像コントロール   ││
│  │  - Scale slider / 拡大縮小          ││
│  │  - Position / 位置調整              ││
│  │  - Reset button / リセット          ││
│  └─────────────────────────────────────┘│
│                                         │
│  ┌─────────────────────────────────────┐│
│  │ Background Generator ⭐              ││
│  │ 背景ジェネレーター                   ││
│  │                                     ││
│  │ [Solid] [Gradient] [Pattern] [Preset]│
│  │                                     ││
│  │  - Color picker / カラー選択        ││
│  │  - Gradient controls / グラデ調整   ││
│  │  - Pattern options / パターン選択   ││
│  │  - Opacity slider / 透明度          ││
│  └─────────────────────────────────────┘│
│                                         │
│  ┌─────────────────────────────────────┐│
│  │   Download Section                  ││
│  │   ダウンロードセクション             ││
│  │  [Download PNG] [Download JPG]      ││
│  └─────────────────────────────────────┘│
│                                         │
└─────────────────────────────────────────┘
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
- [ ] Canvasでの画像表示
- [ ] 円形マスク適用
- [ ] 複数サイズプレビュー生成
- [ ] レスポンシブ対応

#### Step 4: 画像調整機能
- [ ] 拡大縮小スライダー実装
- [ ] ドラッグで位置調整実装
- [ ] マウスホイールズーム対応
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

---

## ✅ 成功基準

### Functional Requirements / 機能要件
- ✅ 画像を選択・アップロードできる
- ✅ 円形プレビューが正確に表示される
- ✅ 画像の拡大縮小・位置調整ができる
- ✅ **背景を自由に選択・カスタマイズできる（単色、グラデーション、パターン、プリセット）** ⭐
- ✅ **背景とアイコンを合成したプレビューが正確に表示される** ⭐
- ✅ 背景付き400x400pxの正方形画像をダウンロードできる
- ✅ GitHub Pagesで正常に動作する

### Non-Functional Requirements / 非機能要件
- ✅ モバイル・デスクトップで快適に動作
- ✅ 画像処理が1秒以内に完了
- ✅ 直感的で分かりやすいUI
- ✅ 主要ブラウザで動作（Chrome, Firefox, Safari, Edge）

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
**バージョン**: 2.0 - 背景生成機能追加 ⭐
**ステータス**: 計画フェーズ
