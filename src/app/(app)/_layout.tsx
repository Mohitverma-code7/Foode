import { loadAuthUser } from "@/state/authStore";
import { AppDrawer } from "@/components/AppDrawer";
import { DrawerProvider } from "@/state/drawerStore";
import { Colors } from "@/theme/colors";
import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function AppRootLayout() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    loadAuthUser().finally(() => {
      if (mounted) setReady(true);
    });
    return () => {
      mounted = false;
    };
  }, []);

  if (!ready) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: Colors.bg,
        }}
      >
        <ActivityIndicator color={Colors.brand} />
      </View>
    );
  }

  return (
    <DrawerProvider>
      <View style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }} />
        <AppDrawer />
      </View>
    </DrawerProvider>
  );
}


