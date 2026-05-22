import { useTheme } from "@/state/themeStore";
import React, { useMemo } from "react";
import { Pressable, StyleSheet, Text, ViewStyle } from "react-native";

export function PrimaryButton(props: {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
  style?: ViewStyle;
  disabled?: boolean;
}) {
  const variant = props.variant ?? "primary";
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const bg = variant === "primary" ? colors.brand : colors.surface;
  const borderColor = variant === "primary" ? colors.brand : colors.line;
  const textColor = variant === "primary" ? colors.textOnBrand : colors.text;

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

function createStyles(colors: ReturnType<typeof useTheme>["colors"]) {
  return StyleSheet.create({
    base: {
      height: 52,
      borderRadius: 18,
      borderWidth: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 16,
      shadowColor: colors.shadow,
      shadowOpacity: 0.18,
      shadowRadius: 16,
      shadowOffset: { width: 0, height: 10 },
      elevation: 4,
    },
    text: {
      fontSize: 16,
      fontWeight: "800",
      letterSpacing: 0.2,
    },
  });
}
