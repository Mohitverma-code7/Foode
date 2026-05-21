import { Screen } from "@/components/Screen";
import { restaurants } from "@/data/restaurants";
import { useCartCount } from "@/hooks/useCartCount";
import { Colors } from "@/theme/colors";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function OrdersTab() {
  const cartCount = useCartCount();
  const [note, setNote] = useState("");

  const recentOrders = restaurants.slice(0, 3).map((restaurant, index) => ({
    id: `${restaurant.id}-${index}`,
    restaurant: restaurant.name,
    status: index === 0 ? "Preparing" : index === 1 ? "On the way" : "Delivered",
    eta: index === 0 ? "12 min" : index === 1 ? "6 min" : "Completed",
  }));

  useEffect(() => {
    setNote(cartCount > 0 ? "You have active items in cart." : "No cart items right now.");
  }, [cartCount]);

  return (
    <Screen>
      <View style={styles.wrap}>
        <Text style={styles.title}>Orders</Text>
        <Text style={styles.meta}>{note}</Text>

        <View style={styles.panel}>
          <Text style={styles.panelTitle}>Recent</Text>
          {recentOrders.map((order) => (
            <View key={order.id} style={styles.orderRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.orderName}>{order.restaurant}</Text>
                <Text style={styles.orderMeta}>{order.status}</Text>
              </View>
              <Text style={styles.orderEta}>{order.eta}</Text>
            </View>
          ))}
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingHorizontal: 18, paddingTop: 8 },
  title: { color: Colors.text, fontSize: 26, fontWeight: "900" },
  meta: { color: Colors.muted, marginTop: 8, lineHeight: 18 },
  panel: {
    marginTop: 16,
    backgroundColor: Colors.card,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: Colors.line,
  },
  panelTitle: { color: Colors.text, fontWeight: "900", fontSize: 16 },
  orderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.line,
  },
  orderName: { color: Colors.text, fontWeight: "800" },
  orderMeta: { color: Colors.muted, marginTop: 4, fontSize: 12 },
  orderEta: { color: Colors.brand, fontWeight: "900" },
});
