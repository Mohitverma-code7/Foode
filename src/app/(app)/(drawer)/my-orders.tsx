import { Screen } from "@/components/Screen";
import { Colors } from "@/theme/colors";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function MyOrdersDrawerItem() {
  return (
    <Screen>
      <View style={styles.wrap}>
        <Text style={styles.title}>My Orders</Text>
        <Text style={styles.meta}>Track active deliveries, reorder favorites, and review past checkouts.</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Today</Text>
          <Text style={styles.cardBody}>Fire & Lime Tacos is preparing your lunch order.</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Last week</Text>
          <Text style={styles.cardBody}>Sushi Orbit, Green Bowl, and Pasta Avenue were delivered on time.</Text>
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

