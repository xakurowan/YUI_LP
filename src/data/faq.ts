export type FaqItem = {
  question: string
  answer: string
  /**
   * false の場合、回答内容は未確定（docs/open-questions.md #4）。
   * その場合 answer には創作した回答ではなく「準備中」の案内文を入れている。
   * 事業者からの回答が得られ次第、このファイルの answer / confirmed を更新すること。
   */
  confirmed: boolean
}

const pending =
  '現在ご案内を準備中です。お手数ですがメールまたはLINEにて直接お問い合わせください。'

// 質問文は要件書 §5 準拠（確定）。回答は現時点でほぼ未確定（docs/open-questions.md #4参照）。
export const faqItems: FaqItem[] = [
  {
    question: '施術にはどのくらいのスペースが必要ですか？（ベッド設置の可否／会議室でも可か）',
    answer: pending,
    confirmed: false,
  },
  {
    question: '1回の訪問で何名まで施術できますか？',
    answer: pending,
    confirmed: false,
  },
  {
    question: '社員は着替えが必要ですか？（着衣のまま可か）',
    answer: pending,
    confirmed: false,
  },
  {
    question: '対応エリアはどこまでですか？出張費はかかりますか？',
    answer: pending,
    confirmed: false,
  },
  {
    question: '対応可能な時間帯・曜日は？（就業時間内／休憩時間／終業後）',
    answer: pending,
    confirmed: false,
  },
  {
    question: '最低利用時間や最低人数はありますか？',
    answer: pending,
    confirmed: false,
  },
  {
    question: 'キャンセル・日程変更のポリシーは？',
    answer: pending,
    confirmed: false,
  },
  {
    question: '支払い方法は？（請求書払い・銀行振込・支払サイト）',
    answer:
      '請求書発行・銀行振込に対応しております。支払サイト等の詳細はお見積り時にご案内いたします。',
    confirmed: false,
  },
  {
    question: '定期訪問の契約形態は？（都度／月額／年間）',
    answer: pending,
    confirmed: false,
  },
  {
    question: '衛生管理はどうしていますか？',
    answer: pending,
    confirmed: false,
  },
  {
    question: '効果はどのくらいで実感できますか？',
    answer:
      '効果の感じ方には個人差があります。お一人おひとりの状態に合わせて、継続的なケアをご提案しております。',
    confirmed: true,
  },
]
