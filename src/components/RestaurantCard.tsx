import { useTheme } from "@/state/themeStore";
import React, { useMemo } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export function RestaurantCard(props: {
  name: string;
  price: number;
  cuisine: string;
  image?: string;
  rating?: number;
  eta?: string;
  deliveryFee?: number;
  tags?: string[];
  description?: string;
  featured?: boolean;
  onPress: () => void;
}) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <Pressable onPress={props.onPress} style={({ pressed }) => [styles.card, { opacity: pressed ? 0.88 : 1 }]}>
      <View style={styles.imageWrap}>
        <Image
          source={{ uri: props.image ?? "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=60&w=3000" }}
          style={styles.image}
        />
        <View style={styles.imageOverlay} />
        <View style={styles.badgeRow}>
          <Text style={styles.cuisineBadge}>{props.cuisine}</Text>
          {props.featured ? <Text style={styles.featured}>Featured</Text> : null}
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.row}>
          <Text style={styles.title}>{props.name}</Text>
          <Text style={styles.rating}>{props.rating?.toFixed(1) ?? "4.8"} ★</Text>
        </View>
        {props.description ? <Text style={styles.description}>{props.description}</Text> : null}
        <View style={styles.metaRow}>
          <Text style={styles.price}>${props.price.toFixed(2)}</Text>
          <Text style={styles.sub}>{props.eta ?? "18-25 min"}</Text>
          <Text style={styles.sub}>Fee ${props.deliveryFee?.toFixed(2) ?? "1.99"}</Text>
        </View>
        <View style={styles.tags}>
          {props.tags?.slice(0, 3).map((tag) => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>
    </Pressable>
  );
}

function createStyles(colors: ReturnType<typeof useTheme>["colors"]) {
  return StyleSheet.create({
    card: {
      backgroundColor: colors.card,
      borderRadius: 28,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: colors.line,
      overflow: "hidden",
      shadowColor: colors.shadow,
      shadowOpacity: 0.08,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 8 },
      elevation: 2,
    },
    imageWrap: {
      height: 170,
      backgroundColor: colors.cardStrong,
      overflow: "hidden",
    },
    image: {
      width: "100%",
      height: "100%",
    },
    imageOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: colors.overlay,
    },
    badgeRow: {
      position: "absolute",
      left: 14,
      right: 14,
      top: 14,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    cuisineBadge: {
      color: colors.textOnBrand,
      fontSize: 11,
      fontWeight: "900",
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 999,
      backgroundColor: "rgba(31,24,19,0.34)",
    },
    featured: {
      color: colors.textOnBrand,
      fontSize: 11,
      fontWeight: "900",
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 999,
      backgroundColor: colors.brand,
      overflow: "hidden",
    },
    body: {
      padding: 16,
    },
    row: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", gap: 12 },
    title: { color: colors.text, fontWeight: "900", fontSize: 18, flex: 1 },
    metaRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      marginTop: 10,
      flexWrap: "wrap",
    },
    description: { color: colors.muted, marginTop: 8, lineHeight: 18 },
    tags: { flexDirection: "row", gap: 6, marginTop: 12, flexWrap: "wrap" },
    tag: {
      borderRadius: 999,
      backgroundColor: colors.cardStrong,
      borderWidth: 1,
      borderColor: colors.line,
      paddingHorizontal: 8,
      paddingVertical: 4,
    },
    tagText: { color: colors.text, fontSize: 11, fontWeight: "700" },
    rating: { color: colors.brand, fontWeight: "900", fontSize: 12, marginTop: 4 },
    price: { color: colors.text, fontWeight: "900", fontSize: 18 },
    sub: { color: colors.muted, marginTop: 4, fontSize: 12, fontWeight: "600" },
  });
}
