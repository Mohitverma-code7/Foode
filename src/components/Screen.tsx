import { useCartCount } from "@/hooks/useCartCount";
import { useDrawer } from "@/state/drawerStore";
import { useTheme } from "@/state/themeStore";
import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import { Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

export function Screen(props: { children: React.ReactNode; style?: ViewStyle; showChrome?: boolean }) {
  const cartCount = useCartCount();
  const drawer = useDrawer();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors, mode, toggleMode } = useTheme();
  const showChrome = props.showChrome ?? true;
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={[styles.container, { paddingTop: insets.top > 0 ? 0 : 12 }, props.style]}>
        <View style={styles.blobOne} />
        <View style={styles.blobTwo} />
        {showChrome ? (
          <View style={styles.topBar}>
            <Pressable onPress={drawer.openDrawer} style={styles.iconButton} accessibilityLabel="Open menu">
              <MaterialCommunityIcons name="menu" size={22} color={colors.text} />
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

            <Pressable
              onPress={() => {
                void toggleMode();
              }}
              style={styles.themeButton}
              accessibilityLabel={mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              <MaterialCommunityIcons name={mode === "dark" ? "weather-sunny" : "weather-night"} size={20} color={colors.text} />
            </Pressable>
          </View>
        ) : null}

        <View style={styles.content}>{props.children}</View>
      </View>
    </SafeAreaView>
  );
}

function createStyles(colors: ReturnType<typeof useTheme>["colors"]) {
  return StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor: colors.bg,
    },
    container: {
      flex: 1,
      backgroundColor: colors.bg,
      overflow: "hidden",
    },
    blobOne: {
      position: "absolute",
      top: -80,
      right: -80,
      width: 220,
      height: 220,
      borderRadius: 110,
      backgroundColor: colors.brand3 + "26",
    },
    blobTwo: {
      position: "absolute",
      top: 110,
      left: -90,
      width: 190,
      height: 190,
      borderRadius: 95,
      backgroundColor: colors.brand3 + "33",
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
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.line,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: colors.shadow,
      shadowOpacity: 0.12,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 6 },
      elevation: 2,
    },
    brandWrap: {
      flex: 1,
      paddingHorizontal: 12,
    },
    brand: {
      color: colors.text,
      fontSize: 17,
      fontWeight: "900",
    },
    brandSub: {
      color: colors.muted,
      fontSize: 12,
      marginTop: 1,
    },
    cartButton: {
      minWidth: 86,
      height: 44,
      paddingHorizontal: 14,
      borderRadius: 16,
      backgroundColor: colors.brand,
      borderWidth: 1,
      borderColor: colors.brand,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      shadowColor: colors.brand,
      shadowOpacity: 0.25,
      shadowRadius: 14,
      shadowOffset: { width: 0, height: 8 },
      elevation: 4,
    },
    cartText: {
      color: colors.textOnBrand,
      fontWeight: "800",
    },
    badge: {
      minWidth: 20,
      height: 20,
      borderRadius: 999,
      backgroundColor: colors.textOnBrand,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 4,
    },
    badgeText: {
      color: colors.brand,
      fontSize: 11,
      fontWeight: "900",
    },
    themeButton: {
      marginLeft: 10,
      width: 44,
      height: 44,
      borderRadius: 16,
      backgroundColor: colors.surfaceElevated,
      borderWidth: 1,
      borderColor: colors.line,
      alignItems: "center",
      justifyContent: "center",
    },
    content: {
      flex: 1,
    },
  });
}
