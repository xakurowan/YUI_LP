# CLAUDE.md

`app/YUI_LP` 用のガイダンス。**このディレクトリは独立したgitリポジトリ**
（`git@github.com:xakurowan/YUI_LP.git`）であり、リポジトリルートにある
`tomocha`（Next.js予約システム、`app/TOMOCHA_WEBSITE`）とはコード上の関係を持たない。
唯一の連携点は、LPフッターの「既にご契約中の企業様はこちら」リンク
（`src/data/site.ts` の `reservationSiteUrl`）のみ。

## 技術スタックとバージョン固定（`prompts/yui_lp_2026-09-05-2.md` 準拠、必ず守る）

- Astro 7.x / Tailwind CSS v4.x（`@tailwindcss/vite` 経由。`postcss`/`autoprefixer` は使わない）
- pnpm 11.x（v12は不採用）/ Node.js 24 LTS / TypeScript strict
- Tailwind v3の書き方（`tailwind.config.js`でのテーマ定義、`@tailwind base/components/utilities`、
  `content`配列の手動指定）は**禁止**。色・フォント・角丸などのトークンは必ず
  `src/styles/global.css` の `@theme` ブロックに書く。コンポーネント内に生のhex値を直書きしない
- 依存を追加する際は理由を明示すること。無断でUIキット・アニメーションライブラリを追加しない
  （アイコンも外部ライブラリを使わず `src/icons/paths.ts` に自作パスを集約している）

## この環境（サンドボックス）特有の注意

このサンドボックスにはNode 22系とcorepack無しの状態しか入っていなかったため、以下を実施済み：

- `nvm`（`~/.nvm`）経由でNode 24をインストールし `nvm alias default 24` 済み
- pnpm 11 は `npm install -g pnpm@11`（nvmで入れたNode配下）でグローバル導入済み

**重要**：このBashツールは各コマンドが新しいシェルで起動し、`~/.bashrc` を読み込まない
（`nvm`の`PATH`変更が引き継がれない）。そのため `pnpm`/`node` を使う各コマンドの先頭で
毎回以下を実行すること（実際のインタラクティブなターミナルでは `.bashrc` 経由で自動的に
Node 24 が有効になるため不要）：

```bash
source "$HOME/.nvm/nvm.sh" && nvm use default --silent
```

## pnpm + sharp のハマりどころ（解決済み・再発防止用メモ）

`astro:assets` の `<Image>` はビルド時に `sharp` を使って画像を最適化するが、
`sharp` は Astro本体の `optionalDependencies` にしか入っていない。pnpmは厳格な
依存分離を行うため、`sharp` がプロジェクトの `node_modules` 直下にホイストされず、
`pnpm build` が `MissingSharp: Could not find Sharp` で失敗することがある
（`astro`パッケージ自身の`node_modules/sharp`シンボリックリンクからは解決できるが、
Viteがビルド時にコードを `dist/.prerender/chunks/` 配下へバンドルすると、そこから見て
プロジェクトルートを辿っても `sharp` が見つからないため）。

対策として `package.json` の `dependencies` に `sharp` を明示的に追加済み
（`pnpm-workspace.yaml` の `allowBuilds` でネイティブビルドも許可済み）。
`sharp`のバージョンを上げる際は、`astro`の`optionalDependencies`が要求する
バージョン範囲とずれないよう `astro` の `package.json` を確認すること。

## コンテンツ編集

`src/pages/index.astro` に直書きせず `src/data/*.ts` を編集する（README.md の表を参照）。
写真は `public/images/` ではなく `src/assets/images/`（`astro:assets`でインポートするため）。

## 未確定事項

`docs/open-questions.md` を参照。特に `src/data/site.ts` の `lineUrl` / `siteUrl` /
`reservationSiteUrl` と `src/data/faq.ts` の `confirmed: false` の項目は、
事業者からの回答が揃うまでプレースホルダのまま。
