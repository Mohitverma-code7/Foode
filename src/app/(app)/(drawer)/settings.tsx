import { Screen } from "@/components/Screen";
import { Colors } from "@/theme/colors";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function SettingsDrawerItem() {
  return (
    <Screen>
      <View style={styles.wrap}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.meta}>Drawer route placeholder.</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingHorizontal: 18, paddingTop: 22 },
  title: { color: Colors.text, fontSize: 24, fontWeight: "900" },
  meta: { color: Colors.muted, marginTop: 8, lineHeight: 18 },
});

