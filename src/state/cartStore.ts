import { getItem, removeItem, setItem } from "@/lib/storage";

export type CartItem = {
  id: string;
  restaurantId: string;
  restaurantName: string;
  unitPrice: number;
  quantity: number;
};

const CART_KEY = "foodapp:cart";

let memoryItems: CartItem[] = [];

export function getCartItems(): CartItem[] {
  return memoryItems;
}

export function getCartCount(): number {
  return memoryItems.reduce((sum, it) => sum + it.quantity, 0);
}

export async function loadCartItems(): Promise<CartItem[]> {
  const raw = await getItem(CART_KEY);
  if (!raw) {
    memoryItems = [];
    return memoryItems;
  }
  try {
    memoryItems = JSON.parse(raw) as CartItem[];
    return memoryItems;
  } catch {
    memoryItems = [];
    return memoryItems;
  }
}

export async function addToCart(params: {
  restaurantId: string;
  restaurantName: string;
  unitPrice: number;
}): Promise<void> {
  const { restaurantId, restaurantName, unitPrice } = params;

  const existing = memoryItems.find((x) => x.restaurantId === restaurantId);
  if (existing) {
    existing.quantity += 1;
  } else {
    memoryItems.push({
      id: `c_${restaurantId}`,
      restaurantId,
      restaurantName,
      unitPrice,
      quantity: 1,
    });
  }

  await setItem(CART_KEY, JSON.stringify(memoryItems));
}

export async function clearCart(): Promise<void> {
  memoryItems = [];
  await removeItem(CART_KEY);
}
