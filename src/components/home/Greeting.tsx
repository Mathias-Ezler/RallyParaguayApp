import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../../theme';

type Props = { name: string };

export function Greeting({ name }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.hello}>Bienvenido, {name}</Text>
      <Text style={styles.title}>Explora nuestro contenido y no te pierdas de nada</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 6 },
  hello: { fontFamily: fonts.bodyMedium, fontSize: 30, color: colors.subtext },
  title: {
    fontFamily: fonts.display,
    fontSize: 25,
    lineHeight: 34,
    letterSpacing: -0.6,
    color: colors.text,
  },
});