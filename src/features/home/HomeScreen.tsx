import { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Greeting } from '../../components/home/Greeting';
import { HomeHeader } from '../../components/home/Header';
import { HeroCard } from '../../components/home/HeroCard';
import { SearchBar } from '../../components/home/SearchBar';
import { colors } from '../../theme';
import { SideMenu, type MenuKey } from '../menu/SideMenu';

// TODO: tomar el nombre de la sesión cuando exista backend
const USER_NAME = 'Mathias Nahuel';

export function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);

  const handleMenuSelect = (key: MenuKey) => {
    // TODO: navegar a cada pantalla cuando existan
    console.log('Menú:', key);
  };

  return (
    <>
      <ScrollView
        style={styles.screen}
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 24 },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <HomeHeader hasUnread onMenuPress={() => setMenuVisible(true)} />
        <Greeting name={USER_NAME} />
        <SearchBar value={query} onChangeText={setQuery} />
        <HeroCard onReservePress={() => {
        // TODO: ir a la pantalla de estacionamiento cuando exista
}} />
      </ScrollView>

      <SideMenu
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        userName={USER_NAME}
        onSelect={handleMenuSelect}
      />
    </>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { paddingHorizontal: 20, gap: 22 },
});