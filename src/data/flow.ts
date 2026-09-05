import type { IconName } from '../icons/paths'

export type FlowStep = {
  number: string
  icon: IconName
  title: string
  description: string
}

// 要件書 §3-7 準拠（確定情報）
export const flowSteps: FlowStep[] = [
  {
    number: '01',
    icon: 'mail',
    title: 'お問い合わせ',
    description: 'メール・LINEでお問い合わせください',
  },
  {
    number: '02',
    icon: 'calendar',
    title: '日程調整',
    description: 'ご希望日時をお伺いします',
  },
  {
    number: '03',
    icon: 'house-visit',
    title: '訪問・施術',
    description: 'オフィスなどで施術を行います',
  },
  {
    number: '04',
    icon: 'refresh',
    title: 'アフターフォロー',
    description: 'ご要望に応じて定期施術も可能です',
  },
]
