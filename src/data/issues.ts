import type { IconName } from '../icons/paths'

export type Issue = {
  icon: IconName
  text: string
}

// 要件書 §3-2 準拠（確定情報）
export const issues: Issue[] = [
  { icon: 'pulse', text: '肩こり・腰痛の訴えが多い' },
  { icon: 'trending-down', text: '集中力や生産性の低下が気になる' },
  { icon: 'battery-low', text: '長時間のデスクワークで疲労が蓄積している' },
  { icon: 'users', text: '社員の健康を支援し定着率を上げたい' },
]
