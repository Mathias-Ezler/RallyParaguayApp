import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { Availability, Place } from '../../features/places/types';
import { colors, fonts, radius } from '../../theme';

const AVAILABILITY: Record<Availability, { label: string; color: string }> = {
  available: { label: 'Disponible', color: colors.success },
  few: { label: 'Pocos lugares', color: colors.accent },
  full: { label: 'Completo', color: '#B91C1C' },
};

const formatGs = (n: number) => `Gs. ${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;

type Props = { place: Place; onPress?: (place: Place) => void };

export function PlaceCard({ place, onPress }: Props) {
  const status = AVAILABILITY[place.availability];

  return (
    <Pressable
      onPress={() => onPress?.(place)}
      accessibilityRole="button"
      accessibilityLabel={`${place.name}, ${status.label}`}
      style={({ pressed }) => [styles.card, pressed && { opacity: 0.9 }]}>
      <View style={styles.image}>
        <Ionicons name="location" size={36} color="#FFFFFF" />
        <View style={styles.chip}>
          <Text style={[styles.chipText, { color: status.color }]}>{status.label}</Text>
        </View>
      </View>

      <View style={styles.body}>
        <Text style={styles.name}>{place.name}</Text>
        <Text style={styles.meta}>
          Tramo {place.stageName} · {place.walkMinutes} min a pie
        </Text>
        <Text style={styles.price}>{formatGs(place.priceGs)}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: radius.lg, overflow: 'hidden', backgroundColor: colors.surface },
  image: {
    height: 120,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chip: {
    position: 'absolute',
    top: 10,
    left: 10,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  chipText: { fontFamily: fonts.bodySemi, fontSize: 11 },
  body: { padding: 14, gap: 6 },
  name: { fontFamily: fonts.heading, fontSize: 15, color: colors.textdark },
  meta: { fontFamily: fonts.body, fontSize: 13, color: colors.textdarkMuted },
  price: { fontFamily: fonts.display, fontSize: 16, color: colors.primary },
});