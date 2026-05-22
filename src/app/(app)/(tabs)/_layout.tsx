import { TabIcon } from "@/components/TabIcon";
import { useCartCount } from "@/hooks/useCartCount";
import { useTheme } from "@/state/themeStore";
import { Tabs } from "expo-router";
import React from "react";

const homeIcon = require("../../../../assets/images/tabIcons/home.png");
const exploreIcon = require("../../../../assets/images/tabIcons/explore.png");
const profileIcon = require("../../../../assets/images/tabIcons/home.png");

export default function TabsLayout() {
  const cartCount = useCartCount();
  const { colors } = useTheme();

  return (
      <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.line,
          borderTopWidth: 1,
          height: 72,
          paddingBottom: 12,
          paddingTop: 8,
          shadowColor: colors.shadow,
          shadowOpacity: 0.12,
          shadowRadius: 18,
          shadowOffset: { width: 0, height: -4 },
          elevation: 8,
        },
        tabBarActiveTintColor: colors.brand,
        tabBarInactiveTintColor: colors.muted,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "700",
        },
        tabBarItemStyle: {
          paddingTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={homeIcon} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={exploreIcon} />,
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: "Orders",
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={exploreIcon} />,
          tabBarBadge: cartCount > 0 ? String(cartCount) : undefined,
          tabBarBadgeStyle: {
            backgroundColor: colors.brand,
            color: colors.textOnBrand,
            borderRadius: 12,
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={profileIcon} />,
        }}
      />
    </Tabs>
  );
}
