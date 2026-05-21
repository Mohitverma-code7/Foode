import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";

// Deep-link forwarder: foodapp://restaurant/:id
export default function DeepLinkRestaurant() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id: string }>();

  useEffect(() => {
    if (!params.id) return;
    router.replace({
      pathname: "/(app)/restaurant/[id]",
      params: { id: params.id },
    });
  }, [params.id, router]);

  return null;
}

