import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts } from '../../theme';
import { STAGES } from './stages';

// Centro inicial: zona de tu mapa de referencia (Itapúa), zoom parecido al de tu link.
const INITIAL_REGION = {
  latitude: -27.16997,
  longitude: -55.85035,
  latitudeDelta: 0.6,
  longitudeDelta: 0.6,
};

export function MapScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <MapView style={StyleSheet.absoluteFill} initialRegion={INITIAL_REGION}>
        {STAGES.map((stage) => (
          <Polyline
            key={stage.id}
            coordinates={stage.coordinates}
            strokeColor={colors.accent}
            strokeWidth={4}
          />
        ))}
      </MapView>

      <View style={[styles.topBar, { top: insets.top + 12 }]}>
        <Pressable
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Volver"
          style={styles.backButton}>
          <Ionicons name="chevron-back" size={22} color={colors.textdark} />
        </Pressable>

        <View style={styles.titlePill}>
          <Text style={styles.title}>Mapa de tramos</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  topBar: {
    position: 'absolute',
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titlePill: {
    height: 44,
    paddingHorizontal: 16,
    borderRadius: 14,
    backgroundColor: colors.surface,
    justifyContent: 'center',
  },
  title: { fontFamily: fonts.heading, fontSize: 15, color: colors.textdark },
});