import { PrimaryButton } from "@/components/PrimaryButton";
import { Screen } from "@/components/Screen";
import { getRestaurantById } from "@/data/restaurants";
import { addToCart } from "@/state/cartStore";
import { Colors } from "@/theme/colors";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function RestaurantDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id: string; name?: string; price?: string }>();

  const restaurant = useMemo(() => {
    const fromId = getRestaurantById(params.id);
    if (fromId) return fromId;
    return {
      id: params.id,
      name: String(params.name ?? "Unknown"),
      price: Number(params.price ?? 10),
      cuisine: "Custom",
      rating: 4.6,
      eta: "20 min",
      deliveryFee: 1.99,
      description: "A custom restaurant entry.",
      tags: ["Fresh"],
      popularItems: ["Chef special", "House plate", "Seasonal pick"],
    };
  }, [params.id, params.name, params.price]);

  async function onAddToCart() {
    await addToCart({
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
      unitPrice: restaurant.price,
    });
    router.push("/(app)/cart");
  }

  return (
    <Screen>
      <View style={styles.wrap}>
        <View style={styles.hero}>
          <Text style={styles.tag}>{restaurant.cuisine}</Text>
          <Text style={styles.title}>{restaurant.name}</Text>
          <Text style={styles.meta}>{restaurant.description}</Text>

          <View style={styles.heroRow}>
            <View style={styles.heroStat}>
              <Text style={styles.heroValue}>{restaurant.rating.toFixed(1)} ★</Text>
              <Text style={styles.heroLabel}>rating</Text>
            </View>
            <View style={styles.heroStat}>
              <Text style={styles.heroValue}>{restaurant.eta}</Text>
              <Text style={styles.heroLabel}>delivery</Text>
            </View>
            <View style={styles.heroStat}>
              <Text style={styles.heroValue}>${restaurant.deliveryFee.toFixed(2)}</Text>
              <Text style={styles.heroLabel}>fee</Text>
            </View>
          </View>
        </View>

        <View style={styles.panel}>
          <Text style={styles.panelTitle}>Popular picks</Text>
          <View style={styles.itemList}>
            {restaurant.popularItems.map((item) => (
              <View key={item} style={styles.item}>
                <Text style={styles.itemDot}>•</Text>
                <Text style={styles.itemText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.panel}>
          <Text style={styles.panelTitle}>Quick facts</Text>
          <Text style={styles.panelBody}>Fast checkout, live order tracking, and the same cart state across the app.</Text>
          <View style={styles.tags}>
            {restaurant.tags.map((tag) => (
              <View key={tag} style={styles.tagPill}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>

        <PrimaryButton title="Add to cart & checkout" onPress={onAddToCart} style={{ marginTop: 18 }} />

        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>Back</Text>
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingHorizontal: 18, paddingTop: 8 },
  hero: {
    borderRadius: 32,
    padding: 18,
    backgroundColor: Colors.cardStrong,
    borderWidth: 1,
    borderColor: Colors.line,
  },
  tag: {
    color: Colors.brand,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: 1.1,
    fontSize: 12,
  },
  title: { color: Colors.text, fontSize: 28, fontWeight: "900", marginTop: 8 },
  meta: { color: Colors.muted, marginTop: 8, lineHeight: 20 },
  heroRow: { flexDirection: "row", gap: 10, marginTop: 18 },
  heroStat: {
    flex: 1,
    borderRadius: 18,
    padding: 12,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.line,
  },
  heroValue: { color: Colors.text, fontWeight: "900" },
  heroLabel: { color: Colors.muted, fontSize: 12, marginTop: 4 },
  panel: {
    marginTop: 16,
    backgroundColor: Colors.card,
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: Colors.line,
  },
  panelTitle: { color: Colors.text, fontWeight: "900", fontSize: 16 },
  panelBody: { marginTop: 8, color: Colors.muted, lineHeight: 20 },
  itemList: { marginTop: 12, gap: 10 },
  item: { flexDirection: "row", alignItems: "center", gap: 8 },
  itemDot: { color: Colors.brand, fontSize: 18, fontWeight: "900" },
  itemText: { color: Colors.text, fontWeight: "700" },
  tags: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 12 },
  tagPill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: Colors.cardStrong,
    borderWidth: 1,
    borderColor: Colors.line,
  },
  tagText: { color: Colors.text, fontSize: 12, fontWeight: "700" },
  backButton: {
    marginTop: 16,
    alignItems: "center",
    paddingVertical: 12,
  },
  backText: { color: Colors.brand, fontWeight: "900" },
});
