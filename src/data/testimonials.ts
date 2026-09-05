export type Testimonial = {
  heading: string
  body: string
}

// 要件書 §3-8 準拠（本文は確定情報。見出しのみ社名を伏せる形に言い換え済み — §4 セクション09の指示）
export const testimonials: Testimonial[] = [
  {
    heading: 'デスクワーク中心のIT企業・従業員50名',
    body: 'デスクワーク中心のため、肩こりや腰痛に悩む社員が多く、集中力の低下も課題でした。導入後は「体が軽くなった」という声を多くいただいています。',
  },
  {
    heading: '立ち仕事中心の製造業・従業員80名',
    body: '立ち仕事や重い物を扱う作業が多く、身体の負担が大きい職場です。定期的に来ていただくことで、社員の疲労感がやわらぎ、働きやすい環境づくりに役立っています。',
  },
]

export const testimonialsNote = '※効果には個人差があります。'
