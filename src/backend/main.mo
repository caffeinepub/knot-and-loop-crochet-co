import Text "mo:core/Text";
import Order "mo:core/Order";
import Array "mo:core/Array";

actor {
  type Product = {
    id : Nat;
    name : Text;
    price : Float;
    description : Text;
    category : Text;
  };

  module Product {
    public func compare(p1 : Product, p2 : Product) : Order.Order {
      Nat.compare(p1.id, p2.id);
    };
  };

  let products : [Product] = [
    {
      id = 1;
      name = "Boho Chic Tote";
      price = 55.99;
      description = "Handcrafted crochet tote bag with geometric patterns. Durable and stylish for everyday use.";
      category = "Bags";
    },
    {
      id = 2;
      name = "Pastel Striped Pouch";
      price = 24.50;
      description = "Soft crochet pouch perfect for makeup or small essentials. Features pastel colors and secure zip closure.";
      category = "Pouches";
    },
    {
      id = 3;
      name = "Vintage Lace Beanie";
      price = 29.00;
      description = "Elegant crochet beanie with lace patterns. Lightweight but warm, perfect for chilly days.";
      category = "Hats";
    },
    {
      id = 4;
      name = "Chunky Winter Scarf";
      price = 40.00;
      description = "Super thick and cozy crochet scarf, ideal for winter. Made from premium acrylic yarn.";
      category = "Scarves";
    },
    {
      id = 5;
      name = "Mandala Messenger Bag";
      price = 65.00;
      description = "Artisanal crochet messenger bag featuring intricate mandala patterns. Spacious and bohemian style.";
      category = "Bags";
    },
    {
      id = 6;
      name = "Minimalist Coin Pouch";
      price = 18.75;
      description = "Simple and functional crochet pouch for coins and cards. Compact and fits in any bag.";
      category = "Pouches";
    },
    {
      id = 7;
      name = "Classic Fedora Hat";
      price = 32.00;
      description = "Stylish crochet fedora hat with a classic brim. Versatile accessory for all seasons.";
      category = "Hats";
    },
    {
      id = 8;
      name = "Gradient Shawl";
      price = 58.95;
      description = "Elegant gradient crochet shawl, ranging from light to dark tones. Perfect for layering in style.";
      category = "Scarves";
    },
  ];

  public query ({ caller }) func getProducts() : async [Product] {
    products.sort();
  };

  public query ({ caller }) func getProduct(id : Nat) : async ?Product {
    products.find(func(p) { p.id == id });
  };
};
