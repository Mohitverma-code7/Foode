import { PrimaryButton } from "@/components/PrimaryButton";
import { Screen } from "@/components/Screen";
import { signInMock } from "@/state/authStore";
import { Colors } from "@/theme/colors";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { ActivityIndicator, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from "react-native";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("alex@example.com");
  const [loading, setLoading] = useState(false);

  const canSubmit = useMemo(() => email.trim().length > 3, [email]);

  async function onLogin() {
    if (!canSubmit) return;
    setLoading(true);
    try {
      await signInMock(email.trim());
      // Replace so back doesn't go to login.
      router.replace("/(app)/(tabs)/home");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.wrap}>
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>Sign in to order from your favorite restaurants.</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            placeholderTextColor="rgba(255,255,255,0.35)"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <PrimaryButton title={loading ? "Signing in..." : "Login"} onPress={onLogin} disabled={!canSubmit || loading} />

          <Text style={styles.tip}>Mock auth: any email works. Your session is persisted.</Text>
        </View>

        {loading ? <ActivityIndicator color={Colors.brand} style={{ marginTop: 14 }} /> : null}
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: 18,
    paddingTop: 28,
  },
  title: {
    color: Colors.text,
    fontSize: 30,
    fontWeight: "900",
  },
  subtitle: {
    color: Colors.muted,
    marginTop: 8,
    lineHeight: 18,
  },
  form: {
    marginTop: 26,
    gap: 12,
  },
  label: {
    color: Colors.muted,
    fontSize: 13,
    fontWeight: "700",
  },
  input: {
    height: 48,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    paddingHorizontal: 12,
    backgroundColor: "rgba(255,255,255,0.03)",
    color: Colors.text,
  },
  tip: {
    marginTop: 10,
    color: "rgba(255,255,255,0.6)",
    fontSize: 12,
  },
});

