"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
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
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadWishlist = async () => {
      await Promise.resolve();

      try {
        const storedWishlist =
          localStorage.getItem(WISHLIST_KEY);

        if (!storedWishlist) {
          return;
        }

        const parsedWishlist: unknown =
          JSON.parse(storedWishlist);

        if (Array.isArray(parsedWishlist) && isMounted) {
          setWishlist(
            parsedWishlist.filter(
              (product): product is Product =>
                typeof product === "object" &&
                product !== null &&
                "id" in product &&
                typeof product.id === "number" &&
                "title" in product &&
                typeof product.title === "string" &&
                "price" in product &&
                typeof product.price === "number" &&
                "description" in product &&
                typeof product.description === "string" &&
                "category" in product &&
                typeof product.category === "string" &&
                "image" in product &&
                typeof product.image === "string" &&
                "rating" in product &&
                typeof product.rating === "object" &&
                product.rating !== null &&
                "rate" in product.rating &&
                typeof product.rating.rate === "number" &&
                "count" in product.rating &&
                typeof product.rating.count === "number"
            )
          );
        }
      } catch (error) {
        console.error("Failed to load wishlist:", error);
      } finally {
        if (isMounted) {
          setHasLoaded(true);
        }
      }
    };

    void loadWishlist();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!hasLoaded) {
      return;
    }

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
  }, [hasLoaded, wishlist]);

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
  const value = useMemo(
    () => ({
      wishlist,
      totalItems,
      isInWishlist,
      addToWishlist,
      removeFromWishlist,
      toggleWishlist,
      clearWishlist,
    }),
    [
      wishlist,
      totalItems,
      isInWishlist,
      addToWishlist,
      removeFromWishlist,
      toggleWishlist,
      clearWishlist,
    ]
  );

  return (
    <WishlistContext.Provider value={value}>
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