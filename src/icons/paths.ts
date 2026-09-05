// 自作の最小構成ラインアイコン集（外部アイコンライブラリへの依存を追加しないための対応）。
// viewBox は統一で "0 0 24 24"。Icon.astro から名前で参照する。
export const ICON_PATHS: Record<string, string> = {
  mail: `
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  `,
  calendar: `
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M3 10h18" />
    <path d="M8 3v4" />
    <path d="M16 3v4" />
  `,
  "office-visit": `
    <rect x="4" y="9" width="7" height="12" />
    <rect x="13" y="4" width="7" height="17" />
    <path d="M7 13h1M7 16h1M16 8h1M16 11h1M16 14h1" />
  `,
  "house-visit": `
    <path d="M3 11l9-7 9 7" />
    <path d="M5 10v10h14V10" />
    <path d="M10 20v-6h4v6" />
  `,
  "shield-check": `
    <path d="M12 3l7 3v6c0 5-3.5 7.5-7 9-3.5-1.5-7-4-7-9V6l7-3z" />
    <path d="M9 12l2 2 4-4" />
  `,
  heart: `
    <path d="M12 20.5s-8-4.7-9.8-9.7C1 7 3.2 3.6 6.7 3.6c2 0 3.5 1.1 4.1 2.3.6-1.2 2.1-2.3 4.1-2.3 3.5 0 5.7 3.4 4.5 7.2C21.2 15.8 12 20.5 12 20.5z" />
  `,
  pulse: `
    <path d="M3 12h4l2-7 4 14 2-7h6" />
  `,
  "trending-down": `
    <path d="M3 7l6 6 4-4 8 8" />
    <path d="M15 17h6v-6" />
  `,
  "battery-low": `
    <rect x="2" y="8" width="16" height="8" rx="2" />
    <path d="M20 10v4" />
    <rect x="4" y="10" width="3" height="4" fill="currentColor" stroke="none" />
  `,
  users: `
    <circle cx="9" cy="8" r="3" />
    <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
    <circle cx="17" cy="9" r="2.5" />
    <path d="M15.5 13.3c2.5.4 4.5 2.4 4.5 5.2" />
  `,
  refresh: `
    <path d="M4 12a8 8 0 0 1 14-5.3" />
    <path d="M20 12a8 8 0 0 1-14 5.3" />
    <path d="M18 3v4h-4" />
    <path d="M6 21v-4h4" />
  `,
  "file-text": `
    <path d="M7 3h7l4 4v14H7z" />
    <path d="M14 3v4h4" />
    <path d="M9.5 9h2M9.5 12h5M9.5 15h5" />
  `,
  receipt: `
    <path d="M6 3h12v18l-2-1.5L14 21l-2-1.5L10 21l-2-1.5L6 21z" />
    <path d="M8.5 8h7M8.5 11.5h7M8.5 15h4" />
  `,
  bank: `
    <path d="M4 10l8-5 8 5" />
    <path d="M5 10v9M9 10v9M15 10v9M19 10v9" />
    <path d="M3 19h18" />
  `,
  check: `
    <path d="M4 12.5l5 5 11-11" />
  `,
  plus: `
    <path d="M12 5v14M5 12h14" />
  `,
};

export type IconName = keyof typeof ICON_PATHS;
