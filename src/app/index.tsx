import { loadAuthUser } from "@/state/authStore";
import { Colors } from "@/theme/colors";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const user = await loadAuthUser();
      if (!mounted) return;
      setReady(true);
      if (user) {
        router.replace("/(app)/(tabs)/home");
      } else {
        router.replace("/(auth)/login");
      }
    })();
    return () => {
      mounted = false;
    };
  }, [router]);

  if (!ready) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: Colors.bg }}>
        <ActivityIndicator color={Colors.brand} />
      </View>
    );
  }

  return null;
}

