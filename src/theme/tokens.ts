export const colors = {
  background: {
    primary: '#070503',
    secondary: '#0E0A05',
    elevated: '#171006',
    spotlight: '#24180A',
  },
  text: {
    primary: '#FFFCF5',
    secondary: '#E8D4A2',
    subtle: '#B29763',
  },
  accent: {
    primary: '#FFD24A',
    secondary: '#FFE69A',
    subtle: 'rgba(255,210,74,0.16)',
  },
  map: {
    land: '#1B1408',
    landAlt: '#241A0C',
    water: '#2D210F',
    roadMajor: '#9D7A2E',
    roadMinor: '#7A5D24',
    roadStroke: '#3C2A0F',
    boundary: '#5F4720',
    poi: '#2A1F0E',
    labelPrimary: '#F7E7BF',
    labelSecondary: '#D8BC82',
  },
  border: '#6D5220',
  success: '#9FC56B',
  warning: '#F2B72E',
  error: '#D95E42',
  glow: 'rgba(255,210,74,0.44)',
  overlay: 'rgba(7,5,3,0.78)',
} as const;

export const typography = {
  display: '"Space Grotesk", "Avenir Next", "Segoe UI", sans-serif',
  body: '"IBM Plex Sans", "Avenir Next", "Segoe UI", sans-serif',
  mono: '"IBM Plex Mono", "Consolas", monospace',
} as const;

export const radii = {
  sm: '0.5rem',
  md: '0.875rem',
  lg: '1rem',
  xl: '1.5rem',
  pill: '999px',
} as const;

export const shadows = {
  soft: '0 14px 34px rgba(0, 0, 0, 0.62)',
  glow: `0 0 0 1px ${colors.accent.subtle}, 0 16px 40px ${colors.glow}`,
} as const;

export const spacing = {
  section: 'clamp(4rem, 10vh, 7rem)',
  gutter: 'clamp(1.125rem, 3vw, 2.5rem)',
  content: 'min(1120px, 100% - 2 * clamp(1.125rem, 3vw, 2.5rem))',
} as const;

export const gradients = {
  page: `radial-gradient(circle at 12% 0%, ${colors.accent.subtle} 0%, rgba(7,5,3,0) 48%), radial-gradient(circle at 88% 18%, rgba(255,208,92,0.13) 0%, rgba(7,5,3,0) 48%), linear-gradient(160deg, ${colors.background.primary} 0%, ${colors.background.secondary} 42%, ${colors.background.primary} 100%)`,
  card: `linear-gradient(150deg, ${colors.background.elevated} 0%, ${colors.background.secondary} 100%)`,
} as const;

const cssVariables: Record<string, string> = {
  '--color-background-primary': colors.background.primary,
  '--color-background-secondary': colors.background.secondary,
  '--color-background-elevated': colors.background.elevated,
  '--color-background-spotlight': colors.background.spotlight,
  '--color-text-primary': colors.text.primary,
  '--color-text-secondary': colors.text.secondary,
  '--color-text-subtle': colors.text.subtle,
  '--color-accent-primary': colors.accent.primary,
  '--color-accent-secondary': colors.accent.secondary,
  '--color-accent-subtle': colors.accent.subtle,
  '--color-map-land': colors.map.land,
  '--color-map-land-alt': colors.map.landAlt,
  '--color-map-water': colors.map.water,
  '--color-map-road-major': colors.map.roadMajor,
  '--color-map-road-minor': colors.map.roadMinor,
  '--color-map-road-stroke': colors.map.roadStroke,
  '--color-map-boundary': colors.map.boundary,
  '--color-map-poi': colors.map.poi,
  '--color-map-label-primary': colors.map.labelPrimary,
  '--color-map-label-secondary': colors.map.labelSecondary,
  '--color-border': colors.border,
  '--color-success': colors.success,
  '--color-warning': colors.warning,
  '--color-error': colors.error,
  '--color-glow': colors.glow,
  '--color-overlay': colors.overlay,
  '--gradient-page': gradients.page,
  '--gradient-card': gradients.card,
  '--shadow-soft': shadows.soft,
  '--shadow-glow': shadows.glow,
  '--radius-sm': radii.sm,
  '--radius-md': radii.md,
  '--radius-lg': radii.lg,
  '--radius-xl': radii.xl,
  '--radius-pill': radii.pill,
  '--font-display': typography.display,
  '--font-body': typography.body,
  '--font-mono': typography.mono,
  '--space-section': spacing.section,
  '--space-gutter': spacing.gutter,
  '--size-content': spacing.content,
  '--motion-duration-fast': '160ms',
  '--motion-duration-base': '260ms',
  '--motion-duration-slow': '420ms',
  '--motion-ease': 'cubic-bezier(0.22, 1, 0.36, 1)',
  '--legacy-color-black': colors.background.primary,
  '--legacy-color-yellow': colors.accent.primary,
  '--legacy-color-white': colors.text.primary,
  '--legacy-color-grey-900': colors.background.primary,
  '--legacy-color-grey-800': colors.background.secondary,
  '--legacy-color-grey-700': colors.background.elevated,
  '--legacy-color-grey-600': colors.background.spotlight,
  '--legacy-color-border': colors.border,
};

export const applyThemeTokens = () => {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;

  Object.entries(cssVariables).forEach(([name, value]) => {
    root.style.setProperty(name, value);
  });
};
