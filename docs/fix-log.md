# 修正ログ

## ヘッダー／フッターのロゴマークがぼやけて見える（2026-09-07）

### 原因

`Header.astro`・`Footer.astro`ともに`<Image src={logoMark} width={44/32} height={...}>`と
表示ピクセル数のみ指定し、`densities`/`widths`を指定していなかった。`astro:assets`は
指定が無いと表示サイズと同じ1x画像しか生成しないため、DPR2〜3の高DPI画面ではその1枚を
CSSで2〜3倍に引き伸ばして表示することになり輪郭がにじむ。元画像自体は1024pxマスター
（`src/assets/images/logo-mark.png`）を渡しており解像度不足ではない。

### 対応

両箇所の`<Image>`に`densities={[1, 2, 3]}`を追加し、`srcset`へ1x/2x/3x相当を
自動生成させてブラウザ側でDPRに応じた画像を選ばせるようにした。

### 追記（同日）

上記対応後もフッター側は`width={32} height={32}`のままで、実際の表示サイズ
（目視130〜150px相当）と乖離していた。`densities`はあくまで指定した表示サイズ基準で
1x/2x/3xを生成するため、`width`/`height`自体が実表示より小さいと高解像度化の効果が
出ない。`Footer.astro`を`width={130} height={130}` + `class="h-[130px] w-[130px]"`に
修正し、表示サイズと`<Image>`への指定を一致させた。

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
