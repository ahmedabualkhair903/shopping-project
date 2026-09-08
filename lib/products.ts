import { Product } from "@/types/product";

const productData = [
  ["Classic Leather Watch", "watches", 89.99],
  ["Minimal Silver Watch", "watches", 109.99],
  ["Urban Chronograph", "watches", 129.99],
  ["Classic Black Watch", "watches", 94.99],
  ["Modern Steel Watch", "watches", 119.99],

  ["Signature Eau de Parfum", "fragrances", 74.99],
  ["Noir Eau de Parfum", "fragrances", 84.99],
  ["Pure Essence", "fragrances", 69.99],
  ["Amber Collection", "fragrances", 79.99],
  ["Luxe Intense", "fragrances", 94.99],

  ["Classic Leather Wallet", "accessories", 39.99],
  ["Slim Card Holder", "accessories", 29.99],
  ["Premium Leather Belt", "accessories", 44.99],
  ["Everyday Sunglasses", "accessories", 54.99],
  ["Classic Metal Bracelet", "accessories", 49.99],

  ["Essential Cotton Shirt", "clothing", 59.99],
  ["Relaxed Fit Shirt", "clothing", 64.99],
  ["Premium Oxford Shirt", "clothing", 69.99],
  ["Classic Overshirt", "clothing", 79.99],
  ["Everyday Linen Shirt", "clothing", 74.99],

  ["Essential Hoodie", "clothing", 69.99],
  ["Minimal Crewneck", "clothing", 64.99],
  ["Classic Sweatshirt", "clothing", 59.99],
  ["Relaxed Hoodie", "clothing", 74.99],
  ["Premium Knit Sweater", "clothing", 89.99],

  ["Classic Sneakers", "footwear", 99.99],
  ["Everyday White Sneakers", "footwear", 89.99],
  ["Minimal Leather Sneakers", "footwear", 119.99],
  ["Urban Runner", "footwear", 109.99],
  ["Classic Loafers", "footwear", 129.99],

  ["Everyday Tote Bag", "bags", 79.99],
  ["Minimal Shoulder Bag", "bags", 89.99],
  ["Classic Leather Bag", "bags", 119.99],
  ["Urban Crossbody Bag", "bags", 94.99],
  ["Premium Travel Bag", "bags", 149.99],

  ["Minimal Backpack", "bags", 109.99],
  ["Everyday Canvas Bag", "bags", 59.99],
  ["Classic Mini Bag", "bags", 69.99],
  ["Structured Handbag", "bags", 129.99],
  ["Essential Shopper Bag", "bags", 74.99],

  ["Minimal Silver Ring", "jewelry", 44.99],
  ["Classic Gold Ring", "jewelry", 59.99],
  ["Fine Chain Necklace", "jewelry", 69.99],
  ["Minimal Bracelet", "jewelry", 54.99],
  ["Signature Earrings", "jewelry", 49.99],

  ["Classic Cap", "accessories", 34.99],
  ["Minimal Beanie", "accessories", 39.99],
  ["Premium Leather Gloves", "accessories", 64.99],
  ["Classic Scarf", "accessories", 49.99],
  ["Everyday Sunglasses II", "accessories", 59.99],
];

export const localProducts: Product[] = productData.map(
  ([title, category, price], index) => ({
    id: index + 1,
    title: title as string,
    price: price as number,
    description:
      "Thoughtfully selected by LUXORA for everyday style, comfort and timeless appeal.",
    category: category as string,
    image: `/products/product-${String(index + 1).padStart(2, "0")}.jfif`,
    rating: {
      rate: Number((4.2 + ((index * 7) % 8) / 10).toFixed(1)),
      count: 20 + index * 7,
    },
  })
);