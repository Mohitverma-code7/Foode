import { PrimaryButton } from "@/components/PrimaryButton";
import { Screen } from "@/components/Screen";
import { Colors } from "@/theme/colors";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function ProfileTab() {
  const router = useRouter();

  return (
    <Screen>
      <View style={styles.wrap}>
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

        <PrimaryButton title="Open Drawer" onPress={() => router.push("/(app)/(drawer)/help")} style={{ marginTop: 18 }} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingHorizontal: 18, paddingTop: 8 },
  hero: { gap: 6 },
  title: { color: Colors.text, fontSize: 26, fontWeight: "900" },
  meta: { color: Colors.muted, marginTop: 8, lineHeight: 18 },
  card: {
    marginTop: 16,
    backgroundColor: Colors.card,
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: Colors.line,
  },
  cardTitle: { color: Colors.text, fontWeight: "900" },
  cardBody: { color: Colors.muted, marginTop: 6 },
  statRow: { flexDirection: "row", gap: 10, marginTop: 16 },
  stat: {
    flex: 1,
    padding: 12,
    borderRadius: 16,
    backgroundColor: Colors.cardStrong,
    borderWidth: 1,
    borderColor: Colors.line,
  },
  statValue: { color: Colors.text, fontSize: 18, fontWeight: "900" },
  statLabel: { color: Colors.muted, fontSize: 12, marginTop: 4 },
  linkGrid: { flexDirection: "row", gap: 12, marginTop: 16 },
  linkCard: {
    flex: 1,
    borderRadius: 18,
    padding: 16,
    backgroundColor: Colors.cardStrong,
    borderWidth: 1,
    borderColor: Colors.line,
  },
  linkTitle: { color: Colors.text, fontWeight: "900" },
  linkMeta: { color: Colors.muted, marginTop: 6, lineHeight: 18, fontSize: 12 },
});
