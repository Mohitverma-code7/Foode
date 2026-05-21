import { Colors } from "@/theme/colors";
import { useCartCount } from "@/hooks/useCartCount";
import { useDrawer } from "@/state/drawerStore";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

export function Screen(props: { children: React.ReactNode; style?: ViewStyle; showChrome?: boolean }) {
  const cartCount = useCartCount();
  const drawer = useDrawer();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const showChrome = props.showChrome ?? true;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={[styles.container, { paddingTop: insets.top > 0 ? 0 : 12 }, props.style]}>
        <View style={styles.blobOne} />
        <View style={styles.blobTwo} />
        {showChrome ? (
          <View style={styles.topBar}>
            <Pressable onPress={drawer.openDrawer} style={styles.iconButton} accessibilityLabel="Open menu">
              <Text style={styles.iconText}>≡</Text>
            </Pressable>

            <View style={styles.brandWrap}>
              <Text style={styles.brand}>Food App</Text>
              <Text style={styles.brandSub}>Fresh, fast, local</Text>
            </View>

            <Pressable onPress={() => router.push("/(app)/cart")} style={styles.cartButton} accessibilityLabel="Open cart">
              <Text style={styles.cartText}>Cart</Text>
              {cartCount > 0 ? (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{cartCount}</Text>
                </View>
              ) : null}
            </Pressable>
          </View>
        ) : null}

        <View style={styles.content}>{props.children}</View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
    overflow: "hidden",
  },
  blobOne: {
    position: "absolute",
    top: -80,
    right: -80,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: "rgba(255, 122, 51, 0.16)",
  },
  blobTwo: {
    position: "absolute",
    top: 110,
    left: -90,
    width: 190,
    height: 190,
    borderRadius: 95,
    backgroundColor: "rgba(255, 193, 138, 0.22)",
  },
  topBar: {
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.line,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#C76A36",
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  iconText: {
    color: Colors.text,
    fontSize: 20,
    fontWeight: "900",
  },
  brandWrap: {
    flex: 1,
    paddingHorizontal: 12,
  },
  brand: {
    color: Colors.text,
    fontSize: 17,
    fontWeight: "900",
  },
  brandSub: {
    color: Colors.muted,
    fontSize: 12,
    marginTop: 1,
  },
  cartButton: {
    minWidth: 86,
    height: 44,
    paddingHorizontal: 14,
    borderRadius: 16,
    backgroundColor: Colors.brand,
    borderWidth: 1,
    borderColor: Colors.brand,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    shadowColor: Colors.brand,
    shadowOpacity: 0.25,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  cartText: {
    color: "#FFF7F1",
    fontWeight: "800",
  },
  badge: {
    minWidth: 20,
    height: 20,
    borderRadius: 999,
    backgroundColor: "#FFF7F1",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  badgeText: {
    color: Colors.brand,
    fontSize: 11,
    fontWeight: "900",
  },
  content: {
    flex: 1,
  },
});
