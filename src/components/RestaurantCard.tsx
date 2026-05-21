import { Colors } from "@/theme/colors";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export function RestaurantCard(props: {
  name: string;
  price: number;
  cuisine: string;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={props.onPress} style={({ pressed }) => [styles.card, { opacity: pressed ? 0.85 : 1 }]}>
      <View style={styles.left}>
        <Text style={styles.title}>{props.name}</Text>
        <Text style={styles.meta}>{props.cuisine}</Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.price}>${props.price.toFixed(2)}</Text>
        <Text style={styles.sub}>Avg meal</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.07)",
  },
  left: { flex: 1, paddingRight: 12 },
  right: { alignItems: "flex-end" },
  title: { color: Colors.text, fontWeight: "800", fontSize: 16 },
  meta: { color: Colors.muted, marginTop: 4 },
  price: { color: "#EAF2FF", fontWeight: "800", fontSize: 18 },
  sub: { color: Colors.muted, marginTop: 2, fontSize: 12 },
});

