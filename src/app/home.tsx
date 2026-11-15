import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../components/Button';
import { colors, fonts } from '../theme';

// Pantalla temporal: solo confirma que el login funcionó. Se reemplaza por el Home real.
export default function HomePlaceholder() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sesión iniciada</Text>
      <Text style={styles.text}>Acá va el Home.</Text>
      <View style={styles.button}>
        <Button label="Cerrar sesión" variant="outline" onPress={() => router.replace('/login')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 8,
  },
  title: { fontFamily: fonts.display, fontSize: 26, color: colors.text },
  text: { fontFamily: fonts.body, fontSize: 16, color: colors.textMuted },
  button: { marginTop: 24, alignSelf: 'stretch' },
});