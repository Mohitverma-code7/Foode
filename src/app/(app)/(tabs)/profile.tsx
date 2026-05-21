import { PrimaryButton } from "@/components/PrimaryButton";
import { Screen } from "@/components/Screen";
import { Colors } from "@/theme/colors";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function ProfileTab() {
  const router = useRouter();

  return (
    <Screen>
      <View style={styles.wrap}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.meta}>Open the drawer to see settings, help, and logout.</Text>

        <PrimaryButton title="Open Drawer" onPress={() => router.push("/(app)/(drawer)/my-orders")} style={{ marginTop: 18 }} />

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Alex Morgan</Text>
          <Text style={styles.cardBody}>alex@example.com</Text>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingHorizontal: 18, paddingTop: 22 },
  title: { color: Colors.text, fontSize: 24, fontWeight: "900" },
  meta: { color: Colors.muted, marginTop: 8, lineHeight: 18 },
  card: {
    marginTop: 18,
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.07)",
  },
  cardTitle: { color: Colors.text, fontWeight: "900" },
  cardBody: { color: Colors.muted, marginTop: 6 },
});

