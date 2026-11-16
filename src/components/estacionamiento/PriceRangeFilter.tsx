import { StyleSheet, Text, TextInput, View } from 'react-native';
import { colors, fonts, radius } from '../../theme';

type Props = {
  min: string;
  max: string;
  onChangeMin: (value: string) => void;
  onChangeMax: (value: string) => void;
  invalid?: boolean;
};

const onlyDigits = (value: string) => value.replace(/\D/g, '');

export function PriceRangeFilter({ min, max, onChangeMin, onChangeMax, invalid }: Props) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>Precio (Gs.)</Text>

      <View style={styles.row}>
        <TextInput
          accessibilityLabel="Precio mínimo"
          placeholder="Desde"
          placeholderTextColor={colors.textdarkMuted}
          keyboardType="number-pad"
          maxLength={9}
          value={min}
          onChangeText={(value) => onChangeMin(onlyDigits(value))}
          style={styles.input}
        />
        <Text style={styles.dash}>—</Text>
        <TextInput
          accessibilityLabel="Precio máximo"
          placeholder="Hasta"
          placeholderTextColor={colors.textdarkMuted}
          keyboardType="number-pad"
          maxLength={9}
          value={max}
          onChangeText={(value) => onChangeMax(onlyDigits(value))}
          style={styles.input}
        />
      </View>

      {invalid ? (
        <Text accessibilityRole="alert" style={styles.error}>
          El precio mínimo no puede ser mayor al máximo.
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { gap: 8 },
  label: { fontFamily: fonts.bodySemi, fontSize: 13, color: colors.text },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  input: {
    flex: 1,
    height: 48,
    paddingHorizontal: 14,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    fontFamily: fonts.body,
    fontSize: 15,
    color: colors.textdark,
  },
  dash: { fontFamily: fonts.body, fontSize: 16, color: colors.subtext },
  error: { fontFamily: fonts.bodyMedium, fontSize: 12, color: '#FCA5A5' },
});