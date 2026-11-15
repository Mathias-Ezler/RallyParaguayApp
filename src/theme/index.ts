export const colors = {
  primary: '#15466B',
  primaryDark: '#0E3350',
  primarySoft: '#DCE9F4',
  bg: '#103783',
  surface: '#ebf4f5',
  text: '#ffffff',
  subtext: '#9bafd9',
  textMuted: '#ffffff',
  border: '#000000',
  accent: '#C2410C',
  accentSoft: '#FFE9DC',
  success: '#166534',
} as const;

// Los nombres coinciden con los que registra useFonts en app/_layout.tsx
export const fonts = {
  display: 'PlusJakartaSans_800ExtraBold',
  heading: 'PlusJakartaSans_700Bold',
  headingMedium: 'PlusJakartaSans_600SemiBold',
  body: 'Inter_400Regular',
  bodyMedium: 'Inter_500Medium',
  bodySemi: 'Inter_600SemiBold',
} as const;

export const radius = { sm: 12, md: 16, lg: 20, xl: 24 } as const;

export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24 } as const;