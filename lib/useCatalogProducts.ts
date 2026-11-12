"use client";

import { useEffect, useState } from "react";

import { getProducts } from "@/lib/api";
import type { Product } from "@/types/product";

export function useCatalogProducts(
  initialProducts: Product[],
  enabled = true
) {
  const [products, setProducts] = useState(initialProducts);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    let isMounted = true;

    const refreshProducts = async () => {
      try {
        const catalog = await getProducts();

        if (isMounted) {
          setProducts(catalog);
        }
      } catch (error) {
        console.error("Failed to refresh product catalog:", error);
      }
    };

    void refreshProducts();
    window.addEventListener("products-change", refreshProducts);

    return () => {
      isMounted = false;
      window.removeEventListener("products-change", refreshProducts);
    };
  }, [enabled]);

  return products;
}
