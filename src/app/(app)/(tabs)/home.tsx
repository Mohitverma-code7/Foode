import { RestaurantCard } from "@/components/RestaurantCard";
import { Screen } from "@/components/Screen";
import { cuisineFilters, restaurants } from "@/data/restaurants";
import { Colors } from "@/theme/colors";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function HomeTab() {
  const router = useRouter();
  const [filter, setFilter] = useState("All");

  const featuredRestaurants = useMemo(() => restaurants.filter((item) => item.featured), []);
  const visibleRestaurants = useMemo(
    () => restaurants.filter((item) => filter === "All" || item.cuisine === filter),
    [filter],
  );

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.wrap} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <View style={styles.heroCopy}>
            <Text style={styles.kicker}>Live delivery</Text>
            <Text style={styles.title}>Good food, right now</Text>
            <Text style={styles.subtitle}>Browse curated spots, view real menus, and jump into checkout fast.</Text>
          </View>

          <View style={styles.heroStats}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>24 min</Text>
              <Text style={styles.statLabel}>avg delivery</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>4.8</Text>
              <Text style={styles.statLabel}>top rating</Text>
            </View>
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
          {cuisineFilters.map((item) => (
            <Pressable
              key={item}
              onPress={() => setFilter(item)}
              style={[styles.chip, filter === item && styles.chipActive]}
            >
              <Text style={[styles.chipText, filter === item && styles.chipTextActive]}>{item}</Text>
            </Pressable>
          ))}
        </ScrollView>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured picks</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.featuredRow}>
          {featuredRestaurants.map((item) => (
            <Pressable
              key={item.id}
              onPress={() =>
                router.push({
                  pathname: "/(app)/restaurant/[id]",
                  params: { id: item.id, name: item.name, price: String(item.price) },
                })
              }
              style={styles.featuredCard}
            >
              <Image source={{ uri: item.image }} style={styles.featuredImage} />
              <View style={styles.featuredCopy}>
                <Text style={styles.featuredTag}>{item.cuisine}</Text>
                <Text style={styles.featuredName}>{item.name}</Text>
                <Text style={styles.featuredBody}>{item.description}</Text>
                <Text style={styles.featuredMeta}>
                  {item.rating.toFixed(1)} ★  {item.eta}
                </Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Restaurants</Text>
          <Text style={styles.sectionMeta}>{visibleRestaurants.length} available</Text>
        </View>

        <View style={styles.list}>
          {visibleRestaurants.map((item) => (
              <RestaurantCard
              key={item.id}
              name={item.name}
              price={item.price}
              cuisine={item.cuisine}
              image={item.image}
              rating={item.rating}
              eta={item.eta}
              deliveryFee={item.deliveryFee}
              tags={item.tags}
              description={item.description}
              featured={item.featured}
              onPress={() =>
                router.push({
                  pathname: "/(app)/restaurant/[id]",
                  params: { id: item.id, name: item.name, price: String(item.price) },
                })
              }
            />
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingHorizontal: 18, paddingTop: 8, paddingBottom: 18 },
  hero: {
    borderRadius: 32,
    padding: 18,
    backgroundColor: Colors.cardStrong,
    borderWidth: 1,
    borderColor: Colors.line,
    overflow: "hidden",
  },
  heroCopy: { gap: 8 },
  kicker: {
    color: Colors.brand,
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  title: { color: Colors.text, fontSize: 30, fontWeight: "900", lineHeight: 34 },
  subtitle: { color: Colors.muted, marginTop: 4, lineHeight: 20 },
  heroStats: { flexDirection: "row", gap: 12, marginTop: 18 },
  statCard: {
    flex: 1,
    borderRadius: 18,
    padding: 14,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.line,
  },
  statValue: { color: Colors.text, fontSize: 20, fontWeight: "900" },
  statLabel: { color: Colors.muted, marginTop: 4, fontSize: 12 },
  chips: { gap: 10, paddingVertical: 16 },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.line,
  },
  chipActive: {
    backgroundColor: "rgba(255,106,43,0.12)",
    borderColor: "rgba(255,106,43,0.24)",
  },
  chipText: { color: Colors.muted, fontWeight: "800" },
  chipTextActive: { color: Colors.text },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 8,
    marginBottom: 10,
  },
  sectionTitle: { color: Colors.text, fontSize: 20, fontWeight: "900" },
  sectionMeta: { color: Colors.muted, fontSize: 12 },
  featuredRow: { gap: 12, paddingBottom: 10 },
  list: { paddingTop: 14, paddingBottom: 16 },
  featuredCard: {
    width: 240,
    borderRadius: 28,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.line,
    overflow: "hidden",
  },
  featuredImage: {
    width: "100%",
    height: 150,
    backgroundColor: Colors.cardStrong,
  },
  featuredCopy: {
    padding: 16,
  },
  featuredTag: {
    color: Colors.brand,
    fontSize: 11,
    fontWeight: "900",
    textTransform: "uppercase",
  },
  featuredName: { color: Colors.text, fontSize: 18, fontWeight: "900", marginTop: 8 },
  featuredBody: { color: Colors.muted, marginTop: 8, lineHeight: 18 },
  featuredMeta: { color: Colors.brand, marginTop: 12, fontWeight: "800" },
});
