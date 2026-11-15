import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'jaha:intro-seen';

export async function hasSeenIntro(): Promise<boolean> {
  try {
    return (await AsyncStorage.getItem(KEY)) === 'true';
  } catch {
    return false;
  }
}

export async function markIntroSeen(): Promise<void> {
  try {
    await AsyncStorage.setItem(KEY, 'true');
  } catch {
    // si falla, la introducción se mostrará de nuevo; no es crítico
  }
}

// Solo para pruebas: permite volver a ver la introducción.
export async function resetIntroSeen(): Promise<void> {
  try {
    await AsyncStorage.removeItem(KEY);
  } catch {}
}