"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import ProductForm from "@/components/ProductForm/ProductForm";
import { useToast } from "@/context/ToastContext";
import {
  createProduct,
  getCategories,
  getNextProductId,
} from "@/lib/api";

const NewProductPage = () => {
  const router = useRouter();
  const { showToast } = useToast();

  const [productId] = useState(() => getNextProductId());
  const [categories, setCategories] = useState<string[]>(
    []
  );

  useEffect(() => {
    let isMounted = true;

    getCategories().then((data) => {
      if (isMounted) {
        setCategories(data);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <ProductForm
      mode="create"
      productId={productId}
      categories={categories}
      onSubmit={(product) => {
        createProduct(product);

        showToast(
          "success",
          "Product created",
          `"${product.title}" has been added to the catalog.`
        );

        router.push("/admin/products");
      }}
      onCancel={() => router.push("/admin/products")}
    />
  );
};

export default NewProductPage;