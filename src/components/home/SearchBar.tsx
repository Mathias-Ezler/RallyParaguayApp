import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TextInput, View } from 'react-native';
import { colors, fonts, radius } from '../../theme';

type Props = {
  value: string;
  onChangeText: (text: string) => void;
};

export function SearchBar({ value, onChangeText }: Props) {
  return (
    <View style={styles.container}>
      <Ionicons name="search-outline" size={20} color={colors.textdark} />
      <TextInput
        accessibilityLabel="Buscar tramo o zona"
        placeholder="Busca un lugar donde ver el evento "
        placeholderTextColor={colors.textdark}
        value={value}
        onChangeText={onChangeText}
        returnKeyType="search"
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    height: 52,
    paddingHorizontal: 16,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
  },
  input: { flex: 1, height: '100%', fontFamily: fonts.body, fontSize: 15, color: colors.textdark },
});