export type Restaurant = {
  id: string;
  name: string;
  price: number;
  cuisine: string;
};

export const restaurants: Restaurant[] = [
  { id: "1", name: "Fire & Lime Tacos", price: 12.5, cuisine: "Mexican" },
  { id: "2", name: "Sushi Orbit", price: 19.99, cuisine: "Japanese" },
  { id: "3", name: "Green Bowl", price: 10.75, cuisine: "Healthy" },
  { id: "4", name: "Pasta Avenue", price: 15.25, cuisine: "Italian" },
  { id: "5", name: "Burger District", price: 13.4, cuisine: "American" },
];

export function getRestaurantById(id: string): Restaurant | undefined {
  return restaurants.find((r) => r.id === id);
}
