import type { IconName } from '../icons/paths'

export type CorporateBadge = {
  icon: IconName
  label: string
  emphasize?: boolean
}

// 要件書 §3-10 準拠（確定情報）。「請求書払いに対応」は総務担当に効く情報として
// 視覚的に独立させる（emphasize: true）— docs/wireframe.md セクション11の指示。
export const corporateBadges: CorporateBadge[] = [
  { icon: 'file-text', label: '法人契約対応' },
  { icon: 'receipt', label: 'インボイス登録済' },
  { icon: 'bank', label: '請求書発行・銀行振込対応', emphasize: true },
]

// FVの信頼バッジ（要件書 §4 セクション01準拠）
export const trustBadges: string[] = [
  '国家資格保有',
  '法人契約対応',
  'インボイス登録済',
  '仙台エリア対応',
]
