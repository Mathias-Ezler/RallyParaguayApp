import { Ionicons } from '@expo/vector-icons';
import { Fragment, useEffect, useRef, useState, type ComponentProps } from 'react';
import {
    Animated,
    Easing,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    View,
    useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts, radius } from '../../theme';

type IconName = ComponentProps<typeof Ionicons>['name'];

    export type MenuKey =
    | 'perfil'
    | 'promociones'
    | 'noticias'
    | 'pilotos-teams'
    | 'tramos'
    | 'contacto'
    | 'establecimiento';

  const ITEMS: { key: MenuKey; label: string; icon: IconName }[] = [
    { key: 'promociones', label: 'Promociones', icon: 'pricetag-outline' },
    { key: 'noticias', label: 'Noticias', icon: 'newspaper-outline' },
    { key: 'pilotos-teams', label: 'Pilotos y Teams', icon: 'people-outline' },
    { key: 'tramos', label: 'Tramos', icon: 'map-outline' },
    { key: 'contacto', label: 'Contáctanos', icon: 'call-outline' },
  ];

type Props = {
  visible: boolean;
  onClose: () => void;
  userName: string;
  activeKey?: MenuKey;
  onSelect?: (key: MenuKey) => void;
};

export function SideMenu({ visible, onClose, userName, activeKey, onSelect }: Props) {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const panelWidth = Math.min(width * 0.8, 340);

  const progress = useRef(new Animated.Value(0)).current;
  const [mounted, setMounted] = useState(visible);

  useEffect(() => {
    if (visible) {
      setMounted(true);
      Animated.timing(progress, {
        toValue: 1,
        duration: 260,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(progress, {
        toValue: 0,
        duration: 200,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) setMounted(false);
      });
    }
  }, [visible, progress]);

  if (!mounted) return null;

  const translateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [-panelWidth, 0],
  });

  const handleSelect = (key: MenuKey) => {
    onClose();
    onSelect?.(key);
  };

  return (
    <Modal
      transparent
      visible
      animationType="none"
      statusBarTranslucent
      onRequestClose={onClose}>
      <View style={styles.root}>
        <Animated.View style={[StyleSheet.absoluteFill, styles.backdrop, { opacity: progress }]}>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={onClose}
            accessibilityRole="button"
            accessibilityLabel="Cerrar menú"
          />
        </Animated.View>

        <Animated.View
          accessibilityViewIsModal
          style={[
            styles.panel,
            {
              width: panelWidth,
              transform: [{ translateX }],
              paddingTop: insets.top + 24,
              paddingBottom: insets.bottom + 24,
            },
          ]}>
          <Pressable
            onPress={() => handleSelect('perfil')}
            accessibilityRole="button"
            accessibilityLabel="Ver perfil"
            style={styles.profile}>
            <View style={styles.avatar}>
              <Ionicons name="person-outline" size={28} color={colors.primary} />
            </View>
            <View style={styles.profileTexts}>
              <Text style={styles.name}>{userName}</Text>
            </View>
          </Pressable>

          <View style={styles.nav}>
            {ITEMS.map((item, index) => {
              const active = item.key === activeKey;
              return (
                <Fragment key={item.key}>
                  <Pressable
                    onPress={() => handleSelect(item.key)}
                    accessibilityRole="button"
                    style={({ pressed }) => [
                      styles.row,
                      active && styles.rowActive,
                      pressed && !active && styles.rowPressed,
                    ]}>
                    <Ionicons
                      name={item.icon}
                      size={22}
                      color={active ? colors.primary : colors.textdark}
                    />
                    <Text style={[styles.rowLabel, active && styles.rowLabelActive]}>
                      {item.label}
                    </Text>
                  </Pressable>

                  {index < ITEMS.length - 1 ? <View style={styles.divider} /> : null}
                </Fragment>
              );
            })}
          </View>

          <View style={styles.footer}>
            <Pressable
              onPress={() => handleSelect('establecimiento')}
              hitSlop={8}
              accessibilityRole="link">
              <Text style={styles.ownerLink}>Terminos y condiciones</Text>
            </Pressable>
            <Text style={styles.logo}>JAHA</Text>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  backdrop: { backgroundColor: 'rgba(14, 51, 80, 0.85)' },
  panel: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    backgroundColor: colors.surface,
    paddingHorizontal: 20,
    gap: 28,
  },
  profile: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileTexts: { flex: 1, gap: 2 },
  name: { fontFamily: fonts.heading, fontSize: 22, color: colors.textdark },
  viewProfile: { fontFamily: fonts.body, fontSize: 13, color: colors.textMuted },
  nav: { flex: 1, gap: 4 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    height: 52,
    paddingHorizontal: 12,
    borderRadius: radius.sm + 2,
  },
  rowActive: { backgroundColor: '#EAF1F8' },
  rowPressed: { backgroundColor: colors.bg },
  rowLabel: { fontFamily: fonts.headingMedium, fontSize: 16, color: colors.textdark },
  rowLabelActive: { fontFamily: fonts.heading, color: colors.primary },
  divider: { height: 1, backgroundColor: colors.primary, marginHorizontal: 12 },
  footer: {
    gap: 14,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#E3E6EA',
  },
  ownerLink: { fontFamily: fonts.bodySemi, fontSize: 14, color: colors.primary },
  logo: { fontFamily: fonts.display, fontSize: 16, letterSpacing: 2.2, color: colors.primary },
});