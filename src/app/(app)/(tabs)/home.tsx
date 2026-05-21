import { RestaurantCard } from "@/components/RestaurantCard";
import { Screen } from "@/components/Screen";
import { restaurants } from "@/data/restaurants";
import { Colors } from "@/theme/colors";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function HomeTab() {
  const router = useRouter();

  return (
    <Screen>
      <View style={styles.wrap}>
        <Text style={styles.title}>Good food, right now</Text>
        <Text style={styles.subtitle}>Choose a restaurant to see details and add to cart.</Text>

        <FlatList
          data={restaurants}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingTop: 14, paddingBottom: 16 }}
          renderItem={({ item }) => (
            <RestaurantCard
              name={item.name}
              price={item.price}
              cuisine={item.cuisine}
              onPress={() =>
                router.push({
                  pathname: "/(app)/restaurant/[id]",
                  params: { id: item.id, name: item.name, price: String(item.price) },
                })
              }
            />
          )}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingHorizontal: 18, paddingTop: 22, flex: 1 },
  title: { color: Colors.text, fontSize: 24, fontWeight: "900" },
  subtitle: { color: Colors.muted, marginTop: 8, lineHeight: 18 },
});

