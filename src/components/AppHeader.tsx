import { Colors } from "@/theme/colors";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export function AppHeader(props: { title: string; backLabel?: string }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title} numberOfLines={1}>
        {props.title}
      </Text>
      {props.backLabel ? <Text style={styles.back}>{props.backLabel}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: "center",
    gap: 2,
  },
  title: {
    color: Colors.text,
    fontWeight: "900",
    fontSize: 16,
  },
  back: {
    color: Colors.muted,
    fontSize: 12,
  },
});

