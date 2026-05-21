import { PrimaryButton } from "@/components/PrimaryButton";
import { Screen } from "@/components/Screen";
import { signInMock } from "@/state/authStore";
import { Colors } from "@/theme/colors";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { ActivityIndicator, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("alex@example.com");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const canSubmit = useMemo(() => email.trim().length > 3 && password.trim().length >= 4, [email, password]);

  async function onLogin() {
    if (!canSubmit) return;
    setLoading(true);
    try {
      await signInMock(email.trim());
      router.replace("/(app)/(tabs)/home");
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
          <Text style={styles.label}>Email or phone number</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email or phone"
            placeholderTextColor="#8A7164"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
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
            placeholder="••••••••"
            placeholderTextColor="#8A7164"
            style={styles.input}
            secureTextEntry
          />

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

        {loading ? <ActivityIndicator color={Colors.brand} style={{ marginTop: 14 }} /> : null}
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: Colors.brand,
    shadowColor: Colors.brand,
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
    color: "#FFF7F1",
    fontWeight: "900",
    letterSpacing: 1.6,
    fontSize: 12,
  },
  heroTitle: {
    color: "#FFF7F1",
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
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.line,
    shadowColor: "#D88952",
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 2,
  },
  label: {
    color: Colors.text,
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
    color: Colors.brand,
    fontWeight: "900",
  },
  input: {
    height: 56,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.line,
    paddingHorizontal: 16,
    backgroundColor: "#FFF",
    color: Colors.text,
    fontSize: 15,
    marginBottom: 12,
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
    backgroundColor: Colors.line,
  },
  dividerText: {
    color: Colors.muted,
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
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: Colors.line,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  socialIcon: {
    width: 26,
    height: 26,
    borderRadius: 8,
    backgroundColor: Colors.cardStrong,
    textAlign: "center",
    textAlignVertical: "center",
    color: Colors.text,
    fontWeight: "900",
  },
  socialText: {
    color: Colors.text,
    fontWeight: "800",
  },
  bottomText: {
    marginTop: 18,
    color: Colors.muted,
    textAlign: "center",
    fontSize: 15,
  },
  helpText: {
    marginTop: 18,
    color: Colors.muted,
    textAlign: "center",
  },
});
