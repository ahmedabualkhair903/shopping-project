import { Product } from "@/types/product";
import { localProducts } from "@/lib/products";

export const getProducts = async (): Promise<Product[]> => {
  return localProducts;
};

export const getProduct = async (
  id: string
): Promise<Product | null> => {
  const productId = Number(id);

  return (
    localProducts.find((product) => product.id === productId) ??
    null
  );
};

export const getCategories = async (): Promise<string[]> => {
  return [...new Set(localProducts.map((product) => product.category))];
};

export const getProductsByCategory = async (
  category: string
): Promise<Product[]> => {
  return localProducts.filter(
    (product) => product.category === category
  );
};