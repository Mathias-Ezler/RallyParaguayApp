import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PlaceCard } from '../../components/estacionamiento/PlaceCard';
import { PriceRangeFilter } from '../../components/estacionamiento/PriceRangeFilter';
import { StageFilter } from '../../components/estacionamiento/StageFilter';
import { SearchBar } from '../../components/home/SearchBar';
import { ScreenHeader } from '../../components/ui/ScreenHeader';
import { usePlaceFilters } from '../../features/home/hooks/usePlaceFilters';
import { colors, fonts } from '../../theme';
import { MOCK_PLACES } from './mockPlaces';

export function PlacesScreen() {
  const insets = useSafeAreaInsets();
  const {
    query,
    setQuery,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    stage,
    setStage,
    stageOptions,
    results,
    invalidRange,
    hasActiveFilters,
    clear,
  } = usePlaceFilters(MOCK_PLACES);

  // Es un elemento (no un componente) para que el buscador no pierda el foco al escribir.
  const filters = (
    <View style={styles.filters}>
      <SearchBar value={query} onChangeText={setQuery} />

      <PriceRangeFilter
        min={minPrice}
        max={maxPrice}
        onChangeMin={setMinPrice}
        onChangeMax={setMaxPrice}
        invalid={invalidRange}
      />

      <StageFilter options={stageOptions} value={stage} onChange={setStage} />

      <View style={styles.resultsRow}>
        <Text style={styles.count}>
          {results.length} {results.length === 1 ? 'lugar' : 'lugares'}
        </Text>
        {hasActiveFilters ? (
          <Pressable onPress={clear} hitSlop={10} accessibilityRole="button">
            <Text style={styles.clear}>Limpiar filtros</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );

  return (
    <View style={styles.screen}>
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <ScreenHeader title="Lugares" />
      </View>

      <FlatList
        data={results}
        keyExtractor={(place) => place.id}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        ListHeaderComponent={filters}
        ListEmptyComponent={
          <Text style={styles.empty}>No hay lugares con esos filtros.</Text>
        }
        contentContainerStyle={[styles.list, { paddingBottom: insets.bottom + 24 }]}
        renderItem={({ item }) => (
          <PlaceCard
            place={item}
            onPress={(place) => {
              // TODO: abrir el detalle del lugar
              console.log('Lugar:', place.id);
            }}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  header: { paddingHorizontal: 20, paddingBottom: 16 },
  list: { paddingHorizontal: 20, paddingTop: 4, gap: 16 },
  filters: { gap: 16, marginBottom: 4 },
  resultsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  count: { fontFamily: fonts.bodyMedium, fontSize: 13, color: colors.subtext },
  clear: {
    fontFamily: fonts.bodySemi,
    fontSize: 13,
    color: colors.text,
    textDecorationLine: 'underline',
  },
  empty: {
    fontFamily: fonts.body,
    fontSize: 15,
    textAlign: 'center',
    color: colors.subtext,
    paddingVertical: 32,
  },
});