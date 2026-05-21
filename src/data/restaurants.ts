export type Restaurant = {
  id: string;
  name: string;
  price: number;
  cuisine: string;
  rating: number;
  eta: string;
  deliveryFee: number;
  description: string;
  featured?: boolean;
  tags: string[];
  popularItems: string[];
};

export const restaurants: Restaurant[] = [
  {
    id: "1",
    name: "Fire & Lime Tacos",
    price: 12.5,
    cuisine: "Mexican",
    rating: 4.8,
    eta: "18-24 min",
    deliveryFee: 1.99,
    description: "Street tacos, bright salsas, and smoky grilled fillings.",
    featured: true,
    tags: ["Spicy", "Bestseller", "Lunch"],
    popularItems: ["Birria tacos", "Chipotle bowl", "Horchata"],
  },
  {
    id: "2",
    name: "Sushi Orbit",
    price: 19.99,
    cuisine: "Japanese",
    rating: 4.9,
    eta: "22-30 min",
    deliveryFee: 2.49,
    description: "Clean cuts, warm rice, and chef-made rolls that travel well.",
    featured: true,
    tags: ["Premium", "Fresh", "Date night"],
    popularItems: ["Dragon roll", "Salmon sashimi", "Miso ramen"],
  },
  {
    id: "3",
    name: "Green Bowl",
    price: 10.75,
    cuisine: "Healthy",
    rating: 4.7,
    eta: "12-18 min",
    deliveryFee: 0.99,
    description: "Fast, colorful bowls built for a lighter lunch or dinner.",
    tags: ["Vegan", "Fast", "Protein"],
    popularItems: ["Falafel bowl", "Mango salad", "Matcha smoothie"],
  },
  {
    id: "4",
    name: "Pasta Avenue",
    price: 15.25,
    cuisine: "Italian",
    rating: 4.6,
    eta: "20-28 min",
    deliveryFee: 1.49,
    description: "Comforting pasta, creamy sauces, and fresh-baked sides.",
    tags: ["Comfort", "Family", "Saucy"],
    popularItems: ["Truffle alfredo", "Baked rigatoni", "Garlic knots"],
  },
  {
    id: "5",
    name: "Burger District",
    price: 13.4,
    cuisine: "American",
    rating: 4.5,
    eta: "16-22 min",
    deliveryFee: 1.79,
    description: "Juicy burgers, crisp fries, and stacked meals made to share.",
    tags: ["Cheesy", "Late night", "Combo"],
    popularItems: ["Double smash burger", "Loaded fries", "Milkshake"],
  },
  {
    id: "6",
    name: "Curry House",
    price: 14.2,
    cuisine: "Indian",
    rating: 4.8,
    eta: "24-32 min",
    deliveryFee: 2.19,
    description: "Slow-simmered curries and warm naan with bold spice.",
    tags: ["Bold", "Sharing", "Spiced"],
    popularItems: ["Butter chicken", "Paneer bowl", "Garlic naan"],
  },
];

export function getRestaurantById(id: string): Restaurant | undefined {
  return restaurants.find((r) => r.id === id);
}

export const cuisineFilters = ["All", "Mexican", "Japanese", "Healthy", "Italian", "American", "Indian"];
