import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../../components/ui/Button';
import { EVENT_DATE } from '../../constants/event';
import { colors, fonts, radius } from '../../theme';
import { Countdown } from './Countdown';

type Props = { onReservePress?: () => void };

export function HeroCard({ onReservePress }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.texts}>
        <Text style={styles.eyebrow}>WRC RALLY PARAGUAY 2027</Text>
        <Text style={styles.title}>¿Jahata pio al rally?</Text>
      </View>

      <Countdown target={EVENT_DATE} />

      <Button label="Reservar ahora" onPress={onReservePress} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 16,
    paddingVertical: 22,
    paddingHorizontal: 20,
    borderRadius: radius.xl,
    backgroundColor: colors.surface,
  },
  texts: { gap: 8 },
  eyebrow: { fontFamily: fonts.heading, fontSize: 11, letterSpacing: 1.5, color: colors.primary },
  title: {
    fontFamily: fonts.display,
    fontSize: 22,
    lineHeight: 28,
    letterSpacing: -0.2,
    color: colors.textdark,
  },
});