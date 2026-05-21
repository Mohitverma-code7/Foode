import { RestaurantCard } from "@/components/RestaurantCard";
import { Screen } from "@/components/Screen";
import { cuisineFilters, restaurants } from "@/data/restaurants";
import { Colors } from "@/theme/colors";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

export default function SearchTab() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [cuisine, setCuisine] = useState("All");

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return restaurants.filter((item) => {
      const matchesCuisine = cuisine === "All" || item.cuisine === cuisine;
      const matchesQuery =
        normalized.length === 0 ||
        item.name.toLowerCase().includes(normalized) ||
        item.cuisine.toLowerCase().includes(normalized) ||
        item.tags.some((tag) => tag.toLowerCase().includes(normalized));
      return matchesCuisine && matchesQuery;
    });
  }, [cuisine, query]);

  const featuredCount = restaurants.filter((item) => item.featured).length;

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.wrap} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <View style={styles.heroText}>
            <Text style={styles.kicker}>Search food</Text>
            <Text style={styles.title}>What are you craving?</Text>
            <Text style={styles.meta}>Search by restaurant, cuisine, or the vibe you want tonight.</Text>
          </View>

          <View style={styles.heroStats}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{results.length}</Text>
              <Text style={styles.statLabel}>matches</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{featuredCount}</Text>
              <Text style={styles.statLabel}>featured</Text>
            </View>
          </View>
        </View>

        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>⌕</Text>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Try sushi, spicy, vegan..."
            placeholderTextColor="#8A7164"
            style={styles.input}
          />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
          {cuisineFilters.map((item) => (
            <Pressable key={item} onPress={() => setCuisine(item)} style={[styles.chip, cuisine === item && styles.chipActive]}>
              <Text style={[styles.chipText, cuisine === item && styles.chipTextActive]}>{item}</Text>
            </Pressable>
          ))}
        </ScrollView>

        <View style={styles.resultHeader}>
          <Text style={styles.resultTitle}>Results</Text>
          <Text style={styles.resultMeta}>{results.length} matches</Text>
        </View>

        <View style={styles.list}>
          {results.map((item) => (
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
  wrap: { paddingHorizontal: 18, paddingTop: 8, paddingBottom: 24 },
  hero: {
    borderRadius: 32,
    padding: 18,
    backgroundColor: Colors.cardStrong,
    borderWidth: 1,
    borderColor: Colors.line,
    overflow: "hidden",
  },
  heroText: { gap: 8 },
  kicker: {
    color: Colors.brand,
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: 1.3,
  },
  title: { color: Colors.text, fontSize: 30, fontWeight: "900", lineHeight: 34 },
  meta: { color: Colors.muted, lineHeight: 20 },
  heroStats: { flexDirection: "row", gap: 12, marginTop: 16 },
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
  searchBox: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderRadius: 18,
    paddingHorizontal: 14,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.line,
    minHeight: 56,
    shadowColor: "#D88952",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  searchIcon: {
    color: Colors.brand,
    fontSize: 20,
    fontWeight: "900",
  },
  input: {
    flex: 1,
    color: Colors.text,
    fontSize: 15,
    paddingVertical: 0,
  },
  chips: { gap: 10, paddingVertical: 16 },
  chip: {
    minHeight: 46,
    minWidth: 94,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.line,
    alignItems: "center",
    justifyContent: "center",
  },
  chipActive: {
    backgroundColor: "rgba(255,106,43,0.14)",
    borderColor: "rgba(255,106,43,0.26)",
  },
  chipText: { color: Colors.muted, fontWeight: "800", textAlign: "center" },
  chipTextActive: { color: Colors.text },
  resultHeader: {
    marginTop: 6,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  resultTitle: { color: Colors.text, fontSize: 18, fontWeight: "900" },
  resultMeta: { color: Colors.muted },
  list: { paddingBottom: 8 },
});
