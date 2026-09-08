"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import type { Product } from "@/types/product";

type WishlistContextType = {
  wishlist: Product[];
  totalItems: number;

  isInWishlist: (productId: number) => boolean;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  toggleWishlist: (product: Product) => void;
  clearWishlist: () => void;
};

const WishlistContext = createContext<
  WishlistContextType | undefined
>(undefined);

const WISHLIST_KEY = "luxora-wishlist";

type WishlistProviderProps = {
  children: ReactNode;
};

export function WishlistProvider({
  children,
}: WishlistProviderProps) {
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }

    try {
      const storedWishlist =
        localStorage.getItem(WISHLIST_KEY);

      if (!storedWishlist) {
        return [];
      }

      const parsedWishlist: unknown =
        JSON.parse(storedWishlist);

      if (Array.isArray(parsedWishlist)) {
        return parsedWishlist as Product[];
      }

      return [];
    } catch (error) {
      console.error(
        "Failed to load wishlist:",
        error
      );
      return [];
    }
  });

  // Save wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        WISHLIST_KEY,
        JSON.stringify(wishlist)
      );
    } catch (error) {
      console.error(
        "Failed to save wishlist:",
        error
      );
    }
  }, [wishlist]);

  // Check if product is already in wishlist
  const isInWishlist = useCallback(
    (productId: number) => {
      return wishlist.some(
        (product) => product.id === productId
      );
    },
    [wishlist]
  );

  // Add product to wishlist
  const addToWishlist = useCallback(
    (product: Product) => {
      setWishlist((currentWishlist) => {
        const alreadyExists = currentWishlist.some(
          (item) => item.id === product.id
        );

        if (alreadyExists) {
          return currentWishlist;
        }

        return [...currentWishlist, product];
      });
    },
    []
  );

  // Remove product from wishlist
  const removeFromWishlist = useCallback(
    (productId: number) => {
      setWishlist((currentWishlist) =>
        currentWishlist.filter(
          (product) => product.id !== productId
        )
      );
    },
    []
  );

  // Toggle product in wishlist
  const toggleWishlist = useCallback(
    (product: Product) => {
      setWishlist((currentWishlist) => {
        const alreadyExists = currentWishlist.some(
          (item) => item.id === product.id
        );

        if (alreadyExists) {
          return currentWishlist.filter(
            (item) => item.id !== product.id
          );
        }

        return [...currentWishlist, product];
      });
    },
    []
  );

  // Clear wishlist
  const clearWishlist = useCallback(() => {
    setWishlist([]);
  }, []);

  const totalItems = wishlist.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        totalItems,
        isInWishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error(
      "useWishlist must be used inside WishlistProvider"
    );
  }

  return context;
}