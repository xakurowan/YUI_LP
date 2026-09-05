// サイト全体の設定・連絡先。
// 未確定の項目は docs/open-questions.md を参照。値が決まり次第ここを更新するだけで
// ページ内の全箇所に反映される（要件書 §2 の「置換1箇所で済むように」に対応）。

export const site = {
  businessName: 'Private salon 結 -Yui-',
  tagline: '〜ご縁を結ぶ癒やし空間〜',
  email: 'sendai.private.salon.yui@gmail.com',
  serviceArea: '宮城県仙台市エリア',

  // TODO: LINE公式アカウントの友だち追加URL（QR画像はあるが遷移先URLが未確定。docs/open-questions.md #3）
  lineUrl: null as string | null,

  // TODO: 本番ドメインが決まり次第、astro.config.mjs の `site` と合わせて更新する
  siteUrl: 'https://yui-lp.example.com',

  // 既契約企業向け：tomocha予約サイトへの導線（docs/wireframe.md「予約サイト連携」参照）
  // TODO: tomochaの本番ドメインが決まり次第、実URLに差し替える
  reservationSiteUrl: 'https://reserve.tomocha.example.com/reserve?source=yui-corp',
} as const

export const primaryCta = {
  label: '無料で見積りを依頼する',
  shortLabel: '無料で見積る',
  href: `mailto:${site.email}?subject=${encodeURIComponent('【結 -Yui-】無料見積りのご相談')}`,
}

export const secondaryCta = {
  label: 'LINEで相談する',
  shortLabel: 'LINEで相談',
  // lineUrl が未確定の間は "#" にし、UI側で「準備中」を示すインジケーターを添える
  href: site.lineUrl ?? '#',
}
