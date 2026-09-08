import { Product } from "@/types/product";

const products: Product[] = [
  {
    id: 1,
    title: "Minimal Leather Backpack",
    price: 79.99,
    description:
      "A refined everyday backpack with a clean silhouette and practical storage.",
    category: "bags",
    image: "/products/product-01.jpg",
    rating: { rate: 4.8, count: 124 },
  },
  {
    id: 2,
    title: "Classic White Shirt",
    price: 49.99,
    description:
      "A timeless everyday shirt with a relaxed silhouette and effortless styling.",
    category: "men's clothing",
    image: "/products/product-02.jpg",
    rating: { rate: 4.7, count: 98 },
  },
  {
    id: 3,
    title: "Modern Knit Sweater",
    price: 64.99,
    description:
      "Soft textured knitwear designed for comfort and understated style.",
    category: "men's clothing",
    image: "/products/product-03.jpg",
    rating: { rate: 4.6, count: 86 },
  },
  {
    id: 4,
    title: "Essential Cotton Tote",
    price: 29.99,
    description:
      "A versatile everyday tote with a simple shape and comfortable carry.",
    category: "bags",
    image: "/products/product-04.jpg",
    rating: { rate: 4.8, count: 143 },
  },
  {
    id: 5,
    title: "Everyday Oversized Tee",
    price: 34.99,
    description:
      "A relaxed everyday tee with a premium feel and clean contemporary shape.",
    category: "women's clothing",
    image: "/products/product-05.jpg",
    rating: { rate: 4.9, count: 211 },
  },
  {
    id: 6,
    title: "Soft Neutral Hoodie",
    price: 59.99,
    description:
      "A comfortable premium hoodie with a minimal aesthetic for everyday wear.",
    category: "women's clothing",
    image: "/products/product-06.jpg",
    rating: { rate: 4.7, count: 167 },
  },
  {
    id: 7,
    title: "Structured Shoulder Bag",
    price: 89.99,
    description:
      "A sophisticated structured bag designed for modern everyday looks.",
    category: "bags",
    image: "/products/product-07.jpg",
    rating: { rate: 4.9, count: 189 },
  },
  {
    id: 8,
    title: "Minimal Everyday Watch",
    price: 119.99,
    description:
      "A refined minimalist watch with a timeless face and versatile design.",
    category: "jewelery",
    image: "/products/product-08.jpg",
    rating: { rate: 4.8, count: 156 },
  },
  {
    id: 9,
    title: "Premium Denim Jacket",
    price: 84.99,
    description:
      "A classic denim jacket with a contemporary fit and versatile appeal.",
    category: "men's clothing",
    image: "/products/product-09.jpg",
    rating: { rate: 4.7, count: 112 },
  },
  {
    id: 10,
    title: "Relaxed Linen Shirt",
    price: 54.99,
    description:
      "Lightweight linen designed for warm days and effortless comfort.",
    category: "men's clothing",
    image: "/products/product-10.jpg",
    rating: { rate: 4.8, count: 91 },
  },
  {
    id: 11,
    title: "Clean Everyday Sneakers",
    price: 94.99,
    description:
      "Minimal sneakers with a clean profile made for everyday movement.",
    category: "shoes",
    image: "/products/product-11.jpg",
    rating: { rate: 4.9, count: 238 },
  },
  {
    id: 12,
    title: "Classic Leather Loafers",
    price: 109.99,
    description:
      "Elegant leather loafers with a timeless silhouette and refined finish.",
    category: "shoes",
    image: "/products/product-12.jpg",
    rating: { rate: 4.7, count: 104 },
  },
  {
    id: 13,
    title: "Soft Everyday Cardigan",
    price: 69.99,
    description:
      "A soft layering piece with a relaxed shape and timeless aesthetic.",
    category: "women's clothing",
    image: "/products/product-13.jpg",
    rating: { rate: 4.8, count: 127 },
  },
  {
    id: 14,
    title: "Modern Pleated Trousers",
    price: 74.99,
    description:
      "Tailored trousers with a relaxed contemporary fit and refined finish.",
    category: "women's clothing",
    image: "/products/product-14.jpg",
    rating: { rate: 4.6, count: 83 },
  },
  {
    id: 15,
    title: "Everyday Crossbody Bag",
    price: 74.99,
    description:
      "A compact crossbody bag designed for essentials and everyday styling.",
    category: "bags",
    image: "/products/product-15.jpg",
    rating: { rate: 4.8, count: 145 },
  },
  {
    id: 16,
    title: "Minimal Gold Necklace",
    price: 44.99,
    description:
      "A delicate minimalist necklace designed for subtle elegance.",
    category: "jewelery",
    image: "/products/product-16.jpg",
    rating: { rate: 4.9, count: 174 },
  },
  {
    id: 17,
    title: "Sculptural Hoop Earrings",
    price: 39.99,
    description:
      "Modern hoop earrings with a sculptural silhouette and polished finish.",
    category: "jewelery",
    image: "/products/product-17.jpg",
    rating: { rate: 4.7, count: 119 },
  },
  {
    id: 18,
    title: "Classic Leather Belt",
    price: 32.99,
    description:
      "A refined leather belt with a simple buckle and timeless character.",
    category: "accessories",
    image: "/products/product-18.jpg",
    rating: { rate: 4.6, count: 76 },
  },
  {
    id: 19,
    title: "Minimal Sunglasses",
    price: 49.99,
    description:
      "Clean modern sunglasses with a versatile everyday silhouette.",
    category: "accessories",
    image: "/products/product-19.jpg",
    rating: { rate: 4.8, count: 132 },
  },
  {
    id: 20,
    title: "Relaxed Cotton Pants",
    price: 59.99,
    description:
      "Comfortable cotton trousers with a relaxed fit and understated style.",
    category: "men's clothing",
    image: "/products/product-20.jpg",
    rating: { rate: 4.7, count: 88 },
  },
  {
    id: 21,
    title: "Soft Ribbed Top",
    price: 39.99,
    description:
      "A refined ribbed top with a comfortable fit and effortless appeal.",
    category: "women's clothing",
    image: "/products/product-21.jpg",
    rating: { rate: 4.8, count: 102 },
  },
  {
    id: 22,
    title: "Premium Canvas Sneakers",
    price: 69.99,
    description:
      "Classic canvas sneakers with a clean contemporary silhouette.",
    category: "shoes",
    image: "/products/product-22.jpg",
    rating: { rate: 4.7, count: 148 },
  },
  {
    id: 23,
    title: "Everyday Mini Bag",
    price: 64.99,
    description:
      "A compact modern bag with enough space for daily essentials.",
    category: "bags",
    image: "/products/product-23.jpg",
    rating: { rate: 4.8, count: 137 },
  },
  {
    id: 24,
    title: "Slim Silver Watch",
    price: 129.99,
    description:
      "A sophisticated slim watch with a clean dial and metallic finish.",
    category: "jewelery",
    image: "/products/product-24.jpg",
    rating: { rate: 4.9, count: 164 },
  },
  {
    id: 25,
    title: "Relaxed Oxford Shirt",
    price: 59.99,
    description:
      "A polished Oxford shirt designed for everyday versatility.",
    category: "men's clothing",
    image: "/products/product-25.jpg",
    rating: { rate: 4.7, count: 94 },
  },
  {
    id: 26,
    title: "Classic Trench Coat",
    price: 139.99,
    description:
      "A timeless outer layer with a clean tailored silhouette.",
    category: "women's clothing",
    image: "/products/product-26.jpg",
    rating: { rate: 4.9, count: 117 },
  },
  {
    id: 27,
    title: "Leather Chelsea Boots",
    price: 124.99,
    description:
      "Classic Chelsea boots crafted for refined everyday styling.",
    category: "shoes",
    image: "/products/product-27.jpg",
    rating: { rate: 4.8, count: 121 },
  },
  {
    id: 28,
    title: "Soft Leather Handbag",
    price: 109.99,
    description:
      "A spacious leather handbag with a soft structured silhouette.",
    category: "bags",
    image: "/products/product-28.jpg",
    rating: { rate: 4.8, count: 156 },
  },
  {
    id: 29,
    title: "Fine Chain Bracelet",
    price: 54.99,
    description:
      "A delicate chain bracelet with a refined polished finish.",
    category: "jewelery",
    image: "/products/product-29.jpg",
    rating: { rate: 4.7, count: 92 },
  },
  {
    id: 30,
    title: "Classic Metal Sunglasses",
    price: 54.99,
    description:
      "Lightweight metal sunglasses with a clean modern frame.",
    category: "accessories",
    image: "/products/product-30.jpg",
    rating: { rate: 4.8, count: 118 },
  },
  {
    id: 31,
    title: "Premium Polo Shirt",
    price: 54.99,
    description:
      "A refined polo shirt with a comfortable fit and timeless design.",
    category: "men's clothing",
    image: "/products/product-31.jpg",
    rating: { rate: 4.7, count: 109 },
  },
  {
    id: 32,
    title: "Flowy Summer Dress",
    price: 79.99,
    description:
      "An effortless flowing dress designed for relaxed warm-weather style.",
    category: "women's clothing",
    image: "/products/product-32.jpg",
    rating: { rate: 4.9, count: 143 },
  },
  {
    id: 33,
    title: "Retro Running Sneakers",
    price: 99.99,
    description:
      "A retro-inspired sneaker combining comfort with modern styling.",
    category: "shoes",
    image: "/products/product-33.jpg",
    rating: { rate: 4.8, count: 187 },
  },
  {
    id: 34,
    title: "Structured Mini Tote",
    price: 69.99,
    description:
      "A structured mini tote designed for simple polished everyday looks.",
    category: "bags",
    image: "/products/product-34.jpg",
    rating: { rate: 4.7, count: 113 },
  },
  {
    id: 35,
    title: "Classic Pearl Earrings",
    price: 59.99,
    description:
      "Elegant pearl earrings with a timeless understated appearance.",
    category: "jewelery",
    image: "/products/product-35.jpg",
    rating: { rate: 4.9, count: 98 },
  },
  {
    id: 36,
    title: "Minimal Leather Wallet",
    price: 44.99,
    description:
      "A slim leather wallet designed to keep everyday essentials organized.",
    category: "accessories",
    image: "/products/product-36.jpg",
    rating: { rate: 4.8, count: 135 },
  },
  {
    id: 37,
    title: "Relaxed Knit Polo",
    price: 69.99,
    description:
      "A soft knitted polo with a relaxed shape and premium texture.",
    category: "men's clothing",
    image: "/products/product-37.jpg",
    rating: { rate: 4.7, count: 86 },
  },
  {
    id: 38,
    title: "Minimal Satin Skirt",
    price: 64.99,
    description:
      "A clean satin skirt with an elegant drape and contemporary silhouette.",
    category: "women's clothing",
    image: "/products/product-38.jpg",
    rating: { rate: 4.8, count: 104 },
  },
  {
    id: 39,
    title: "Everyday Court Sneakers",
    price: 89.99,
    description:
      "Clean court-inspired sneakers designed for everyday versatility.",
    category: "shoes",
    image: "/products/product-39.jpg",
    rating: { rate: 4.8, count: 151 },
  },
  {
    id: 40,
    title: "Soft Shoulder Bag",
    price: 84.99,
    description:
      "A soft shoulder bag with a modern silhouette and practical interior.",
    category: "bags",
    image: "/products/product-40.jpg",
    rating: { rate: 4.7, count: 127 },
  },
  {
    id: 41,
    title: "Slim Gold Bracelet",
    price: 49.99,
    description:
      "A minimal bracelet with a slim profile and elegant polished finish.",
    category: "jewelery",
    image: "/products/product-41.jpg",
    rating: { rate: 4.9, count: 141 },
  },
  {
    id: 42,
    title: "Everyday Leather Cap",
    price: 34.99,
    description:
      "A modern leather cap with a clean profile and understated finish.",
    category: "accessories",
    image: "/products/product-42.jpg",
    rating: { rate: 4.6, count: 73 },
  },
  {
    id: 43,
    title: "Premium Relaxed Tee",
    price: 39.99,
    description:
      "A premium relaxed-fit tee made for effortless everyday outfits.",
    category: "men's clothing",
    image: "/products/product-43.jpg",
    rating: { rate: 4.8, count: 132 },
  },
  {
    id: 44,
    title: "Elegant Long Coat",
    price: 149.99,
    description:
      "A sophisticated long coat with a clean silhouette and refined finish.",
    category: "women's clothing",
    image: "/products/product-44.jpg",
    rating: { rate: 4.9, count: 97 },
  },
  {
    id: 45,
    title: "Modern Suede Sneakers",
    price: 104.99,
    description:
      "Premium suede sneakers with a refined everyday silhouette.",
    category: "shoes",
    image: "/products/product-45.jpg",
    rating: { rate: 4.7, count: 115 },
  },
  {
    id: 46,
    title: "Soft Travel Tote",
    price: 94.99,
    description:
      "A spacious soft tote designed for travel, work and everyday essentials.",
    category: "bags",
    image: "/products/product-46.jpg",
    rating: { rate: 4.8, count: 129 },
  },
  {
    id: 47,
    title: "Minimal Pendant",
    price: 42.99,
    description:
      "A subtle pendant necklace designed for everyday layering.",
    category: "jewelery",
    image: "/products/product-47.jpg",
    rating: { rate: 4.7, count: 89 },
  },
  {
    id: 48,
    title: "Classic Leather Sunglasses",
    price: 59.99,
    description:
      "Timeless sunglasses with a premium frame and versatile styling.",
    category: "accessories",
    image: "/products/product-48.jpg",
    rating: { rate: 4.8, count: 126 },
  },
  {
    id: 49,
    title: "Modern Relaxed Blazer",
    price: 119.99,
    description:
      "A relaxed blazer with a contemporary silhouette and refined character.",
    category: "women's clothing",
    image: "/products/product-49.jpg",
    rating: { rate: 4.9, count: 108 },
  },
  {
    id: 50,
    title: "Signature Everyday Watch",
    price: 139.99,
    description:
      "A sophisticated everyday watch combining a clean dial with timeless design.",
    category: "jewelery",
    image: "/products/product-50.jpg",
    rating: { rate: 4.9, count: 173 },
  },
];

export const fallbackProducts: Product[] = products;