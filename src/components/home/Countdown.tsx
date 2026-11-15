import { StyleSheet, Text, View } from 'react-native';
import { useCountdown } from '../../features/home/hooks/useCountdown';
import { colors, fonts, radius } from '../../theme';

type Props = { target: Date };

const pad = (n: number) => String(n).padStart(2, '0');

export function Countdown({ target }: Props) {
  const { days, hours, minutes, seconds } = useCountdown(target);

  const units = [
    { label: 'Días', value: days },
    { label: 'Horas', value: hours },
    { label: 'Min', value: minutes },
    { label: 'Seg', value: seconds },
  ];

  return (
    <View
      accessibilityRole="timer"
      accessibilityLabel={`Faltan ${days} días, ${hours} horas y ${minutes} minutos`}
      style={styles.row}>
      {units.map((unit) => (
        <View key={unit.label} style={styles.box}>
          <Text style={styles.value}>{pad(unit.value)}</Text>
          <Text style={styles.label}>{unit.label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 8 },
  box: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: radius.sm,
    backgroundColor: colors.primarySoft,
  },
  value: {
    fontFamily: fonts.display,
    fontSize: 22,
    color: colors.primary,
    fontVariant: ['tabular-nums'],
  },
  label: { fontFamily: fonts.bodyMedium, fontSize: 11, color: colors.primary },
});