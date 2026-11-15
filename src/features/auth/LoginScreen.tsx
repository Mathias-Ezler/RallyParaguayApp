import { Ionicons } from '@expo/vector-icons';
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '../../components/Button';
import { TextField } from '../../components/TextField';
import { colors, fonts } from '../../theme';
import { useLogin } from './useLogin';
  
  export function LoginScreen() {
    const insets = useSafeAreaInsets();
    const {
      email,
      setEmail,
      password,
      setPassword,
      showPassword,
      toggleShowPassword,
      error,
      submit,
    } = useLogin();
  
    return (
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[
            styles.content,
            { paddingTop: insets.top + 24, paddingBottom: insets.bottom + 24 },
          ]}>
          <Text style={styles.logo}>JAHA</Text>
  
          <View style={styles.hero}>
            <Text style={styles.title}>Bienvenido a JAHA</Text>
            <Text style={styles.subtitle}>
              Encuentra el mejor lugar para disfrutar del mejor rally del mundo.
            </Text>
          </View>
  
          <View style={styles.form}>
            <TextField
              label="Correo electrónico"
              placeholder="Juan123@gmail.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="email"
              textContentType="emailAddress"
            />
  
            <View style={styles.passwordBlock}>
              <TextField
                label="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="password"
                textContentType="password"
                onSubmitEditing={submit}
                right={
                  <Pressable
                    onPress={toggleShowPassword}
                    hitSlop={12}
                    accessibilityRole="button"
                    accessibilityLabel={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}>
                    <Ionicons
                      name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                      size={22}
                      color={colors.bg}
                    />
                  </Pressable>
                }
              />
              <Pressable
                // TODO: pantalla de recuperación de contraseña
                onPress={() => {}}
                hitSlop={8}
                accessibilityRole="link"
                style={styles.forgot}>
                <Text style={styles.link}>¿Olvidaste tu contraseña?</Text>
              </Pressable>
            </View>
  
            {error ? (
              <Text accessibilityRole="alert" style={styles.error}>
                {error}
              </Text>
            ) : null}
  
            <Button label="Iniciar sesión" onPress={submit}/>
  
            <View style={styles.divider}>
              <View style={styles.line} />
              <Text style={styles.dividerText}>o</Text>
              <View style={styles.line} />
            </View>
  
            <Pressable
              // TODO: login con Google (requiere backend/Firebase)
              onPress={() => {}}
              accessibilityRole="button"
              style={({ pressed }) => [styles.google, pressed && { opacity: 0.85 }]}>
              <Ionicons name="logo-google" size={20} color={colors.primary} />
              <Text style={styles.googleLabel}>Continuar con Google</Text>
            </Pressable>
  
            <View style={styles.footer}>
              <Text style={styles.footerText}>¿No tenés cuenta? </Text>
              <Pressable
                // TODO: pantalla de registro
                onPress={() => {}}
                hitSlop={8}
                accessibilityRole="link">
                <Text style={[styles.link, styles.footerLink]}>Registrate</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
  
  const styles = StyleSheet.create({
    flex: { flex: 1, backgroundColor: colors.bg },
    content: { flexGrow: 1, paddingHorizontal: 24, justifyContent: 'space-between', gap: 32 },
    logo: {
      fontFamily: fonts.display,
      fontSize: 20,
      letterSpacing: 2.8,
      color: "#FFFFFF",
    },
    hero: { gap: 12 },
    title: {
      fontFamily: fonts.display,
      fontSize: 34,
      lineHeight: 40,
      letterSpacing: -0.7,
      color: colors.text,
    },
    subtitle: {
      fontFamily: fonts.body,
      fontSize: 16,
      lineHeight: 24,
      color: colors.subtext,
    },
    form: { gap: 16 },
    passwordBlock: { gap: 10 },
    forgot: { alignSelf: 'flex-end' },
    link: { fontFamily: fonts.bodySemi, fontSize: 14, color: colors.subtext },
    error: { fontFamily: fonts.bodyMedium, fontSize: 13, color: '#B91C1C' },
    divider: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    line: { flex: 1, height: 1, backgroundColor: '#D5DAE0' },
    dividerText: { fontFamily: fonts.body, fontSize: 13, color: colors.textMuted },
    google: {
      height: 54,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
    },
    googleLabel: { fontFamily: fonts.heading, fontSize: 16, color: "#000000" },
    footer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
    footerText: { fontFamily: fonts.body, fontSize: 14, color: colors.textMuted },
    footerLink: { textDecorationLine: 'underline' },
  });