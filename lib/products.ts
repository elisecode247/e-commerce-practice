export type Product = {
  id: number;
  name: string;
  category: string;
  priceInCents: number;
  image: string;
  color: string;
  badge?: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Ember High Top",
    category: "Everyday sneaker",
    priceInCents: 9800,
    image: "/shoe1.png",
    color: "Flame",
    badge: "Bestseller",
  },
  {
    id: 2,
    name: "Cobalt Court",
    category: "Low-top sneaker",
    priceInCents: 9200,
    image: "/shoe2.png",
    color: "Cobalt",
  },
  {
    id: 3,
    name: "After Hours",
    category: "High-top sneaker",
    priceInCents: 11800,
    image: "/shoe3.png",
    color: "Black / Ember",
    badge: "New",
  },
  {
    id: 4,
    name: "Maple Avenue",
    category: "Heeled ankle boot",
    priceInCents: 14800,
    image: "/shoe4.png",
    color: "Cognac",
  },
  {
    id: 5,
    name: "Terrain Runner",
    category: "Performance sneaker",
    priceInCents: 13200,
    image: "/shoe5.png",
    color: "Seafoam",
  },
  {
    id: 6,
    name: "Sunday Club",
    category: "Platform sneaker",
    priceInCents: 10800,
    image: "/shoe6.png",
    color: "Chalk / Peach",
  },
  {
    id: 7,
    name: "The Penny",
    category: "Classic loafer",
    priceInCents: 12400,
    image: "/shoe7.png",
    color: "Oat",
  },
  {
    id: 8,
    name: "Midnight Trek",
    category: "Chelsea boot",
    priceInCents: 15600,
    image: "/shoe8.png",
    color: "Midnight",
    badge: "Just in",
  },
  {
    id: 9,
    name: "Signal Pump",
    category: "Stiletto heel",
    priceInCents: 13600,
    image: "/shoe9.png",
    color: "Signal red",
  },
  {
    id: 10,
    name: "Bramble Oxford",
    category: "Lug-sole oxford",
    priceInCents: 14200,
    image: "/shoe10.png",
    color: "Brick",
  },
  {
    id: 11,
    name: "Mono Runner",
    category: "Leather sneaker",
    priceInCents: 12800,
    image: "/shoe11.png",
    color: "Triple black",
  },
  {
    id: 12,
    name: "Nocturne",
    category: "Platform heel",
    priceInCents: 16400,
    image: "/shoe12.png",
    color: "Black / Blush",
  },
];

// This is the server-side data-access boundary. Replace the array with a
// database query later without changing the page component.
export async function getProducts(): Promise<Product[]> {
  return products;
}
