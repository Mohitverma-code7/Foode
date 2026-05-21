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

  return (
    <Screen>
      <View style={styles.wrap}>
        <Text style={styles.title}>Search</Text>
        <Text style={styles.meta}>Search by restaurant, cuisine, or what you are craving.</Text>

        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Try sushi, spicy, vegan..."
          placeholderTextColor="#8A7164"
          style={styles.input}
        />

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

        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          {results.map((item) => (
            <RestaurantCard
              key={item.id}
              name={item.name}
              price={item.price}
              cuisine={item.cuisine}
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
        </ScrollView>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingHorizontal: 18, paddingTop: 8, flex: 1 },
  title: { color: Colors.text, fontSize: 26, fontWeight: "900" },
  meta: { color: Colors.muted, marginTop: 8, lineHeight: 18 },
  input: {
    marginTop: 16,
    height: 50,
    borderRadius: 16,
    paddingHorizontal: 14,
    color: Colors.text,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.line,
  },
  chips: { gap: 10, paddingVertical: 14 },
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
  resultHeader: {
    marginTop: 4,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  resultTitle: { color: Colors.text, fontSize: 18, fontWeight: "900" },
  resultMeta: { color: Colors.muted },
});
