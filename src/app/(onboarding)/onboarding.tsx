import { PrimaryButton } from "@/components/PrimaryButton";
import { Screen } from "@/components/Screen";
import { useTheme } from "@/state/themeStore";
import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function OnboardingScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <Screen showChrome={false}>
      <View style={styles.wrap}>
        <View style={styles.hero}>
          <Text style={styles.heroTag}>WELCOME TO FOOD APP</Text>
          <Text style={styles.heroTitle}>From craving to checkout in seconds.</Text>
          <Text style={styles.heroBody}>Discover restaurants, save favorites, and follow every order with a bright, easy flow.</Text>
        </View>

        <View style={styles.cards}>
          <View style={styles.stepCard}>
            <Text style={styles.stepNumber}>01</Text>
            <Text style={styles.stepTitle}>Browse vibrant menus</Text>
            <Text style={styles.stepBody}>Featured dishes, fast filters, and bold visuals.</Text>
          </View>
          <View style={styles.stepCard}>
            <Text style={styles.stepNumber}>02</Text>
            <Text style={styles.stepTitle}>Order in a tap</Text>
            <Text style={styles.stepBody}>Add to cart, track status, and check out smoothly.</Text>
          </View>
        </View>

        <View style={styles.actions}>
          <PrimaryButton title="Get Started" onPress={() => router.replace("/(auth)/login")} />
          <PrimaryButton title="Sign In" onPress={() => router.replace("/(auth)/login")} variant="secondary" style={{ marginTop: 12 }} />
        </View>

        <Text style={styles.note}>You can access the drawer from the main app screens.</Text>
      </View>
    </Screen>
  );
}

function createStyles(colors: ReturnType<typeof useTheme>["colors"]) {
  return StyleSheet.create({
    wrap: {
      flex: 1,
      paddingHorizontal: 18,
      paddingTop: 14,
      paddingBottom: 18,
    },
    hero: {
      minHeight: 210,
      borderRadius: 32,
      padding: 20,
      justifyContent: "flex-end",
      backgroundColor: colors.brand2,
      shadowColor: colors.shadow,
      shadowOpacity: 0.16,
      shadowRadius: 18,
      shadowOffset: { width: 0, height: 12 },
      elevation: 4,
    },
    heroTag: {
      color: colors.textOnBrand,
      fontWeight: "900",
      letterSpacing: 1.4,
      fontSize: 12,
      marginBottom: 12,
    },
    heroTitle: {
      color: colors.textOnBrand,
      fontSize: 31,
      lineHeight: 35,
      fontWeight: "900",
      maxWidth: 320,
    },
    heroBody: {
      marginTop: 10,
      color: "#FFF4EA",
      lineHeight: 21,
      maxWidth: 340,
    },
    cards: {
      marginTop: 16,
      gap: 12,
    },
    stepCard: {
      padding: 18,
      borderRadius: 24,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.line,
    },
    stepNumber: {
      color: colors.brand,
      fontWeight: "900",
      letterSpacing: 1.5,
      fontSize: 12,
    },
    stepTitle: {
      marginTop: 10,
      color: colors.text,
      fontSize: 17,
      fontWeight: "900",
    },
    stepBody: {
      marginTop: 6,
      color: colors.muted,
      lineHeight: 19,
    },
    actions: {
      marginTop: 16,
    },
    note: {
      marginTop: 18,
      color: colors.muted,
      textAlign: "center",
    },
  });
}
