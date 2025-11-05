import { test, expect } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// テスト用の画像ファイルパス
const testImagePath = path.join(__dirname, '..', 'tests', 'test-image.png');

test.describe('X Icon Generator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('ページが正しく読み込まれる', async ({ page }) => {
    // タイトルチェック
    await expect(page).toHaveTitle(/X Icon Generator/);

    // ヘッダーが表示されている
    await expect(page.locator('.header-title')).toBeVisible();
    await expect(page.locator('.header-title')).toHaveText('X Icon Generator');

    // アップロードエリアが表示されている
    await expect(page.locator('#uploadArea')).toBeVisible();
  });

  test('ファイルアップロードエリアが機能する', async ({ page }) => {
    // ファイル入力が存在する
    const fileInput = page.locator('#fileInput');
    await expect(fileInput).toBeAttached();

    // アップロードエリアがクリック可能
    await expect(page.locator('.file-input-label')).toBeVisible();
  });

  test('背景カスタマイズのタブ切り替えが動作する', async ({ page }) => {
    // テスト画像をアップロード
    const fileInput = page.locator('#fileInput');
    await fileInput.setInputFiles(testImagePath);

    // 背景セクションが表示されるまで待つ
    await expect(page.locator('#backgroundSection')).toBeVisible({ timeout: 10000 });

    // 各タブをクリックして切り替え
    const tabs = ['solid', 'gradient', 'pattern', 'preset'];

    for (const tabName of tabs) {
      const tab = page.locator(`[data-tab="${tabName}"]`);
      await tab.click();
      await expect(tab).toHaveClass(/active/);

      // 対応するパネルが表示される
      const panel = page.locator(`#${tabName}Panel`);
      await expect(panel).toBeVisible();
    }
  });

  test('単色背景のカラーピッカーが動作する', async ({ page }) => {
    // テスト画像をアップロード
    const fileInput = page.locator('#fileInput');
    await fileInput.setInputFiles(testImagePath);

    // 背景セクションが表示されるまで待つ
    await expect(page.locator('#backgroundSection')).toBeVisible({ timeout: 10000 });

    // 単色タブをクリック
    await page.locator('[data-tab="solid"]').click();

    // カラーピッカーが表示される
    const colorPicker = page.locator('#solidColor');
    await expect(colorPicker).toBeVisible();

    // 色を変更
    await colorPicker.fill('#FF0000');

    // 値が変更されたことを確認
    await expect(colorPicker).toHaveValue('#FF0000');
  });

  test('グラデーション背景の設定が動作する', async ({ page }) => {
    // テスト画像をアップロード
    const fileInput = page.locator('#fileInput');
    await fileInput.setInputFiles(testImagePath);

    // 背景セクションが表示されるまで待つ
    await expect(page.locator('#backgroundSection')).toBeVisible({ timeout: 10000 });

    // グラデーションタブをクリック
    await page.locator('[data-tab="gradient"]').click();

    // グラデーションパネルが表示される
    await expect(page.locator('#gradientPanel')).toBeVisible();

    // カラーピッカーが2つある
    const color1 = page.locator('#gradientColor1');
    const color2 = page.locator('#gradientColor2');
    await expect(color1).toBeVisible();
    await expect(color2).toBeVisible();

    // グラデーションタイプの切り替え
    await page.locator('input[value="radial"]').click();
    await expect(page.locator('input[value="radial"]')).toBeChecked();

    // 角度スライダーは線形グラデーションの時だけ表示
    await page.locator('input[value="linear"]').click();
    await expect(page.locator('#gradientAngleGroup')).toBeVisible();
  });

  test('プレビューが表示される', async ({ page }) => {
    // テスト画像をアップロード
    const fileInput = page.locator('#fileInput');
    await fileInput.setInputFiles(testImagePath);

    // プレビューセクションが表示されるまで待つ
    await expect(page.locator('#previewSection')).toBeVisible({ timeout: 10000 });

    // 3つのプレビューキャンバスが存在する
    await expect(page.locator('#previewLarge')).toBeVisible();
    await expect(page.locator('#previewMedium')).toBeVisible();
    await expect(page.locator('#previewSmall')).toBeVisible();

    // X風プレビューも表示される
    await expect(page.locator('#xPreviewSection')).toBeVisible();
    await expect(page.locator('#xAvatarCanvas')).toBeVisible();
  });

  test('拡大縮小スライダーが動作する', async ({ page }) => {
    // テスト画像をアップロード
    const fileInput = page.locator('#fileInput');
    await fileInput.setInputFiles(testImagePath);

    // エディターが表示されるまで待つ
    await expect(page.locator('#editorContainer')).toBeVisible({ timeout: 10000 });

    // スライダーが表示される
    const scaleSlider = page.locator('#scaleSlider');
    await expect(scaleSlider).toBeVisible();

    // スライダーを動かす
    await scaleSlider.fill('150');

    // 表示値が更新される
    await expect(page.locator('#scaleValue')).toHaveText('150%');
  });

  test('リセットボタンが動作する', async ({ page }) => {
    // テスト画像をアップロード
    const fileInput = page.locator('#fileInput');
    await fileInput.setInputFiles(testImagePath);

    // エディターが表示されるまで待つ
    await expect(page.locator('#editorContainer')).toBeVisible({ timeout: 10000 });

    // スライダーを変更
    const scaleSlider = page.locator('#scaleSlider');
    await scaleSlider.fill('150');

    // リセットボタンをクリック
    await page.locator('#resetBtn').click();

    // 値が100%に戻る
    await expect(page.locator('#scaleValue')).toHaveText('100%');
  });

  test('グリッド表示の切り替えが動作する', async ({ page }) => {
    // テスト画像をアップロード
    const fileInput = page.locator('#fileInput');
    await fileInput.setInputFiles(testImagePath);

    // エディターが表示されるまで待つ
    await expect(page.locator('#editorContainer')).toBeVisible({ timeout: 10000 });

    // グリッドトグルボタンが表示される
    const gridToggle = page.locator('#gridToggleBtn');
    await expect(gridToggle).toBeVisible();
    await expect(gridToggle).toHaveText('グリッド: OFF');

    // グリッドをONにする
    await gridToggle.click();
    await expect(gridToggle).toHaveText('グリッド: ON');

    // もう一度クリックしてOFFに戻す
    await gridToggle.click();
    await expect(gridToggle).toHaveText('グリッド: OFF');
  });

  test('ダウンロードボタンが表示される', async ({ page }) => {
    // テスト画像をアップロード
    const fileInput = page.locator('#fileInput');
    await fileInput.setInputFiles(testImagePath);

    // ダウンロードセクションが表示されるまで待つ
    await expect(page.locator('#downloadSection')).toBeVisible({ timeout: 10000 });

    // ダウンロードボタンが2つある
    await expect(page.locator('#downloadPNG')).toBeVisible();
    await expect(page.locator('#downloadJPG')).toBeVisible();

    // ボタンのテキスト確認
    await expect(page.locator('#downloadPNG')).toContainText('PNG形式でダウンロード');
    await expect(page.locator('#downloadJPG')).toContainText('JPG形式でダウンロード');
  });

  test('背景の透明度スライダーが動作する', async ({ page }) => {
    // テスト画像をアップロード
    const fileInput = page.locator('#fileInput');
    await fileInput.setInputFiles(testImagePath);

    // 背景セクションが表示されるまで待つ
    await expect(page.locator('#backgroundSection')).toBeVisible({ timeout: 10000 });

    // 透明度スライダーが表示される
    const opacitySlider = page.locator('#bgOpacity');
    await expect(opacitySlider).toBeVisible();

    // 透明度を変更
    await opacitySlider.fill('50');

    // 表示値が更新される
    await expect(page.locator('#opacityValue')).toHaveText('50%');
  });

  test('背景リセットボタンが動作する', async ({ page }) => {
    // テスト画像をアップロード
    const fileInput = page.locator('#fileInput');
    await fileInput.setInputFiles(testImagePath);

    // 背景セクションが表示されるまで待つ
    await expect(page.locator('#backgroundSection')).toBeVisible({ timeout: 10000 });

    // 背景色を変更
    await page.locator('[data-tab="solid"]').click();
    const colorPicker = page.locator('#solidColor');
    await colorPicker.fill('#FF0000');

    // リセットボタンをクリック
    await page.locator('#resetBackgroundBtn').click();

    // 背景色がデフォルトに戻る（#1DA1F2）
    await expect(colorPicker).toHaveValue('#1da1f2');
  });

  test('フッターにGitHubリンクが表示される', async ({ page }) => {
    // フッターが表示される
    await expect(page.locator('.footer')).toBeVisible();

    // GitHubリンクが存在する
    const githubLink = page.locator('.footer-link[href*="github.com"]');
    await expect(githubLink).toBeVisible();
    await expect(githubLink).toHaveAttribute('href', 'https://github.com/s4na/x-icon-generator');
  });

  test('レスポンシブデザインが機能する', async ({ page }) => {
    // デスクトップビュー
    await page.setViewportSize({ width: 1280, height: 720 });
    await expect(page.locator('.header')).toBeVisible();

    // タブレットビュー
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('.header')).toBeVisible();

    // モバイルビュー
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('.header')).toBeVisible();
  });
});
