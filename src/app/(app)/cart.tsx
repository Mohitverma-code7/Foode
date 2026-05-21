import { PrimaryButton } from "@/components/PrimaryButton";
import { Screen } from "@/components/Screen";
import { useCartCount } from "@/hooks/useCartCount";
import { clearCart, getCartItems, loadCartItems } from "@/state/cartStore";
import { Colors } from "@/theme/colors";
import { useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function CartScreen() {
  const router = useRouter();
  const cartCount = useCartCount();
  const [items, setItems] = useState(getCartItems());

  useEffect(() => {
    loadCartItems().then(() => setItems(getCartItems()));
  }, []);

  const total = useMemo(() => items.reduce((sum, it) => sum + it.unitPrice * it.quantity, 0), [items]);

  async function onCheckout() {
    await clearCart();
    setItems([]);
    router.replace("/(app)/(tabs)/orders");
  }

  return (
    <Screen>
      <View style={styles.wrap}>
        <Text style={styles.title}>Your Cart</Text>
        <Text style={styles.subtitle}>Review your items, then place the order in one tap.</Text>
        {items.length === 0 ? (
          <Text style={styles.empty}>Cart is empty. Add something delicious!</Text>
        ) : (
          <View style={styles.panel}>
            {items.map((it) => (
              <View key={it.id} style={styles.row}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.name}>{it.restaurantName}</Text>
                  <Text style={styles.meta}>Qty: {it.quantity}</Text>
                </View>
                <Text style={styles.price}>${(it.unitPrice * it.quantity).toFixed(2)}</Text>
              </View>
            ))}

            <View style={styles.fees}>
              <View style={styles.feeRow}>
                <Text style={styles.feeLabel}>Subtotal</Text>
                <Text style={styles.feeValue}>${total.toFixed(2)}</Text>
              </View>
              <View style={styles.feeRow}>
                <Text style={styles.feeLabel}>Delivery</Text>
                <Text style={styles.feeValue}>$2.49</Text>
              </View>
              <View style={styles.feeRow}>
                <Text style={styles.feeLabel}>Service</Text>
                <Text style={styles.feeValue}>$1.25</Text>
              </View>
            </View>

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${(total + 3.74).toFixed(2)}</Text>
            </View>
          </View>
        )}

        <PrimaryButton
          title={items.length === 0 ? "Add from Home" : `Checkout (${cartCount} items)`}
          onPress={() => (items.length === 0 ? router.replace("/(app)/(tabs)/home") : onCheckout())}
          disabled={false}
          style={{ marginTop: 18 }}
        />

        <PrimaryButton
          title="Back to Home"
          onPress={() => router.replace("/(app)/(tabs)/home")}
          variant="secondary"
          style={{ marginTop: 12 }}
        />

        <Text style={styles.tip}>Mock cart state persists across reloads.</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingHorizontal: 18, paddingTop: 8 },
  title: { color: Colors.text, fontSize: 26, fontWeight: "900" },
  subtitle: { color: Colors.muted, marginTop: 6, lineHeight: 18 },
  empty: { color: Colors.muted, marginTop: 12, lineHeight: 20 },
  panel: {
    marginTop: 16,
    backgroundColor: Colors.card,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: Colors.line,
  },
  row: { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: Colors.line },
  name: { color: Colors.text, fontWeight: "900" },
  meta: { color: Colors.muted, marginTop: 4 },
  price: { color: Colors.text, fontWeight: "900" },
  fees: { marginTop: 6, gap: 10 },
  feeRow: { flexDirection: "row", justifyContent: "space-between" },
  feeLabel: { color: Colors.muted },
  feeValue: { color: Colors.text, fontWeight: "800" },
  totalRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 12, paddingTop: 10, borderTopWidth: 1, borderTopColor: Colors.line },
  totalLabel: { color: Colors.muted, fontWeight: "800" },
  totalValue: { color: Colors.brand, fontWeight: "900", fontSize: 16 },
  tip: { marginTop: 14, color: Colors.muted, fontSize: 12 },
});
