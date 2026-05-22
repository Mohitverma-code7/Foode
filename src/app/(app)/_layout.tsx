import { loadAuthUser } from "@/state/authStore";
import { AppDrawer } from "@/components/AppDrawer";
import { DrawerProvider } from "@/state/drawerStore";
import { useTheme } from "@/state/themeStore";
import { Stack, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function AppRootLayout() {
  const router = useRouter();
  const { colors } = useTheme();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const user = await loadAuthUser();
      if (!mounted) return;
      if (!user) {
        router.replace("/(auth)/login");
        return;
      }
      setReady(true);
    })();
    return () => {
      mounted = false;
    };
  }, [router]);

  if (!ready) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors.bg }}>
        <ActivityIndicator color={colors.brand} />
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


