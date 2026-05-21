import { Screen } from "@/components/Screen";
import { Colors } from "@/theme/colors";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function HelpDrawerItem() {
  return (
    <Screen>
      <View style={styles.wrap}>
        <Text style={styles.title}>Help</Text>
        <Text style={styles.meta}>Support, order questions, and account help live here.</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Need a hand?</Text>
          <Text style={styles.cardBody}>Tap the drawer menu to move quickly between cart, orders, and settings.</Text>
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

