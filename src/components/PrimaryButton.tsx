import { Colors } from "@/theme/colors";
import React from "react";
import { Pressable, StyleSheet, Text, ViewStyle } from "react-native";

export function PrimaryButton(props: {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
  style?: ViewStyle;
  disabled?: boolean;
}) {
  const variant = props.variant ?? "primary";

  const bg = variant === "primary" ? Colors.brand : "transparent";
  const borderColor = variant === "primary" ? Colors.brand : "rgba(255,255,255,0.28)";
  const textColor = variant === "primary" ? "white" : Colors.text;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={props.disabled}
      onPress={props.onPress}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: bg,
          borderColor,
          opacity: props.disabled ? 0.6 : pressed ? 0.85 : 1,
        },
        props.style,
      ]}
    >
      <Text style={[styles.text, { color: textColor }]}>{props.title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 48,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  text: {
    fontSize: 16,
    fontWeight: "700",
  },
});

