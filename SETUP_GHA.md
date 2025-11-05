# GitHub Actions でテストを実行するセットアップ手順

このドキュメントでは、GitHub Actions (GHA) を使用してこのプロジェクトのテストを自動実行する方法を説明します。

## 前提条件

- GitHub リポジトリが作成されていること
- プロジェクトが GitHub にプッシュされていること

## 既存のテスト構成

このプロジェクトでは以下のテスト構成を使用しています：

- **テストフレームワーク**: Vitest
- **テスト環境**: happy-dom
- **テストファイル**: `tests/` ディレクトリ内
  - `background.test.js`
  - `utils.test.js`
  - `canvas.test.js`

### ローカルでのテスト実行

```bash
# 全テストを実行
npm test

# ウォッチモードで実行
npm run test:watch

# カバレッジレポート付きで実行
npm run test:coverage
```

## GitHub Actions のセットアップ

### 1. ワークフローファイルの作成

プロジェクトのルートディレクトリに以下のディレクトリ構造を作成します：

```
.github/
  └── workflows/
      └── test.yml
```

### 2. ワークフローファイルの内容

`.github/workflows/test.yml` ファイルを以下の内容で作成します：

```yaml
name: Tests

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  test:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [18.x, 20.x]

    steps:
    - name: Checkout code
      uses: actions/checkout@v4

    - name: Setup Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v4
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'

    - name: Install dependencies
      run: npm ci

    - name: Run tests
      run: npm test

    - name: Run tests with coverage
      run: npm run test:coverage
```

### 3. ワークフローの説明

#### トリガー条件
- `main` または `develop` ブランチへのプッシュ時
- `main` または `develop` ブランチへのプルリクエスト作成/更新時

#### 実行環境
- **OS**: Ubuntu (latest)
- **Node.js**: バージョン 18.x と 20.x でマトリックステスト

#### ステップ
1. **Checkout code**: リポジトリのコードをチェックアウト
2. **Setup Node.js**: 指定されたバージョンの Node.js をセットアップ
3. **Install dependencies**: `npm ci` で依存関係をクリーンインストール
4. **Run tests**: Vitest でテストを実行
5. **Run tests with coverage**: カバレッジレポート付きでテストを実行

### 4. ワークフローファイルを GitHub にプッシュ

```bash
git add .github/workflows/test.yml
git commit -m "Add GitHub Actions workflow for testing"
git push origin your-branch-name
```

## 実行確認

1. GitHub リポジトリの **Actions** タブを開く
2. プッシュまたはプルリクエスト作成後、ワークフローが自動実行される
3. 各ステップの実行状況とログを確認できる

### ステータスバッジの追加（オプション）

README.md にステータスバッジを追加することで、テストの状態を可視化できます：

```markdown
![Tests](https://github.com/your-username/your-repo-name/workflows/Tests/badge.svg)
```

## トラブルシューティング

### テストが失敗する場合

1. **ローカルでテストを実行**: まずローカル環境で `npm test` を実行して問題を特定
2. **依存関係の確認**: `package.json` と `package-lock.json` が最新であることを確認
3. **Node.js のバージョン**: プロジェクトで使用している Node.js のバージョンと GHA のバージョンが互換性があるか確認

### ワークフローが実行されない場合

1. **ブランチ名の確認**: `on.push.branches` で指定したブランチ名と一致しているか確認
2. **ワークフローファイルの配置**: `.github/workflows/` ディレクトリに正しく配置されているか確認
3. **YAML の構文**: YAML ファイルの構文エラーがないか確認

## カスタマイズ

### 特定のブランチのみでテストを実行

```yaml
on:
  push:
    branches: [ main ]  # main ブランチのみ
```

### スケジュール実行

```yaml
on:
  schedule:
    - cron: '0 0 * * *'  # 毎日午前0時（UTC）に実行
```

### カバレッジレポートのアップロード

Codecov などのサービスを使用する場合：

```yaml
- name: Upload coverage to Codecov
  uses: codecov/codecov-action@v3
  with:
    files: ./coverage/coverage-final.json
```

## 参考リンク

- [GitHub Actions ドキュメント](https://docs.github.com/ja/actions)
- [Vitest ドキュメント](https://vitest.dev/)
- [actions/setup-node](https://github.com/actions/setup-node)
