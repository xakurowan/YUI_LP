# CLAUDE.md

このリポジトリ（`git@github.com:xakurowan/YUI_LP.git`）用のガイダンス。
別ディレクトリ`yui_reserve/`にある`tomocha`（Next.js予約システム、独立repo）とは
コード上の関係を持たない。
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

## このLPの目的（判断に迷ったときの基準）

- ターゲットは従業員10〜200名規模の企業の 総務／人事／労務／経営者
- CVは①無料見積り・相談の問い合わせ ②LINEでの相談（現在準備中の間はメールで代替）
- **「その場で決めさせる」ページではない。**読んでいる担当者は決裁者ではなく、
  社内で説明する立場にいる。「その人が明日の会議で話せる材料を渡せているか」が評価軸
- したがって割引・希少性の演出（「今なら◯%OFF」「残り◯社」）は使わない。
  料金・導入の流れ・FAQといった「持ち帰れる情報」を優先する
- CTAは**2種類のみ**。ページ内で5〜6回繰り返す。種類を増やして選択肢を作らない

## 表現上の注意（必須・違反はリリースブロッカー）

施術系サービスのため、景品表示法・医療広告規制まわりのリスクがある。

- **「治る」「治療」「改善します」「効果があります」といった断定表現を使わない。**
  「〜が期待できます」「〜のケアをお手伝いします」に置き換える
- 疾患名を挙げて「治す」と示唆する記述を作らない
- 「No.1」「業界初」「満足度◯%」など**根拠のない優位性表現を勝手に作らない**
- 導入事例・お客様の声には必ず「※効果には個人差があります」を併記する
- 数字には必ず条件を添える（例：「2時間 22,000円〜（税込・出張費込み／遠方は別途）」）
- **チラシに書かれていない実績・社数・導入企業名・満足度を創作しない。**
  情報が無い箇所は `TODO:` を置き、`docs/open-questions.md` に追記する
- 上記は法的助言ではない。公開前に事業者側で最終確認する旨を
  `docs/open-questions.md` に残しておくこと

## デザイン規範

トークンの定義場所は上記の通り `src/styles/global.css` の `@theme`。運用ルールは以下。

- 彩度の高いピンク（`--color-rose-brand`）の**塗り面積は画面の10%以下**に抑える。
  面には `--color-rose-tint`、アクセントは点で使う
- クリーム・ベージュ系（`#F5F5DC`, `#FAF0E6` 等）を背景に使わない。白か `rose-tint`
- **見出しの下にアクセントの下線バーを引かない。**区切りは余白で作る
- 装飾的なカラーバー・サイドストライプ・カード片側だけの縁取りを使わない
- グラデーションは同系色で色相差の小さいもののみ。多色グラデ禁止
- 角丸は `16px` に統一（ボタンのみピル型を例外とする）
- セクション上下パディング：PC `128px` / SP `80px`。余白をケチらない
- ロゴのグラデーション（黄→ピンク）をセクション背景などに真似して使わない

## 実装方針

- クライアントJSは IntersectionObserver によるスクロール表示のみ。
  UIフレームワーク（React/Vue/Svelte）のアイランドは使わない
- FAQは `<details>` / `<summary>` で実装（JSなし・アクセシビリティ標準対応）
- モーションは `translateY(24px)→0` + `opacity`、`400ms`。同一グリッド内は60msずつstagger。
  `@media (prefers-reduced-motion: reduce)` で必ず無効化する
- 全画像に日本語の `alt` を付ける（装飾目的は `alt=""` + `aria-hidden="true"`）
- 画像のファイル名は半角英小文字・ハイフン区切り。日本語と空白は使わない

## 品質基準（`pnpm build` 前に確認）

- Lighthouse（モバイル）：Performance 95以上 / Accessibility 100 / Best Practices 100 / SEO 100
- LCP <