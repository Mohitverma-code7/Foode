import { useTheme } from "@/state/themeStore";
import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

export function AppHeader(props: { title: string; backLabel?: string }) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.wrap}>
      <Text style={styles.title} numberOfLines={1}>
        {props.title}
      </Text>
      {props.backLabel ? <Text style={styles.back}>{props.backLabel}</Text> : null}
    </View>
  );
}

function createStyles(colors: ReturnType<typeof useTheme>["colors"]) {
  return StyleSheet.create({
    wrap: {
      alignItems: "center",
      gap: 4,
      paddingVertical: 6,
    },
    title: {
      color: colors.text,
      fontWeight: "900",
      fontSize: 17,
    },
    back: {
      color: colors.muted,
      fontSize: 12,
    },
  });
}
