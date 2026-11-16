import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../../theme';

type Props = {
  options: string[];
  value: string | null;
  onChange: (value: string | null) => void;
};

type ChipProps = { label: string; selected: boolean; onPress: () => void };

function Chip({ label, selected, onPress }: ChipProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      style={[styles.chip, selected && styles.chipSelected]}>
      <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{label}</Text>
    </Pressable>
  );
}

export function StageFilter({ options, value, onChange }: Props) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>Tramo</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        // El margen negativo hace que las opciones lleguen al borde de la pantalla
        style={styles.scroll}
        contentContainerStyle={styles.chips}>
        <Chip label="Todos" selected={value === null} onPress={() => onChange(null)} />
        {options.map((option) => (
          <Chip
            key={option}
            label={option}
            selected={value === option}
            onPress={() => onChange(value === option ? null : option)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { gap: 8 },
  label: { fontFamily: fonts.bodySemi, fontSize: 13, color: colors.text },
  scroll: { marginHorizontal: -20 },
  chips: { paddingHorizontal: 20, gap: 8 },
  chip: {
    height: 38,
    paddingHorizontal: 16,
    borderRadius: 19,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipSelected: { backgroundColor: colors.surface },
  chipText: { fontFamily: fonts.bodySemi, fontSize: 14, color: colors.text },
  chipTextSelected: { color: colors.textdark },
});