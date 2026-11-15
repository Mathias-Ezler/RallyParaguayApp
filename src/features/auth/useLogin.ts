import { router } from 'expo-router';
import { useState } from 'react';
import { hasSeenIntro } from '../onboarding/introStorage';

export function useLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleShowPassword = () => setShowPassword((v) => !v);

  const submit = async () => {
    if (!email.trim() || !password) {
      setError('Completá tu correo y tu contraseña.');
      return;
    }
    setError(null);

    // TODO: reemplazar por la llamada real al backend.
    // Por ahora cualquier correo y contraseña son válidos.
    const seen = await hasSeenIntro();
    router.replace(seen ? '/home' : '/intro');
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    toggleShowPassword,
    error,
    submit,
  };
}