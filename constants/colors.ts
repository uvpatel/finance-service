// ─── Brand Colors ─────────────────────────────────────────────────────────────

export const Colors = {
  // Primary — Blue/Indigo
  primary: {
    50:  '#EEF2FF',
    100: '#E0E7FF',
    200: '#C7D2FE',
    300: '#A5B4FC',
    400: '#818CF8',
    500: '#6366F1',
    600: '#4F46E5',
    700: '#4338CA',
    800: '#3730A3',
    900: '#312E81',
  },

  // Semantic
  success: '#16A34A',
  warning: '#D97706',
  error:   '#DC2626',
  info:    '#0891B2',

  // Neutrals
  white:   '#FFFFFF',
  black:   '#000000',
  gray: {
    50:  '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
  },

  // UI Shorthands
  background:    '#F4F6FB',
  surface:       '#FFFFFF',
  border:        '#E2E8F0',
  textPrimary:   '#0F172A',
  textSecondary: '#64748B',
  textDisabled:  '#94A3B8',
  textInverse:   '#FFFFFF',
} as const;

export const DrawerColors = {
  background: '#1E1B4B',   // Deep indigo
  active:     '#4F46E5',
  activeText: '#FFFFFF',
  text:       '#C7D2FE',
  subtext:    '#818CF8',
  divider:    '#312E81',
  header:     '#312E81',
} as const;
