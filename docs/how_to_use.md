# テンプレートの使い方

このドキュメントでは、テンプレートのインストール方法から開発の開始、各種アセットの扱い方に至るまでを説明します。

## インストールと開発の開始

1. **依存関係のインストール**  
   まず、必要な依存関係をインストールします。

   ```sh
   npm install
   ```

2. **開発サーバーの起動**  
   Vite を使用した開発サーバーを起動します。これにより、HMR（Hot Module Replacement）が有効になり、ファイルの変更がリアルタイムで反映されます。

   ```sh
   npm run dev
   ```

   または `--host` なしで起動することも可能です。

   ```sh
   npm start
   ```

## ディレクトリー構造

```sh
📦 src
 ┣ 📂 components # [Pug] コンポーネント
 ┣ 📂 data # [Pug] グローバルデータ
 ┣ 📂 images # [画像] コンパイル画像が入ります
 ┣ 📂 layouts # [Pug] レイアウト
 ┣ 📂 pages # [Pug] ページ
 ┣ 📂 scripts # [JS] コード
 ┗ 📂 styles # [SCSS] コード
📦 static # [static] 静的ファイル
```

## Pug, SCSS, JavaScript の使用

### Pugについて

`src`ディレクトリ内の`.pug`ファイルを編集することで、HTML テンプレートを管理できます。Pug は HTML よりも簡潔に記述可能です。

#### Pugのデータ

- **グローバルデータ**

  `src/data`ディレクトリ内の`.json`ファイルで追加できます

  ```sh
  📦 src
   ┗ 📂 data # pugのグローバルデータ
     ┣ 📜 cards.json # リストデータ事例
     ┣ 📜 main.json # メインデータ
     ┣ 📜 meta.json # メタデータ
     ┣ 📜 nav.json # ナビデータ
     ┗ 📜 ... # その他のデータをここで追加する
  ```

- **ローカルデータ**

  `src/pages`ディレクトリ内の`.pug.json`ファイルで追加できます

  ```sh
  📦 src
   ┗ 📂 pages
     ┣ 📜 〇〇.pug
     ┗ 📜 〇〇.pug.json # 〇〇ページのローカルデータ
  ```

#### Pugのレイアウト

レイアウトは`src/layouts`ディレクトリ内の`.pug`ファイルで追加できます
レイアウトがページごとに異なる場合は、`〇〇-layout.pug`という形式で追加できます

```sh
📦 src
 ┗ 📂 layouts # pugのレイアウト
   ┣ 📜 main-footer.pug # メインレイアウトのフッター
   ┣ 📜 main-head.pug # メインレイアウトのヘッド
   ┣ 📜 main-header.pug # メインレイアウトのヘッダー
   ┣ 📜 main-layout.pug # メインレイアウト
   ┗ 📜 〇〇-layout.pug # 〇〇レイアウト
```

#### Pugのページ

ページは`src/pages`ディレクトリ内の`.pug`ファイルで追加できます
ページがレイアウトごとに異なる場合は、`〇〇.pug`という形式で追加できます
ページのローカルデータも`〇〇.pug.json`という形式で追加できます

```sh
📦 src
 ┗ 📂 pages # pugのページ
   ┣ 📜 〇〇.pug # 〇〇ページ
   ┗ 📜 〇〇.pug.json # 〇〇ページのローカルデータ
```

#### Pugのコンポーネント

コンポーネントは`src/components`ディレクトリ内の`.pug`ファイルで追加できます

```sh
📦 src
 ┗ 📂 components # pugのコンポーネント
   ┗ 📜 button.pug
```

静的コンポーネントで使用する場合は`include`機能を使います。
データで生成したい場合は`mixin`機能を使います。

```pug
//- include
include components/header.pug

//- button.pugの中身はmixinで定義されています
mixin button({theme, size, onClick, disabled, type})
  button.button(class=theme && `-${theme}`, type=type, onclick=onClick, disabled=disabled)
    block

//- 使用
+button({ theme: 'red', size: 'small', disabled: true, onClick: () => alert('ボタンをクリックしました') })
  ボタン

```

### SCSS

スタイルは`src/styles`ディレクトリ内の`.scss`ファイルで管理します。SCSS を使用することで、CSS よりも効率的にスタイルを記述できます。

#### ディレクトリー構造

```sh
📦 styles
 ┃
 ┃ # ベーススタイル
 ┣ 📂 base
 ┃ ┣ 📜 +.scss # 🚨 削除禁止。フォルダーの中身が自動的にインポートされます
 ┃ ┣ 📜 0_reset.scss
 ┃ ┣ 📜 1_base.scss
 ┃ ┗ 📜 2_animation.scss
 ┃
 ┃ # コンポーネント
 ┣ 📂components
 ┃ ┣ 📜 +.scss # 🚨 削除禁止。フォルダーの中身が自動的にインポートされます
 ┃ ┣ 📜 button.scss
 ┃ ┗ 📜 card.scss
 ┃
 ┃ # 設定
 ┣ 📂config
 ┃ ┣ 📜 +.scss # 🚨 削除禁止。フォルダーの中身が自動的にインポートされます
 ┃ ┣ 📜 functions.scss
 ┃ ┣ 📜 mixins.scss
 ┃ ┗ 📜 variables.scss
 ┃
 ┃ # クリティカル
 ┣ 📂critical
 ┃ ┣ 📜 +.scss # 🚨 削除禁止。フォルダーの中身が自動的にインポートされます
 ┃ ┣ 📜 footer.scss
 ┃ ┣ 📜 header.scss
 ┃ ┗ 📜 layout.scss
 ┃
 ┃ # ページ
 ┣ 📂pages
 ┃ ┣ 📜 +.scss # 🚨 削除禁止。フォルダーの中身が自動的にインポートされます
 ┃ ┗ 📜 top.scss
 ┃
 ┣ 📜 critical.scss # クリティカルスタイル（リセット、レイアウト、ヘッダー、フッター）
 ┗ 📜 main.scss # メインスタイル（クリティカル以外の共通CSS）
```

### JavaScript

`src/scripts`ディレクトリ内の`.js`ファイルは、JavaScriptでスクリプトを管理します。
TypeScriptを使用することも可能です。

## コンパイルされたアセットと静的アセット

- **コンパイルされたアセット**  
  Vite は、Pug、SCSS、JavaScript をコンパイルし、`dist`ディレクトリに出力します。これらはブラウザで直接使用可能な形式です。

- **静的アセット**  
  `static`ディレクトリに配置された画像やフォントなどの静的ファイルは、そのまま出力ディレクトリにコピーされます。

## 本番環境へのビルド

本番環境用にアプリケーションをビルドするには、以下のコマンドを実行します。

```sh
npm run build
```

# ビルドのプレビュー

distフォルダーをローカルサーバーでプレビューするには、以下のコマンドを実行します。

````sh
npm run preview
```
````
