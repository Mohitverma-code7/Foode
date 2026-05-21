import { Screen } from "@/components/Screen";
import { useCartCount } from "@/hooks/useCartCount";
import { loadCartItems } from "@/state/cartStore";
import { Colors } from "@/theme/colors";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function OrdersTab() {
  const cartCount = useCartCount();
  const [note, setNote] = useState("" );

  useEffect(() => {
    loadCartItems().then(() => {
      setNote(cartCount > 0 ? "You have items in cart — see badge." : "No cart items right now." );
    });
  }, [cartCount]);

  return (
    <Screen>
      <View style={styles.wrap}>
        <Text style={styles.title}>Orders</Text>
        <Text style={styles.meta}>{note}</Text>

        <View style={styles.panel}>
          <Text style={styles.panelTitle}>Recent</Text>
          <Text style={styles.panelBody}>Mock orders list. Checkout clears cart in Cart screen.</Text>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingHorizontal: 18, paddingTop: 22 },
  title: { color: Colors.text, fontSize: 24, fontWeight: "900" },
  meta: { color: Colors.muted, marginTop: 8, lineHeight: 18 },
  panel: {
    marginTop: 16,
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.07)",
  },
  panelTitle: { color: Colors.text, fontWeight: "900" },
  panelBody: { marginTop: 8, color: Colors.muted, lineHeight: 20 },
});

