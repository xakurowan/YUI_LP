# Private salon 結 -Yui- 法人向けLP

出張整体サービス「Private salon 結 -Yui-」の法人向けランディングページ（Astro製・静的サイト）。

要件・ワイヤーフレーム・未確定事項は [`docs/`](./docs) を参照。

## 必要な環境

- **Node.js 24 LTS**
- **pnpm 11.x**（`corepack`または`npm install -g pnpm@11`。v12は今回未採用）

Node 24 が入っていない場合は [nvm](https://github.com/nvm-sh/nvm) の利用を推奨：

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
nvm install 24
nvm alias default 24
```

## セットアップ

```bash
pnpm install
```

初回インストール時、`pnpm-workspace.yaml` の `allowBuilds` により `esbuild` と `sharp`
（`astro:assets` の画像最適化に必須）のネイティブビルドスクリプトが許可されます。

> **補足（pnpm利用時の注意）**：`sharp` は Astro 本体の `optionalDependencies` にしか
> 含まれていないため、pnpm の厳格な依存分離のもとではプロジェクトルートから解決できず
> `MissingSharp` エラーでビルドが失敗することがあります。本プロジェクトでは
> `package.json` の `dependencies` に `sharp` を明示的に追加することで回避しています。

## コマンド

```bash
pnpm dev       # 開発サーバー起動（http://localhost:4321）
pnpm build     # 本番ビルド（./dist/ に静的出力）
pnpm preview   # ビルド結果をローカルでプレビュー
```

## コンテンツの編集方法

ページ本文の文言・画像は原則 `src/pages/index.astro` に直書きせず、
`src/data/*.ts` の構造化データを編集する（非エンジニアでも配列の中身を書き換えるだけで
更新できるようにするため）。

| ファイル | 内容 |
|---|---|
| `src/data/site.ts` | 屋号・メール・LINE URL・本番ドメイン・予約サイトへのリンクなど、サイト全体の設定 |
| `src/data/menus.ts` | サービス内容（6メニュー）。画像は `src/assets/images/` からインポート |
| `src/data/reasons.ts` | 選ばれる3つの理由 |
| `src/data/issues.ts` | 課題提起セクションの4項目 |
| `src/data/flow.ts` | ご利用の流れ（4ステップ） |
| `src/data/testimonials.ts` | 導入企業様の声 |
| `src/data/recommended.ts` | こんな企業様におすすめですセクション |
| `src/data/corporate.ts` | 法人対応バッジ・FVの信頼バッジ |
| `src/data/faq.ts` | FAQ。`confirmed: false` の項目は回答が未確定（下記参照） |

アイコンは外部ライブラリを追加せず `src/icons/paths.ts` に自作のSVGパスを集約している
（`src/icons/Icon.astro` の `name` prop で指定）。追加したい場合はこのファイルに
パスデータを足すだけでよい。

写真素材は `public/images/` ではなく `src/assets/images/` に置くこと（`astro:assets` の
`<Image>` で最適化（AVIF/WebP変換・リサイズ）するには、Vite経由でインポートできる
`src/` 配下に置く必要があるため）。QRコード（`line-qr.png`）は視認性を保つため
`format="png"` を指定し、非可逆圧縮（WebP/AVIF）を避けている。

## 未確定事項（公開前に必ず確認）

以下は要件に明記がなく、創作せず `TODO` のまま実装している。事業者からの回答が揃い次第、
該当ファイルを更新すること。詳細は [`docs/open-questions.md`](./docs/open-questions.md)。

- **LINE友だち追加URL**（`src/data/site.ts` の `lineUrl`）— 未設定の間、LINE系CTAは
  「現在準備中です」の注記付きで表示される
- **本番ドメイン**（`astro.config.mjs` の `site` と `src/data/site.ts` の `siteUrl`）
- **tomocha予約サイトのURL**（`src/data/site.ts` の `reservationSiteUrl`。既契約企業向けの
  フッターリンク先。現在プレースホルダドメイン）
- **FAQの回答**（`src/data/faq.ts`。一部項目が `confirmed: false` で「準備中」表示）
- `src/pages/privacy.astro` は最低限の内容で作成したドラフト。事業内容に合わせて
  内容を見直し、公開前に法務確認を受けること

表現面（「治る」等の断定表現を避ける等）についても、公開前に事業者側で最終確認すること
（景品表示法・医療広告関連。本README・要件書の記載は法的助言ではない）。

## デプロイ（Cloudflare Pages 想定）

```bash
pnpm build
```

`dist/` を Cloudflare Pages にデプロイする。ビルド設定例：

- Build command: `pnpm build`
- Build output directory: `dist`
- Node version: `24`

独自ドメインを割り当てたら、上記「未確定事項」の本番ドメインを更新して再デプロイすること。
