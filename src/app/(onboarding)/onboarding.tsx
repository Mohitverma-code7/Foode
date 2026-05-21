import { PrimaryButton } from "@/components/PrimaryButton";
import { Screen } from "@/components/Screen";
import { Colors } from "@/theme/colors";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <Screen>
      <View style={styles.wrap}>
        <Text style={styles.headline}>Fast food. Fresh vibes.</Text>
        <Text style={styles.body}>
          Discover restaurants, add items to cart, and track orders — all in a smooth experience.
        </Text>

        <View style={styles.steps}>
          <View style={styles.step}>
            <Text style={styles.stepNum}>1</Text>
            <Text style={styles.stepText}>Pick a restaurant</Text>
          </View>
          <View style={styles.step}>
            <Text style={styles.stepNum}>2</Text>
            <Text style={styles.stepText}>Customize your order</Text>
          </View>
          <View style={styles.step}>
            <Text style={styles.stepNum}>3</Text>
            <Text style={styles.stepText}>Checkout and relax</Text>
          </View>
        </View>

        <View style={{ marginTop: 22 }}>
          <PrimaryButton title="Get Started" onPress={() => router.replace("/(app)/(tabs)/home")} />
        </View>

        <Text style={styles.note}>You can access the drawer from Profile.</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: 18,
    paddingTop: 30,
  },
  headline: {
    color: Colors.text,
    fontSize: 28,
    fontWeight: "900",
    lineHeight: 34,
  },
  body: {
    marginTop: 10,
    color: Colors.muted,
    lineHeight: 20,
  },
  steps: {
    marginTop: 28,
    gap: 12,
  },
  step: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.07)",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  stepNum: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: "rgba(32,138,239,0.18)",
    color: Colors.brand,
    fontWeight: "900",
    textAlign: "center",
    paddingTop: 7,
  },
  stepText: {
    color: Colors.text,
    fontWeight: "800",
  },
  note: {
    marginTop: 20,
    color: "rgba(255,255,255,0.6)",
    fontSize: 12,
  },
});

