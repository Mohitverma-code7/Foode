import { getCachedAuthUser, signOutMock } from "@/state/authStore";
import { useDrawer } from "@/state/drawerStore";
import { Colors } from "@/theme/colors";
import { useRouter } from "expo-router";
import React, { useEffect, useMemo, useRef } from "react";
import { Animated, Easing, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type DrawerItem = {
  label: string;
  href: string;
  hint?: string;
};

export function AppDrawer() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { open, closeDrawer } = useDrawer();
  const translateX = useRef(new Animated.Value(-360)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: open ? 0 : -360,
      duration: open ? 280 : 220,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [open, translateX]);

  const user = getCachedAuthUser();
  const items = useMemo<DrawerItem[]>(
    () => [
      { label: "Home", href: "/(app)/(tabs)/home", hint: "Discover spots" },
      { label: "Search", href: "/(app)/(tabs)/search", hint: "Find a craving" },
      { label: "Orders", href: "/(app)/(tabs)/orders", hint: "Live tracking" },
      { label: "Cart", href: "/(app)/cart", hint: "Ready to checkout" },
      { label: "My Orders", href: "/(app)/(drawer)/my-orders", hint: "Reorder favorites" },
      { label: "Settings", href: "/(app)/(drawer)/settings", hint: "Control your app" },
      { label: "Help", href: "/(app)/(drawer)/help", hint: "Contact support" },
    ],
    [],
  );

  async function onSignOut() {
    await signOutMock();
    closeDrawer();
    router.replace("/(auth)/login");
  }

  function goTo(href: string) {
    closeDrawer();
    router.push(href as never);
  }

  return (
    <View pointerEvents={open ? "auto" : "none"} style={StyleSheet.absoluteFill}>
      <Pressable style={styles.backdrop} onPress={closeDrawer} />
      <Animated.View
        style={[
          styles.panel,
          {
            paddingTop: insets.top + 18,
            paddingBottom: insets.bottom + 18,
            transform: [{ translateX }],
          },
        ]}
      >
        <View style={styles.hero}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{(user?.name ?? "Food").slice(0, 1)}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.brand}>Food App</Text>
            <Text style={styles.meta}>{user?.email ?? "Your food journey"}</Text>
          </View>
        </View>

        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>Fresh deals today</Text>
          <Text style={styles.bannerBody}>Explore quick meals, premium picks, and your saved favorites.</Text>
        </View>

        <View style={styles.list}>
          {items.map((item) => (
            <Pressable key={item.href} onPress={() => goTo(item.href)} style={styles.item}>
              <View style={{ flex: 1 }}>
                <Text style={styles.itemLabel}>{item.label}</Text>
                {item.hint ? <Text style={styles.itemHint}>{item.hint}</Text> : null}
              </View>
              <Text style={styles.chevron}>›</Text>
            </Pressable>
          ))}
        </View>

        <Pressable onPress={onSignOut} style={styles.signOut}>
          <Text style={styles.signOutText}>Sign out</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(63, 37, 18, 0.22)",
  },
  panel: {
    width: 322,
    maxWidth: "88%",
    height: "100%",
    backgroundColor: "#FFF9F4",
    borderRightWidth: 1,
    borderRightColor: Colors.line,
    paddingHorizontal: 18,
  },
  hero: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 18,
    backgroundColor: Colors.brand,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.brand,
    shadowOpacity: 0.2,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  avatarText: {
    color: "#FFF7F1",
    fontSize: 18,
    fontWeight: "900",
  },
  brand: {
    color: Colors.text,
    fontSize: 22,
    fontWeight: "900",
  },
  meta: {
    color: Colors.muted,
    marginTop: 4,
  },
  banner: {
    marginTop: 18,
    borderRadius: 22,
    padding: 16,
    backgroundColor: Colors.cardStrong,
    borderWidth: 1,
    borderColor: Colors.line,
  },
  bannerTitle: {
    color: Colors.text,
    fontWeight: "900",
    fontSize: 16,
  },
  bannerBody: {
    marginTop: 8,
    color: Colors.muted,
    lineHeight: 19,
  },
  list: {
    marginTop: 18,
    gap: 10,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 18,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.line,
    shadowColor: "#C76A36",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 1,
  },
  itemLabel: {
    color: Colors.text,
    fontWeight: "900",
    fontSize: 15,
  },
  itemHint: {
    marginTop: 4,
    color: Colors.muted,
    fontSize: 12,
  },
  chevron: {
    color: Colors.brand,
    fontSize: 30,
    fontWeight: "400",
    marginLeft: 12,
  },
  signOut: {
    marginTop: 18,
    alignItems: "center",
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: "rgba(255,106,43,0.12)",
    borderWidth: 1,
    borderColor: "rgba(255,106,43,0.2)",
  },
  signOutText: {
    color: Colors.brand,
    fontWeight: "900",
  },
});
