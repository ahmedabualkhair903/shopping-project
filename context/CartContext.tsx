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

export type CartItem = Product & {
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;

  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(
  undefined
);

type CartProviderProps = {
  children: ReactNode;
};

const CART_KEY = "ecommerce-cart";

export const CartProvider = ({ children }: CartProviderProps) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadCart = async () => {
      await Promise.resolve();

      try {
        const storedCart = localStorage.getItem(CART_KEY);
        const parsedCart: unknown = storedCart
          ? JSON.parse(storedCart)
          : [];

        if (isMounted) {
          setItems(
            Array.isArray(parsedCart)
              ? parsedCart.filter(
                  (item): item is CartItem =>
                    typeof item === "object" &&
                    item !== null &&
                    "id" in item &&
                    typeof item.id === "number" &&
                    "quantity" in item &&
                    typeof item.quantity === "number" &&
                    Number.isFinite(item.quantity) &&
                    item.quantity > 0
                )
              : []
          );
        }
      } catch (error) {
        console.error("Failed to load cart:", error);
      } finally {
        if (isMounted) {
          setHasLoaded(true);
        }
      }
    };

    void loadCart();

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
        CART_KEY,
        JSON.stringify(items)
      );
    } catch (error) {
      console.error("Failed to save cart:", error);
    }
  }, [hasLoaded, items]);

  const addToCart = useCallback(
    (product: Product, quantity: number = 1) => {
      const safeQuantity = Math.max(
        1,
        Math.floor(Number(quantity) || 1)
      );

      setItems((currentItems) => {
        const existingItem = currentItems.find(
          (item) => item.id === product.id
        );

        if (existingItem) {
          return currentItems.map((item) =>
            item.id === product.id
              ? {
                  ...item,
                  quantity:
                    item.quantity + safeQuantity,
                }
              : item
          );
        }

        return [
          ...currentItems,
          {
            ...product,
            quantity: safeQuantity,
          },
        ];
      });
    },
    []
  );

  const removeFromCart = useCallback((id: number) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== id)
    );
  }, []);

  const updateQuantity = useCallback(
    (id: number, quantity: number) => {
      const safeQuantity = Math.floor(
        Number(quantity)
      );

      if (safeQuantity <= 0) {
        setItems((currentItems) =>
          currentItems.filter((item) => item.id !== id)
        );

        return;
      }

      setItems((currentItems) =>
        currentItems.map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: safeQuantity,
              }
            : item
        )
      );
    },
    []
  );

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = useMemo(() => {
    return items.reduce(
      (total, item) => total + item.quantity,
      0
    );
  }, [items]);

  const totalPrice = useMemo(() => {
    return items.reduce(
      (total, item) =>
        total + item.price * item.quantity,
      0
    );
  }, [items]);

  const value = useMemo(
    () => ({
      items,
      totalItems,
      totalPrice,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
    }),
    [
      items,
      totalItems,
      totalPrice,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
    ]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
};