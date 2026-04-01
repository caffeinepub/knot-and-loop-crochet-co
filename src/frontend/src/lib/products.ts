import type { Product } from "@/backend.d";

// Shared products array used across Shop, Home, ProductDetail, Wishlist
export const sampleProducts: Product[] = [
  {
    id: BigInt(1),
    name: "Crochet Blue Drawstring Pouch",
    description:
      "A sweet handcrafted crochet drawstring pouch in sky blue and cream with crystal bead accents. Perfect for storing small treasures, jewellery, or gifting.",
    category: "Pouches",
    price: 150,
  },
  {
    id: BigInt(2),
    name: "Crochet Red Bow Keychain",
    description:
      "A bold and beautiful handcrafted crochet bow keychain in vivid red with a polished gold keyring. A standout handmade accessory that makes any set of keys or bag look adorable.",
    category: "Accessories",
    price: 50,
  },
  {
    id: BigInt(3),
    name: "Crochet Blueberry Charm",
    description:
      "A charming handmade crochet blueberry cluster charm with two plump blue berries and bright green leaves on a loop. A whimsical and adorable accessory for bags, keys, or as a gift.",
    category: "Accessories",
    price: 80,
  },
  {
    id: BigInt(4),
    name: "Crochet Rose Flower Pot",
    description:
      "A handcrafted crochet flower pot in olive green with beautiful red roses blooming on top. A unique handmade home decor piece that adds warmth and color to any space.",
    category: "Home Decor",
    price: 100,
  },
  {
    id: BigInt(5),
    name: "Crochet Purple Violet Pot",
    description:
      "A beautiful crochet flower pot in cream white topped with rich purple violet blooms. An elegant handmade piece that makes a thoughtful gift or a lovely home accent.",
    category: "Home Decor",
    price: 100,
  },
  {
    id: BigInt(6),
    name: "Crochet Lavender Clutch Wallet",
    description:
      "A stylish hand-crocheted clutch wallet in soft lilac with a cream trim border. Spacious enough for cards, cash, and essentials — a beautiful everyday accessory.",
    category: "Pouches",
    price: 150,
  },
  {
    id: BigInt(7),
    name: "Crochet Flower Bracelet / Headband",
    description:
      "A delicate handmade crochet accessory adorned with small flowers in pink and cream. Can be worn as a bracelet or headband — a charming and feminine piece perfect for everyday wear or gifting.",
    category: "Accessories",
    price: 100,
  },
  {
    id: BigInt(8),
    name: "Crochet Pink Bloom Pot",
    description:
      "A delightful crochet flower pot in soft pink with a lush cluster of bright pink blooms on top. A charming handmade decor accent for desks, shelves, or windowsills.",
    category: "Home Decor",
    price: 100,
  },
];
