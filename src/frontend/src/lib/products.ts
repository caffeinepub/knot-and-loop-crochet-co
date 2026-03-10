import type { Product } from "@/backend.d";

// Shared products array used across Shop, Home, ProductDetail, Wishlist
export const sampleProducts: Product[] = [
  // Bags
  {
    id: BigInt(1),
    name: "Crochet Sunburst Market Bag",
    description:
      "A roomy hand-crocheted market tote in warm terracotta tones, sturdy enough for farmers' markets. Crafted with 100% cotton yarn for durability and a relaxed boho feel.",
    category: "Bags",
    price: 100,
  },
  {
    id: BigInt(2),
    name: "Crochet Coastal Weave Tote",
    description:
      "A breezy open-weave crochet tote in mustard yellow — perfect for the beach or brunch. The wide weave makes it lightweight yet surprisingly strong.",
    category: "Bags",
    price: 100,
  },
  {
    id: BigInt(3),
    name: "Crochet Lavender Mini Crossbody",
    description:
      "A cute crocheted crossbody in soft lavender with a braided strap and tassel detail. The adjustable strap fits every frame and the zip closure keeps your essentials safe.",
    category: "Bags",
    price: 100,
  },
  {
    id: BigInt(6),
    name: "Crochet Sunset Bucket Bag",
    description:
      "A roomy crochet bucket bag in warm sunset tones with a drawstring closure and braided handles. Fits a book, wallet, and everything in between.",
    category: "Bags",
    price: 100,
  },
  {
    id: BigInt(7),
    name: "Crochet Boho Fringe Tote",
    description:
      "A stylish crocheted fringed tote in earthy brown and cream with extra-wide straps — great for everyday use. The fringe detail adds that perfect boho touch.",
    category: "Bags",
    price: 100,
  },
  // Pouches
  {
    id: BigInt(4),
    name: "Crochet Sage Coin Pouch",
    description:
      "A compact crocheted zippered pouch in sage green with a wrist loop — great for essentials. The tight crochet stitch keeps even the tiniest coins secure.",
    category: "Pouches",
    price: 100,
  },
  {
    id: BigInt(5),
    name: "Crochet Terracotta Card Wallet",
    description:
      "A slim hand-crocheted card wallet in terracotta, holds cards and cash effortlessly. Slip it into any pocket or clip it to your bag for easy access.",
    category: "Pouches",
    price: 100,
  },
  {
    id: BigInt(8),
    name: "Crochet Petal Zipper Pouch",
    description:
      "A charming crochet pouch with a floral petal stitch in blush pink — fits makeup, coins, or trinkets. Each petal is individually crafted for texture and beauty.",
    category: "Pouches",
    price: 100,
  },
  {
    id: BigInt(9),
    name: "Crochet Mustard Wristlet Pouch",
    description:
      "A compact crocheted wristlet pouch in mustard yellow with a secure zip and adjustable loop strap. The warm mustard hue pairs with almost any outfit.",
    category: "Pouches",
    price: 100,
  },
  {
    id: BigInt(10),
    name: "Crochet Blossom Pouch",
    description:
      "A sweet pastel crochet pouch with a zipper and decorative blossom stitch pattern — great for makeup or trinkets. The blossom stitch detail makes it truly one-of-a-kind.",
    category: "Pouches",
    price: 100,
  },
  // Hairbands
  {
    id: BigInt(11),
    name: "Crochet Petal Hairband",
    description:
      "A stretchy crochet hairband in blush pink with a delicate flower detail — handmade and hair-friendly. Gentle on all hair types, beautiful on everyone.",
    category: "Hairbands",
    price: 100,
  },
  {
    id: BigInt(18),
    name: "Crochet Rose Shell Hairband",
    description:
      "A stretchy crochet hairband in soft rose pink with a delicate shell stitch pattern — handmade and gentle on hair. The shell stitch creates a beautiful, textured look.",
    category: "Hairbands",
    price: 100,
  },
  {
    id: BigInt(19),
    name: "Crochet Lavender Sunflower Hairband",
    description:
      "A stretchy crochet hairband in soft lavender with a cheerful sunflower center motif. Handmade with soft cotton yarn — gentle on hair and lovely to wear.",
    category: "Hairbands",
    price: 100,
  },
  {
    id: BigInt(20),
    name: "Crochet Mustard Daisy Hairband",
    description:
      "A bright and breezy crochet hairband in mustard yellow with a fresh daisy flower accent. Stretchy, comfortable, and a perfect pop of color for any look.",
    category: "Hairbands",
    price: 100,
  },
  {
    id: BigInt(21),
    name: "Crochet Sage Leaf Hairband",
    description:
      "A boho-inspired crochet hairband in sage green with a delicate leaf and vine pattern. Made with natural cotton yarn — soft, stretchy, and beautifully crafted.",
    category: "Hairbands",
    price: 100,
  },
  // Dreamcatchers
  {
    id: BigInt(14),
    name: "Crochet Terracotta Dreamcatcher",
    description:
      "A handcrafted crochet dreamcatcher in terracotta and cream with delicate feather tassels — beautiful wall decor that also brings good dreams.",
    category: "Dreamcatchers",
    price: 100,
  },
  {
    id: BigInt(15),
    name: "Crochet Sage Boho Dreamcatcher",
    description:
      "An intricate sage green crochet dreamcatcher with wooden beads and fringe — perfect for any boho space. Each knot is tied with intention.",
    category: "Dreamcatchers",
    price: 100,
  },
  {
    id: BigInt(12),
    name: "Crochet Boho Dreamcatcher",
    description:
      "A handcrafted crochet dreamcatcher in terracotta and sage, with feathers and an intricate yarn web — perfect wall decor. Brings warmth and artisan beauty to any room.",
    category: "Dreamcatchers",
    price: 100,
  },
  {
    id: BigInt(22),
    name: "Crochet White & Gold Dreamcatcher",
    description:
      "An elegant crochet dreamcatcher in white and gold with an intricate web pattern, hanging feathers, and wooden beads. A stunning piece of bohemian wall art.",
    category: "Dreamcatchers",
    price: 100,
  },
  {
    id: BigInt(23),
    name: "Crochet Pink Cream Dreamcatcher",
    description:
      "A soft crochet dreamcatcher in dusty pink and cream with a delicate yarn web and pink feather tassels. Adds a romantic, dreamy touch to any room.",
    category: "Dreamcatchers",
    price: 100,
  },
  {
    id: BigInt(24),
    name: "Crochet Teal Fringe Dreamcatcher",
    description:
      "A bold crochet dreamcatcher in deep teal and turquoise with a complex web pattern, turquoise beads, and long flowing fringe. A statement piece for any wall.",
    category: "Dreamcatchers",
    price: 100,
  },
  // Home Decor
  {
    id: BigInt(25),
    name: "Crochet Coaster Bouquet Set",
    description:
      "A delightful set of hand-crocheted coasters arranged as a bouquet, each featuring a unique floral mandala pattern in terracotta, sage green, mustard, and blush pink. Perfect as a gift or a colorful addition to your table.",
    category: "Home Decor",
    price: 100,
  },
  {
    id: BigInt(26),
    name: "Crochet Flower Pot Set",
    description:
      "A charming crochet flower pot set featuring a terracotta pot wrapped in a colorful yarn cover with handmade crocheted flowers and leaves. A sweet boho decor piece that brings warmth and artisan beauty to any space.",
    category: "Home Decor",
    price: 100,
  },
  // Keychains
  {
    id: BigInt(16),
    name: "Crochet Flower Keychain",
    description:
      "A sweet crochet flower keychain in pastel tones — a handmade charm for bags, keys, or gifts. Makes a wonderful little present for someone special.",
    category: "Accessories",
    price: 100,
  },
  {
    id: BigInt(17),
    name: "Crochet Rainbow Mini Keychain",
    description:
      "A cheerful mini crochet rainbow keychain in vibrant colors — a tiny handmade touch of joy. Every color of the rainbow, looped with love.",
    category: "Accessories",
    price: 100,
  },
  {
    id: BigInt(13),
    name: "Crochet Mini Keychain",
    description:
      "A tiny crochet charm keychain in mustard yellow — a cute handmade accent for your keys or bag. Compact, colorful, and crafted with care.",
    category: "Accessories",
    price: 100,
  },
];
