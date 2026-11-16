import { FlatList, StyleSheet, View } from 'react-native';
import { SectionHeader } from '../../components/estacionamiento/Header';
import { PlaceCard } from '../../components/estacionamiento/PlaceCard';
import type { Place } from '../../features/places/types';

type Props = {
  places: Place[];
  onSeeAll?: () => void;
  onPlacePress?: (place: Place) => void;
};

export function PlacesSection({ places, onSeeAll, onPlacePress }: Props) {
  return (
    <View style={styles.section}>
      <SectionHeader title="Mejores lugares" onSeeAll={onSeeAll} />
      <FlatList
        horizontal
        data={places}
        keyExtractor={(place) => place.id}
        showsHorizontalScrollIndicator={false}
        // El margen negativo hace que el carrusel llegue al borde de la pantalla
        style={styles.list}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <PlaceCard place={item} onPress={onPlacePress} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  section: { gap: 14 },
  list: { marginHorizontal: -20 },
  listContent: { paddingHorizontal: 20 },
  item: { width: 248 },
  separator: { width: 14 },
});