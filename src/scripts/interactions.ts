// スクロール表示・ヘッダー背景切替・モバイル固定CTAバーの表示制御。
// すべて IntersectionObserver ベース（scroll イベントリスナーは使わない）。
// prefers-reduced-motion のときは reveal アニメーションのみ無効化する（CSS側で対応済み）。

function setupReveal() {
  const targets = document.querySelectorAll<HTMLElement>('[data-reveal]')
  if (targets.length === 0) return

  const groups = new Map<string, HTMLElement[]>()
  targets.forEach((el) => {
    const group = el.dataset.revealGroup ?? 'default'
    if (!groups.has(group)) groups.set(group, [])
    groups.get(group)!.push(el)
  })
  groups.forEach((els) => {
    els.forEach((el, i) => {
      el.style.transitionDelay = `${i * 60}ms`
    })
  })

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
  )
  targets.forEach((el) => observer.observe(el))
}

function setupHeaderState() {
  const header = document.getElementById('site-header')
  const sentinel = document.getElementById('header-sentinel')
  if (!header || !sentinel) return

  const observer = new IntersectionObserver(
    ([entry]) => {
      header.classList.toggle('is-scrolled', !entry.isIntersecting)
    },
    { threshold: 0 },
  )
  observer.observe(sentinel)
}

function setupMobileStickyBar() {
  const bar = document.getElementById('mobile-cta-bar')
  const fvEnd = document.getElementById('fv-end-sentinel')
  const footerStart = document.getElementById('footer-sentinel')
  if (!bar || !fvEnd || !footerStart) return

  let pastHero = false
  let nearFooter = false

  const update = () => {
    bar.classList.toggle('is-visible', pastHero && !nearFooter)
  }

  const heroObserver = new IntersectionObserver(
    ([entry]) => {
      pastHero = !entry.isIntersecting
      update()
    },
    { threshold: 0 },
  )
  heroObserver.observe(fvEnd)

  const footerObserver = new IntersectionObserver(
    ([entry]) => {
      nearFooter = entry.isIntersecting
      update()
    },
    { threshold: 0, rootMargin: '0px 0px -10% 0px' },
  )
  footerObserver.observe(footerStart)
}

setupReveal()
setupHeaderState()
setupMobileStickyBar()
