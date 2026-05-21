import { Colors } from "@/theme/colors";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export function RestaurantCard(props: {
  name: string;
  price: number;
  cuisine: string;
  rating?: number;
  eta?: string;
  deliveryFee?: number;
  tags?: string[];
  description?: string;
  featured?: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={props.onPress} style={({ pressed }) => [styles.card, { opacity: pressed ? 0.88 : 1 }]}>
      <View style={styles.accent} />
      <View style={styles.left}>
        <View style={styles.row}>
          <Text style={styles.title}>{props.name}</Text>
          {props.featured ? <Text style={styles.featured}>Featured</Text> : null}
        </View>
        <Text style={styles.meta}>{props.cuisine}</Text>
        {props.description ? <Text style={styles.description}>{props.description}</Text> : null}
        <View style={styles.tags}>
          {props.tags?.slice(0, 3).map((tag) => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.right}>
        <Text style={styles.rating}>{props.rating?.toFixed(1) ?? "4.8"} ★</Text>
        <Text style={styles.price}>${props.price.toFixed(2)}</Text>
        <Text style={styles.sub}>{props.eta ?? "18-25 min"}</Text>
        <Text style={styles.sub}>Fee ${props.deliveryFee?.toFixed(2) ?? "1.99"}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: 24,
    padding: 18,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: Colors.line,
    overflow: "hidden",
    shadowColor: "#D88952",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 2,
  },
  accent: {
    position: "absolute",
    top: -26,
    right: -26,
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "rgba(255,106,43,0.1)",
  },
  left: { flex: 1, paddingRight: 12, zIndex: 1 },
  right: { alignItems: "flex-end" },
  row: { flexDirection: "row", alignItems: "center", gap: 8 },
  title: { color: Colors.text, fontWeight: "900", fontSize: 17, flexShrink: 1 },
  featured: {
    color: Colors.brand,
    fontSize: 11,
    fontWeight: "900",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: "rgba(255,106,43,0.1)",
    overflow: "hidden",
  },
  meta: { color: Colors.muted, marginTop: 6, fontWeight: "700" },
  description: { color: "#6B5345", marginTop: 8, lineHeight: 18 },
  tags: { flexDirection: "row", gap: 6, marginTop: 10, flexWrap: "wrap" },
  tag: {
    borderRadius: 999,
    backgroundColor: Colors.cardStrong,
    borderWidth: 1,
    borderColor: Colors.line,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  tagText: { color: Colors.text, fontSize: 11, fontWeight: "700" },
  rating: { color: Colors.brand, fontWeight: "900", fontSize: 12, marginBottom: 8 },
  price: { color: Colors.text, fontWeight: "900", fontSize: 18 },
  sub: { color: Colors.muted, marginTop: 4, fontSize: 12, fontWeight: "600" },
});
