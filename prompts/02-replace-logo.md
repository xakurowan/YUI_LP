# 依頼：サイトロゴ／アイコンの差し替え

新しいロゴマーク（手のひらとハート／グラデーション円）に差し替える。
現在ヘッダーで使用している `logo-full.png`（円形・文字入り）は廃止する。

## 1. 支給素材

`logo/` ディレクトリに配置済み。すべて背景透過済み・円形に切り抜き済み。

| ファイル | 用途 |
|---|---|
| `logo-mark.png`（1024px） | マスター |
| `logo-mark-512/256/192/180/128/64.png` | 書き出し済みの各サイズ |
| `logo-mark-maskable-512.png` | Android maskable 用（中央80%＋淡色余白） |
| `favicon-simple-512/192/180/64/48/32/16.png` | **小サイズ専用の簡略版**（ハートのみ。詳細は §4） |
あ
## 2. 前提となる設計判断（これに従うこと）

- ロゴマークは**線が細く、要素が3つ（左手・ハート・右手）ある**。
  32px以下では判読できないため、**サイズによって2種類を使い分ける**
- グラデーション円の外周は淡い（左上が黄〜クリーム、右がピンク）。
  **白背景に置くと輪郭が溶ける**ため、配置場所を選ぶ
- マーク単体では事業内容が伝わらないため、**ヘッダーでは必ず文字と併記**する

## 3. ヘッダーロゴ

```astro
<a href="#top" class="flex items-center gap-3" aria-label="Private salon 結 -Yui- トップへ">
  <Image src={logoMark} alt="" aria-hidden="true"
         width={44} height={44} class="h-11 w-11 shrink-0" />
  <span class="flex flex-col leading-tight">
    <span class="font-display text-[11px] tracking-wide text-ink-muted">Private salon</span>
    <span class="text-base font-bold text-ink">結 -Yui-</span>
  </span>
</a>
```

要件：

- マークのサイズは **40〜48px**（現状は小さすぎて何の絵か分からない）
- マークには `alt=""` + `aria-hidden="true"` を付け、**隣接テキストと読み上げが二重にならない**
  ようにする。リンク全体の代替は `aria-label` で与える
- 屋号テキストは省略しない。マーク単体にしない
- **モバイルでもテキストを表示する**（44px + テキストなら幅は足りる）。
  どうしても入らない場合のみ「Private salon」の行を落とす
- ロゴ全体をトップへのアンカーにする

## 4. ファビコン（サイズで使い分ける）

| 対象 | 使う素材 | 理由 |
|---|---|---|
| 16 / 32 / 48px（ブラウザタブ） | **`favicon-simple-*.png`** | 手のディテールがつぶれるため、ハートのみの簡略版を使う |
| 180px（apple-touch-icon） | `favicon-simple-180.png` | ホーム画面アイコンも実表示は小さい |
| 192 / 512px（PWA manifest） | `logo-mark-192/512.png`（通常版） | この解像度なら手も判読できる |
| maskable | `logo-mark-maskable-512.png` | 外周が切り抜かれても欠けない |

`<head>` に出力するタグ：

```html
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/favicon-simple-32.png" type="image/png" sizes="32x32">
<link rel="icon" href="/favicon-simple-16.png" type="image/png" sizes="16x16">
<link rel="apple-touch-icon" href="/favicon-simple-180.png">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="#E0356B">
```

`site.webmanifest`:

```json
{
  "name": "Private salon 結 -Yui- ｜ 企業向け出張整体",
  "short_name": "結 -Yui-",
  "icons": [
    { "src": "/logo-mark-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/logo-mark-512.png", "sizes": "512x512", "type": "image/png" },
    { "src": "/logo-mark-maskable-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ],
  "theme_color": "#E0356B",
  "background_color": "#FFFFFF",
  "display": "standalone",
  "start_url": "/"
}
```

`favicon.ico` は `logo/favicon-simple-32.png` から生成すること（16/32/48のマルチサイズ）。

## 5. OGP画像

**ロゴ画像をそのままOGPに使わない。** OGPは 1200×630 の横長で、
SNSやチャットに貼られたときサービス内容が伝わる必要がある。

`public/ogp.png`（1200×630）を新規に作成すること：

- 背景：白 `#FFFFFF`
- 左：ロゴマーク（180px程度）＋「Private salon 結 -Yui-」
- 中央〜右：「出張整体で健康経営をサポート」を大きく（`Noto Sans JP` Bold）
- 下部：「国家資格保有／法人契約対応／仙台エリア」を小さく
- **文字が主役**。ロゴは添え物として扱う

```html
<meta property="og:image" content="https://TODO/ogp.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
```

## 6. 構造化データ

`LocalBusiness` の JSON-LD に `logo` と `image` を追加：

```json
"logo": "https://TODO/logo-mark-512.png",
"image": "https://TODO/ogp.png"
```

## 7. 配置場所の制約（ここを守らないと輪郭が消える）

グラデーション円の左上は `#FDF0D8` 近辺のごく淡い色で、**白背景では境界が見えない**。

- 白背景（`bg-white`）：許容。ヘッダーはこれでよい（隣接する文字が輪郭を補う）
- `bg-rose-tint`（`#FDF2F6`）の上：**禁止**。ピンク側の外周が背景に溶ける
- フッターなど淡色背景に置く場合は、`bg-white` の円形パディングを1枚挟むか、
  `ring-1 ring-line` で1pxの輪郭を与える

## 8. 既存の記述を削除

- `logo-full.png`（円形・文字入りの旧ロゴ）の参照をすべて削除し、ファイル自体も削除する
- 旧ファビコン（Astroのデフォルト `favicon.svg` 等）を削除する
- 削除漏れがないか `grep -rn "logo-full" src/ public/` で確認する
- 作業が完了したらリポジトリ直下の `logo/` ディレクトリを削除する
  （必要なファイルは `public/` と `src/assets/images/` に移動済みであることを確認してから）

## 9. 色に関する注意（変更はしない、認識だけ揃える）

- ロゴのハートは **`#DD1508` 付近の朱色**で、ブランドアクセント `--color-rose-brand: #E0356B`
  とは別の色。**ロゴの色を勝手に補正しない**（ロゴは既存資産）
- ただし、**ロゴの色をUIに波及させない**こと。ボタン・アイコン・見出しの色は
  引き続き `@theme` のトークンのみを使う。ロゴのグラデーション（黄→ピンク）を
  セクション背景などに真似して使うことを禁止する

## 10. 検証

- [ ] 実際にブラウザのタブで16px表示を目視し、ハートとして判別できること
- [ ] iOS Safari で「ホーム画面に追加」し、アイコンが正方形に潰れていないこと
- [ ] Android Chrome のインストールプロンプトで maskable アイコンの外周が欠けないこと
- [ ] ヘッダーロゴがキーボードフォーカス可能で、フォーカスリングが視認できること
- [ ] スクリーンリーダーで「Private salon 結 -Yui- トップへ」と1回だけ読まれること
      （マークと文字で二重に読まれないこと）
- [ ] 390px 幅でヘッダーのロゴ＋文字が折り返さないこと
- [ ] `pnpm build` が警告なしで通ること
