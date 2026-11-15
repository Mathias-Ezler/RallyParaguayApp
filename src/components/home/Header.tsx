import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../../theme';

type Props = {
  onMenuPress?: () => void;
  onNotificationsPress?: () => void;
  hasUnread?: boolean;
};

export function HomeHeader({ onMenuPress, onNotificationsPress, hasUnread = false }: Props) {
  return (
    <View style={styles.row}>
      <Pressable
        onPress={onMenuPress}
        accessibilityRole="button"
        accessibilityLabel="Abrir menú"
        style={styles.iconButton}>
        <Ionicons name="menu-outline" size={22} color={colors.textdark} />
      </Pressable>

      <Text style={styles.logo}>JAHA</Text>

      <Pressable
        onPress={onNotificationsPress}
        accessibilityRole="button"
        accessibilityLabel="Notificaciones"
        style={styles.iconButton}>
        <Ionicons name="notifications-outline" size={22} color={colors.textdark} />
        {hasUnread ? <View style={styles.dot} /> : null}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: { fontFamily: fonts.body, fontSize: 22, letterSpacing: 3, color: colors.textwhite },
  dot: {
    position: 'absolute',
    top: 10,
    right: 11,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.accent,
  },
});