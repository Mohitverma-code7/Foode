import { getCartCount, loadCartItems } from "@/state/cartStore";
import { useEffect, useState } from "react";

export function useCartCount() {
  const [count, setCount] = useState(getCartCount());

  useEffect(() => {
    let mounted = true;
    loadCartItems().then(() => {
      if (mounted) setCount(getCartCount());
    });
    return () => {
      mounted = false;
    };
  }, []);

  return count;
}
