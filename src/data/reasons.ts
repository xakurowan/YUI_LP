import type { IconName } from '../icons/paths'

export type Reason = {
  number: string
  icon: IconName
  title: string
  description: string
}

// 要件書 §3-3 準拠（確定情報）
export const reasons: Reason[] = [
  {
    number: '01',
    icon: 'office-visit',
    title: 'オフィスや事業所へ直接訪問',
    description:
      '移動の手間なく、その場で施術が受けられるので、業務の合間や休憩時間を有効活用できます。',
  },
  {
    number: '02',
    icon: 'shield-check',
    title: '国家資格保有の柔道整復師が担当',
    description:
      '身体の専門知識を持つ国家資格者が、安心・安全にお一人おひとりの状態に合わせて施術します。',
  },
  {
    number: '03',
    icon: 'heart',
    title: '健康経営を強力にサポート',
    description:
      '社員の健康維持・増進により、離職率の低下や生産性向上、企業イメージ向上が期待できます。',
  },
]
