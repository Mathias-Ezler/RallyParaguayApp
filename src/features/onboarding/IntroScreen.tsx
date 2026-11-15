import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import {
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    View,
    useWindowDimensions,
    type NativeScrollEvent,
    type NativeSyntheticEvent,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '../../components/Button';
import { colors, fonts } from '../../theme';
import { markIntroSeen } from './introStorage';
import { INTRO_SLIDES, type IntroSlide } from './slides';

export function IntroScreen() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const listRef = useRef<FlatList<IntroSlide>>(null);
  const [index, setIndex] = useState(0);
  const isLast = index === INTRO_SLIDES.length - 1;

  const finish = async () => {
    await markIntroSeen();
    router.replace('/home');
  };

  const handleNext = () => {
    if (isLast) {
      finish();
      return;
    }
    listRef.current?.scrollToIndex({ index: index + 1, animated: true });
  };

  const handleScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setIndex(Math.round(e.nativeEvent.contentOffset.x / width));
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + 24, paddingBottom: insets.bottom + 24 }]}>
      <View style={styles.header}>
        <Text style={styles.logo}>JAHA</Text>
        <Pressable onPress={finish} hitSlop={12} accessibilityRole="button">
          <Text style={styles.skip}>Omitir</Text>
        </Pressable>
      </View>

      <FlatList
        ref={listRef}
        data={INTRO_SLIDES}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScrollEnd}
        getItemLayout={(_, i) => ({ length: width, offset: width * i, index: i })}
        style={styles.list}
        renderItem={({ item }) => (
          <View style={[styles.slide, { width }]}>
            <View style={styles.iconBox}>
              <Ionicons name={item.icon} size={34} color={colors.primary} />
            </View>

            <View style={styles.texts}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.subtitle}</Text>
            </View>

            <View style={styles.points}>
              {item.points.map((point) => (
                <View key={point} style={styles.point}>
                  <View style={styles.check}>
                    <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                  </View>
                  <Text style={styles.pointText}>{point}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      />

      <View style={styles.footer}>
        <Button label="Continuar" onPress={handleNext} />
        <View style={styles.dots} accessibilityElementsHidden>
          {INTRO_SLIDES.map((slide, i) => (
            <View key={slide.id} style={[styles.dot, i === index && styles.dotActive]} />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  logo: { fontFamily: fonts.display, fontSize: 20, letterSpacing: 2.8, color: colors.primary },
  skip: { fontFamily: fonts.bodySemi, fontSize: 14, color: colors.primary },
  list: { flex: 1 },
  slide: { paddingHorizontal: 24, justifyContent: 'center', gap: 28 },
  iconBox: {
    width: 72,
    height: 72,
    borderRadius: 22,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  texts: { gap: 12 },
  title: {
    fontFamily: fonts.display,
    fontSize: 32,
    lineHeight: 38,
    letterSpacing: -0.6,
    color: colors.text,
  },
  subtitle: { fontFamily: fonts.body, fontSize: 16, lineHeight: 24, color: colors.textMuted },
  points: { gap: 14 },
  point: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  check: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pointText: { flex: 1, fontFamily: fonts.bodyMedium, fontSize: 15, color: colors.text },
  footer: { paddingHorizontal: 24, gap: 22 },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: 8 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#B6C0CA' },
  dotActive: { width: 24, backgroundColor: colors.accent },
});