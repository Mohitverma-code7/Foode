import { PrimaryButton } from "@/components/PrimaryButton";
import { Screen } from "@/components/Screen";
import { isValidEmail, normalizeEmail, signInMock, validatePassword } from "@/state/authStore";
import { useTheme } from "@/state/themeStore";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { ActivityIndicator, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function LoginScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [email, setEmail] = useState("alex@example.com");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const normalizedEmail = useMemo(() => normalizeEmail(email), [email]);
  const canSubmit = useMemo(() => isValidEmail(normalizedEmail) && validatePassword(password), [normalizedEmail, password]);

  async function onLogin() {
    if (!isValidEmail(normalizedEmail)) {
      setError("Enter a valid email address.");
      return;
    }
    if (!validatePassword(password)) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await signInMock(normalizedEmail, password);
      router.replace("/(app)/(tabs)/home");
    } catch (authError) {
      setError(authError instanceof Error ? authError.message : "Unable to sign in right now.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen showChrome={false}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.wrap}>
        <View style={styles.hero}>
          <View style={styles.heroBadge}>
            <Text style={styles.heroBadgeText}>FOOD</Text>
          </View>
          <Text style={styles.heroTitle}>Welcome back</Text>
          <Text style={styles.heroBody}>Good to see you again. Sign in to continue your food journey.</Text>
        </View>

        <View style={styles.sheet}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            placeholderTextColor={colors.muted}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="email"
          />

          <View style={styles.rowBetween}>
            <Text style={styles.label}>Password</Text>
            <Pressable>
              <Text style={styles.link}>Forgot password?</Text>
            </Pressable>
          </View>

          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            placeholderTextColor={colors.muted}
            style={styles.input}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />

          {error ? (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          <PrimaryButton title={loading ? "Signing in..." : "Sign In"} onPress={onLogin} disabled={!canSubmit || loading} />

          <View style={styles.dividerRow}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>OR CONTINUE WITH</Text>
            <View style={styles.divider} />
          </View>

          <View style={styles.socialRow}>
            <Pressable style={styles.socialButton}>
              <Text style={styles.socialIcon}>G</Text>
              <Text style={styles.socialText}>Google</Text>
            </Pressable>
            <Pressable style={styles.socialButton}>
              <Text style={styles.socialIcon}>A</Text>
              <Text style={styles.socialText}>Apple</Text>
            </Pressable>
          </View>

          <Text style={styles.bottomText}>
            Don't have an account? <Text style={styles.link}>Sign up</Text>
          </Text>
          <Text style={styles.helpText}>Need help? Contact support</Text>
        </View>

        {loading ? <ActivityIndicator color={colors.brand} style={{ marginTop: 14 }} /> : null}
      </KeyboardAvoidingView>
    </Screen>
  );
}

function createStyles(colors: ReturnType<typeof useTheme>["colors"]) {
  return StyleSheet.create({
    wrap: {
      flex: 1,
      paddingHorizontal: 18,
      paddingTop: 14,
      paddingBottom: 18,
    },
    hero: {
      minHeight: 190,
      borderRadius: 32,
      padding: 18,
      justifyContent: "flex-end",
      backgroundColor: colors.brand,
      shadowColor: colors.shadow,
      shadowOpacity: 0.18,
      shadowRadius: 18,
      shadowOffset: { width: 0, height: 12 },
      elevation: 4,
    },
    heroBadge: {
      alignSelf: "flex-start",
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 14,
      backgroundColor: "rgba(255,255,255,0.18)",
      marginBottom: 18,
    },
    heroBadgeText: {
      color: colors.textOnBrand,
      fontWeight: "900",
      letterSpacing: 1.6,
      fontSize: 12,
    },
    heroTitle: {
      color: colors.textOnBrand,
      fontSize: 32,
      fontWeight: "900",
    },
    heroBody: {
      marginTop: 10,
      color: "#FFF4EA",
      lineHeight: 21,
      fontSize: 16,
      maxWidth: 320,
    },
    sheet: {
      marginTop: 16,
      padding: 18,
      borderRadius: 32,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.line,
      shadowColor: colors.shadow,
      shadowOpacity: 0.08,
      shadowRadius: 16,
      shadowOffset: { width: 0, height: 10 },
      elevation: 2,
    },
    label: {
      color: colors.text,
      fontSize: 13,
      fontWeight: "900",
      letterSpacing: 0.5,
      marginBottom: 8,
    },
    rowBetween: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 14,
      marginBottom: 8,
    },
    link: {
      color: colors.brand,
      fontWeight: "900",
    },
    input: {
      height: 56,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: colors.line,
      paddingHorizontal: 16,
      backgroundColor: colors.surfaceElevated,
      color: colors.text,
      fontSize: 15,
      marginBottom: 12,
    },
    errorBox: {
      marginTop: 4,
      marginBottom: 14,
      padding: 12,
      borderRadius: 16,
      backgroundColor: colors.danger + "14",
      borderWidth: 1,
      borderColor: colors.danger + "2E",
    },
    errorText: {
      color: colors.danger,
      fontSize: 13,
      fontWeight: "700",
    },
    dividerRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      marginVertical: 18,
    },
    divider: {
      flex: 1,
      height: 1,
      backgroundColor: colors.line,
    },
    dividerText: {
      color: colors.muted,
      fontSize: 12,
      fontWeight: "900",
      letterSpacing: 1.6,
    },
    socialRow: {
      flexDirection: "row",
      gap: 12,
    },
    socialButton: {
      flex: 1,
      height: 54,
      borderRadius: 18,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.line,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
    },
    socialIcon: {
      width: 26,
      height: 26,
      borderRadius: 8,
      backgroundColor: colors.surfaceSoft,
      textAlign: "center",
      textAlignVertical: "center",
      color: colors.text,
      fontWeight: "900",
    },
    socialText: {
      color: colors.text,
      fontWeight: "800",
    },
    bottomText: {
      marginTop: 18,
      color: colors.muted,
      textAlign: "center",
      fontSize: 15,
    },
    helpText: {
      marginTop: 18,
      color: colors.muted,
      textAlign: "center",
    },
  });
}
