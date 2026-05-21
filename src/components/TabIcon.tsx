import React from "react";
import { Image, StyleSheet } from "react-native";

// Use provided local tab icons (optional). Fallback to a simple tint approach.
export function TabIcon(props: { focused: boolean; icon: any; size?: number }) {
  const size = props.size ?? 22;
  return <Image source={props.icon} style={[styles.icon, { width: size, height: size, opacity: props.focused ? 1 : 0.75 }]} />;
}

const styles = StyleSheet.create({
  icon: {
    resizeMode: "contain",
  },
});

