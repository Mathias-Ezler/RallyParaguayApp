import { Redirect } from 'expo-router';
import { useEffect } from 'react';
import { resetIntroSeen } from '../features/onboarding/introStorage';

export default function Index() {
  // TEMPORAL: borra el "ya la vi" cada vez que abrís la app. Sacar después de probar.
  useEffect(() => {
    resetIntroSeen();
  }, []);

  return <Redirect href="/login" />;
}