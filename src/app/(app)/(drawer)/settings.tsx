import { Screen } from "@/components/Screen";
import { Colors } from "@/theme/colors";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function SettingsDrawerItem() {
  return (
    <Screen>
      <View style={styles.wrap}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.meta}>This app is using a polished mock settings screen for now.</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Delivery preferences</Text>
          <Text style={styles.cardBody}>Favorites, theme, and notifications can live here next.</Text>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingHorizontal: 18, paddingTop: 8 },
  title: { color: Colors.text, fontSize: 26, fontWeight: "900" },
  meta: { color: Colors.muted, marginTop: 8, lineHeight: 18 },
  card: {
    marginTop: 16,
    backgroundColor: Colors.card,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: Colors.line,
  },
  cardTitle: { color: Colors.text, fontWeight: "900" },
  cardBody: { color: Colors.muted, marginTop: 8, lineHeight: 20 },
});

