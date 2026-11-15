import { Pressable, StyleSheet, Text, type PressableProps } from 'react-native';
import { colors, fonts, radius } from '../../theme';

type Props = Omit<PressableProps, 'children'> & {
  label: string;
  variant?: 'primary' | 'outline' | 'light';
};

export function Button({ label, variant = 'primary', style, ...rest }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      style={(state) => [
        styles.base,
        variant === 'primary' && styles.primary,
        variant === 'outline' && styles.outline,
        variant === 'light' && styles.light,
        state.pressed && { opacity: 0.85 },
        typeof style === 'function' ? style(state) : style,
      ]}
      {...rest}>
      <Text
        style={[
          styles.label,
          variant === 'primary' && { color: '#FFFFFF' },
          variant === 'outline' && { color: colors.text },
          variant === 'light' && { color: colors.primary },
        ]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 54,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },

  primary: {
    backgroundColor: colors.bg,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },

  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },

  light: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },

  label: {
    fontFamily: fonts.heading,
    fontSize: 16,
  },
});
