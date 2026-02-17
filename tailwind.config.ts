import type { Config } from 'tailwindcss';
import { colors, radii, typography } from './src/theme/tokens';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: colors.background,
        text: colors.text,
        accent: colors.accent,
        border: colors.border,
        success: colors.success,
        warning: colors.warning,
        error: colors.error,
      },
      fontFamily: {
        display: [typography.display],
        body: [typography.body],
        mono: [typography.mono],
      },
      borderRadius: {
        sm: radii.sm,
        md: radii.md,
        lg: radii.lg,
        xl: radii.xl,
        full: radii.pill,
      },
    },
  },
  plugins: [],
};

export default config;
