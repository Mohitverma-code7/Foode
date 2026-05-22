import { getCachedAuthUser, signOutMock } from "@/state/authStore";
import { useDrawer } from "@/state/drawerStore";
import { useTheme } from "@/state/themeStore";
import { useRouter } from "expo-router";
import React, { useEffect, useMemo, useRef } from "react";
import { Animated, Easing, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type DrawerItem = {
  label: string;
  href?: string;
  danger?: boolean;
  onPress?: () => Promise<void> | void;
};

export function AppDrawer() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { open, closeDrawer } = useDrawer();
  const { colors } = useTheme();
  const translateX = useRef(new Animated.Value(-360)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const styles = useMemo(() => createStyles(colors), [colors]);

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: open ? 0 : -360,
      duration: open ? 280 : 220,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();

    Animated.timing(backdropOpacity, {
      toValue: open ? 1 : 0,
      duration: open ? 220 : 180,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [backdropOpacity, open, translateX]);

  const user = getCachedAuthUser();
  const items = useMemo<DrawerItem[]>(
    () => [
      { label: "My Orders", href: "/(app)/(drawer)/my-orders" },
      { label: "Settings", href: "/(app)/(drawer)/settings" },
      { label: "Help", href: "/(app)/(drawer)/help" },
      {
        label: "Logout",
        danger: true,
        onPress: async () => {
          await signOutMock();
          router.replace("/(auth)/login");
        },
      },
    ],
    [router],
  );

  async function handleItemPress(item: DrawerItem) {
    closeDrawer();
    if (item.onPress) {
      await item.onPress();
      return;
    }
    if (item.href) {
      router.push(item.href as never);
    }
  }

  return (
    <View pointerEvents={open ? "auto" : "none"} style={StyleSheet.absoluteFill}>
      <Animated.View style={[styles.backdrop, { opacity: backdropOpacity }]}>
        <Pressable style={StyleSheet.absoluteFillObject} onPress={closeDrawer} />
      </Animated.View>
      <Animated.View style={[styles.panel, { paddingTop: insets.top + 18, paddingBottom: insets.bottom + 18, transform: [{ translateX }] }]}>
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
            <Pressable
              key={item.label}
              onPress={() => {
                void handleItemPress(item);
              }}
              style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}
            >
              <View style={{ flex: 1 }}>
                <Text style={[styles.itemLabel, item.danger && styles.itemLabelDanger]}>{item.label}</Text>
              </View>
              <Text style={[styles.chevron, item.danger && styles.chevronDanger]}>{">"}</Text>
            </Pressable>
          ))}
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
});

function createStyles(colors: ReturnType<typeof useTheme>["colors"]) {
  return StyleSheet.create({
    backdrop: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: colors.overlay,
    },
    panel: {
      width: 322,
      maxWidth: "88%",
      height: "100%",
      backgroundColor: colors.surface,
      borderRightWidth: 1,
      borderRightColor: colors.line,
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
      backgroundColor: colors.brand,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: colors.brand,
      shadowOpacity: 0.2,
      shadowRadius: 14,
      shadowOffset: { width: 0, height: 8 },
      elevation: 3,
    },
    avatarText: {
      color: colors.textOnBrand,
      fontSize: 18,
      fontWeight: "900",
    },
    brand: {
      color: colors.text,
      fontSize: 22,
      fontWeight: "900",
    },
    meta: {
      color: colors.muted,
      marginTop: 4,
    },
    banner: {
      marginTop: 18,
      borderRadius: 22,
      padding: 16,
      backgroundColor: colors.surfaceSoft,
      borderWidth: 1,
      borderColor: colors.line,
    },
    bannerTitle: {
      color: colors.text,
      fontWeight: "900",
      fontSize: 16,
    },
    bannerBody: {
      marginTop: 8,
      color: colors.muted,
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
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.line,
      shadowColor: colors.shadow,
      shadowOpacity: 0.08,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 6 },
      elevation: 1,
    },
    itemPressed: {
      opacity: 0.86,
    },
    itemLabel: {
      color: colors.text,
      fontWeight: "900",
      fontSize: 15,
    },
    itemLabelDanger: {
      color: colors.danger,
    },
    chevron: {
      color: colors.brand,
      fontSize: 24,
      fontWeight: "400",
      marginLeft: 12,
    },
    chevronDanger: {
      color: colors.danger,
    },
  });
}
