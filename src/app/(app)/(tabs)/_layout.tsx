import { TabIcon } from "@/components/TabIcon";
import { useCartCount } from "@/hooks/useCartCount";
import { Colors } from "@/theme/colors";
import { Tabs } from "expo-router";
import React from "react";

// Use bundled icon assets via require to avoid TS module resolution issues.
const homeIcon = require("../../../../assets/images/tabIcons/home.png");
const exploreIcon = require("../../../../assets/images/tabIcons/explore.png");
const profileIcon = require("../../../../assets/images/tabIcons/home.png");

export default function TabsLayout() {
  const cartCount = useCartCount();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#0D1831",
          borderTopColor: "rgba(255,255,255,0.08)",
        },
        tabBarActiveTintColor: Colors.text,
        tabBarInactiveTintColor: "rgba(255,255,255,0.55)",
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
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={exploreIcon} />
          ),
          tabBarBadge: cartCount > 0 ? String(cartCount) : undefined,
          tabBarBadgeStyle: {
            backgroundColor: Colors.brand,
            color: Colors.text,
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

