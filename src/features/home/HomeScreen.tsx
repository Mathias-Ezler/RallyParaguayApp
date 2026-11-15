import { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SearchBar } from '../../components/home//SearchBar';
import { Greeting } from '../../components/home/Greeting';
import { HomeHeader } from '../../components/home/Header';
import { colors } from '../../theme';

// TODO: tomar el nombre de la sesión cuando exista backend
const USER_NAME = 'Mathias Nahuel';

export function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={[
        styles.content,
        { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 24 },
      ]}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}>
      <HomeHeader hasUnread />
      <Greeting name={USER_NAME} />
      <SearchBar value={query} onChangeText={setQuery} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { paddingHorizontal: 20, gap: 22 },
});