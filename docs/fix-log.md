# 修正ログ

## FVのCTAボタンがモバイルで50%幅になり右に余白が発生（2026-09-07）

`prompts/fix-fv-cta-layout.md` 参照。

### 原因

CTAラッパーを `grid grid-template-columns:max-content`（列幅をコンテンツ最大幅に
フィットさせる）にした状態で、`CtaButton` 側（外側divと`<a>`/`<span>`の両方）に
`width:100%`（`w-full`）を明示指定していたため。

`grid-template-columns: max-content` はトラック幅を「そのトラックに配置される
アイテムの content-based size（コンテンツの自然な最大幅）」から算出するが、
アイテム自身が `width:100%` を持つと、そのアイテムの content-based size の算出が
親トラック幅（＝まだ確定していない値）を参照する形になり、循環的な依存が生じる。
仕様上は `width:100%` は未確定の参照サイズに対して `auto` 扱いされるべきだが、
実装依存で不安定になりやすい既知の落とし穴で、実機では列幅が意図せず均等割り
（約50%）にフォールバックしていたと考えられる（Chrome DevToolsのデバイスモードでは
再現しづらく、実機で初めて顕在化した）。

### 対応

`grid-template-columns:max-content` を使う複雑な実装をやめ、
`prompts/fix-fv-cta-layout.md` が提示する基本形（`flex flex-col` →
`sm:flex-row`、ボタン個別に `w-full sm:w-auto`）に置き換えた。
この形であればgrid track sizingのエッジケースに触れないため、
モバイルでは各ボタンが素直に親コンテナの100%幅になり、必然的に2つの幅が揃う。

### あわせて行った変更

- `CtaButton.astro`：`pending` propと内部の準備中バッジ/注記ロジックを削除し、
  常に機能する `<a>` のみのシンプルな構造にした（`min-h-12`でタップ領域48px確保）
- `src/data/site.ts`：`secondaryCta` を、`lineUrl` が未確定の間は
  「メールで問い合わせる」（`mailto:`）にフォールバックするよう変更。
  押しても何も起きない「LINEで相談する」ボタンを主要導線に置かない方針
  （`lineUrl` が決まれば自動的にLINEリンクに戻る）
- `MobileStickyBar.astro`：上記にともない `aria-disabled` の準備中分岐を削除
- `Header.astro`：右上CTAをモバイル（〜639px）で非表示化（`hidden sm:inline-flex`）。
  モバイルは下部固定バーが同じ役割を担うため、同時に3つのCTAが見える状態を解消
  （下部固定バーの表示制御は元々 `src/scripts/interactions.ts` の
  `setupMobileStickyBar` がFVのCTAブロック通過をIntersectionObserverで検知して
  行っており、この点は変更前から要件を満たしていた）
- FV・料金プラン直下・クロージングCTAの3箇所すべてで同じレイアウトルールに統一
