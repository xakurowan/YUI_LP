import type { ImageMetadata } from 'astro'
import shoulder from '../assets/images/menu-01-shoulder.jpg'
import posture from '../assets/images/menu-02-posture.jpg'
import stretch from '../assets/images/menu-03-stretch.jpg'
import refresh from '../assets/images/menu-04-refresh.jpg'
import hand from '../assets/images/menu-05-hand.jpg'
import foot from '../assets/images/menu-06-foot.jpg'

export type Menu = {
  name: string
  description: string
  image: ImageMetadata
  alt: string
}

// 要件書 §3-4 準拠（確定情報）
export const menus: Menu[] = [
  {
    name: '肩こり・腰痛ケア',
    description: 'デスクワークでコリを緩和',
    image: shoulder,
    alt: '肩こり・腰痛ケアの施術風景',
  },
  {
    name: '姿勢・骨盤調整',
    description: '姿勢を整え不調を軽減',
    image: posture,
    alt: '姿勢・骨盤調整の施術風景',
  },
  {
    name: 'ストレッチ・可動域改善',
    description: '可動域を広げ動きを改善',
    image: stretch,
    alt: 'ストレッチによる可動域改善の施術風景',
  },
  {
    name: 'リフレッシュケア',
    description: '疲労回復して心身リラックス',
    image: refresh,
    alt: 'リフレッシュケアの施術風景',
  },
  {
    name: 'ハンドケア',
    description: '手の疲れをやさしくケア',
    image: hand,
    alt: 'ハンドケアの施術風景',
  },
  {
    name: 'フットケア',
    description: 'むくみ・疲れを足からケア',
    image: foot,
    alt: 'フットケアの施術風景',
  },
]
