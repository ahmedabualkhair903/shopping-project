import type { Metadata } from "next";
import "./globals.css";

import Header from "@/components/Header/Header";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import Footer from "@/components/Footer/Footer";

export const metadata: Metadata = {
  title: "LUXORA | Modern E-commerce",
  description:
    "Discover premium products and enjoy a modern shopping experience with LUXORA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <WishlistProvider>
            <Header />

            {children}

            <Footer />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}