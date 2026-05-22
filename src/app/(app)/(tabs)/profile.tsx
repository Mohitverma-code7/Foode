import { PrimaryButton } from "@/components/PrimaryButton";
import { Screen } from "@/components/Screen";
import { useTheme } from "@/state/themeStore";
import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function ProfileTab() {
  const router = useRouter();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <Screen>
      <ScrollView style={styles.wrap}>
        <View style={styles.hero}>
          <Text style={styles.title}>Profile</Text>
          <Text style={styles.meta}>Open the drawer for settings, help, and sign out.</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Alex Morgan</Text>
          <Text style={styles.cardBody}>alex@example.com</Text>
          <View style={styles.statRow}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>14</Text>
              <Text style={styles.statLabel}>orders</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>8</Text>
              <Text style={styles.statLabel}>saved spots</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>4.8</Text>
              <Text style={styles.statLabel}>rating</Text>
            </View>
          </View>
        </View>

        <View style={styles.linkGrid}>
          <Pressable style={styles.linkCard} onPress={() => router.push("/(app)/(drawer)/my-orders")}>
            <Text style={styles.linkTitle}>My Orders</Text>
            <Text style={styles.linkMeta}>Review recent deliveries</Text>
          </Pressable>
          <Pressable style={styles.linkCard} onPress={() => router.push("/(app)/(drawer)/settings")}>
            <Text style={styles.linkTitle}>Settings</Text>
            <Text style={styles.linkMeta}>Manage app preferences</Text>
          </Pressable>
        </View>

        <View style={styles.footerCard}>
          <Text style={styles.footerTitle}>Need help?</Text>
          <Text style={styles.footerBody}>Use the drawer menu to jump to help, settings, and your order history.</Text>
          <PrimaryButton title="Open Help" onPress={() => router.push("/(app)/(drawer)/help")} style={{ marginTop: 14 }} />
          <PrimaryButton title="Back to Home" onPress={() => router.replace("/(app)/(tabs)/home")} variant="secondary" style={{ marginTop: 12 }} />
        </View>
      </ScrollView>
    </Screen>
  );
}

function createStyles(colors: ReturnType<typeof useTheme>["colors"]) {
  return StyleSheet.create({
    wrap: { paddingHorizontal: 18, paddingTop: 8 },
    hero: { gap: 6 },
    title: { color: colors.text, fontSize: 26, fontWeight: "900" },
    meta: { color: colors.muted, marginTop: 8, lineHeight: 18 },
    card: {
      marginTop: 16,
      backgroundColor: colors.card,
      borderRadius: 22,
      padding: 18,
      borderWidth: 1,
      borderColor: colors.line,
    },
    cardTitle: { color: colors.text, fontWeight: "900" },
    cardBody: { color: colors.muted, marginTop: 6 },
    statRow: { flexDirection: "row", gap: 10, marginTop: 16 },
    stat: {
      flex: 1,
      padding: 12,
      borderRadius: 16,
      backgroundColor: colors.surfaceSoft,
      borderWidth: 1,
      borderColor: colors.line,
    },
    statValue: { color: colors.text, fontSize: 18, fontWeight: "900" },
    statLabel: { color: colors.muted, fontSize: 12, marginTop: 4 },
    linkGrid: { flexDirection: "row", gap: 12, marginTop: 16 },
    linkCard: {
      flex: 1,
      borderRadius: 18,
      padding: 16,
      backgroundColor: colors.surfaceSoft,
      borderWidth: 1,
      borderColor: colors.line,
    },
    linkTitle: { color: colors.text, fontWeight: "900" },
    linkMeta: { color: colors.muted, marginTop: 6, lineHeight: 18, fontSize: 12 },
    footerCard: {
      marginTop: 18,
      padding: 18,
      borderRadius: 22,
      backgroundColor: colors.card,
      borderWidth: 1,
      marginBottom: 18,
      borderColor: colors.line,
    },
    footerTitle: { color: colors.text, fontWeight: "900", fontSize: 16 },
    footerBody: { color: colors.muted, marginTop: 8, lineHeight: 20 },
  });
}
