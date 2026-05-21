import { PrimaryButton } from "@/components/PrimaryButton";
import { Screen } from "@/components/Screen";
import { getRestaurantById } from "@/data/restaurants";
import { addToCart } from "@/state/cartStore";
import { Colors } from "@/theme/colors";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function RestaurantDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id: string; name?: string; price?: string }>();

  const restaurant = useMemo(() => {
    const id = params.id;
    const fromId = getRestaurantById(id);
    if (fromId) return fromId;
    return {
      id: id,
      name: String(params.name ?? "Unknown"),
      price: Number(params.price ?? 10),
      cuisine: "Custom",
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
        <Text style={styles.title}>{restaurant.name}</Text>
        <Text style={styles.meta}>{restaurant.cuisine}</Text>
        <Text style={styles.price}>Avg meal: ${restaurant.price.toFixed(2)}</Text>

        <View style={styles.panel}>
          <Text style={styles.panelTitle}>Popular picks</Text>
          <Text style={styles.panelBody}>• Spicy special combo{"\n"}• Fresh bowl{"\n"}• House dessert</Text>
        </View>

        <PrimaryButton title="Add to cart & checkout" onPress={onAddToCart} style={{ marginTop: 18 }} />

        <Text style={styles.backHint} onPress={() => router.back()}>
          Back
        </Text>
      </View>
    </Screen>
  );
}

// Expo-router hiding the tabs will be handled by a shared layout/segment option next.
const styles = StyleSheet.create({
  wrap: { paddingHorizontal: 18, paddingTop: 22 },
  title: { color: Colors.text, fontSize: 26, fontWeight: "900" },
  meta: { color: Colors.muted, marginTop: 6 },
  price: { color: Colors.text, marginTop: 16, fontWeight: "900", fontSize: 16 },
  panel: {
    marginTop: 18,
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.07)",
  },
  panelTitle: { color: Colors.text, fontWeight: "900" },
  panelBody: { marginTop: 10, color: Colors.muted, lineHeight: 20 },
  backHint: { marginTop: 14, color: Colors.brand, fontWeight: "800" },
});

