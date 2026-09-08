import { Product } from "@/types/product";
import { localProducts } from "@/lib/products";

const PRODUCTS_OVERRIDES_KEY = "luxora-products";

/*
 * Admin changes are persisted in localStorage so the
 * admin catalog stays consistent across page visits.
 *
 * The base catalog (localProducts) is merged with the
 * overrides to build the "effective" catalog:
 *
 * - added:    products created from the admin dashboard
 * - updated:  edits to base-catalog products
 * - deleted:  base product ids removed from the admin dashboard
 */
type ProductsOverrides = {
  added: Product[];
  updated: Record<number, Product>;
  deleted: number[];
};

const defaultOverrides = (): ProductsOverrides => ({
  added: [],
  updated: {},
  deleted: [],
});

const readOverrides = (): ProductsOverrides => {
  if (typeof window === "undefined") {
    return defaultOverrides();
  }

  try {
    const raw = localStorage.getItem(
      PRODUCTS_OVERRIDES_KEY
    );

    if (!raw) {
      return defaultOverrides();
    }

    const parsed: unknown = JSON.parse(raw);

    if (
      typeof parsed !== "object" ||
      parsed === null ||
      !("added" in parsed) ||
      !Array.isArray((parsed as ProductsOverrides).added) ||
      !("updated" in parsed) ||
      typeof (parsed as ProductsOverrides).updated !==
        "object" ||
      !("deleted" in parsed) ||
      !Array.isArray((parsed as ProductsOverrides).deleted)
    ) {
      return defaultOverrides();
    }

    return parsed as ProductsOverrides;
  } catch (error) {
    console.error(
      "Failed to read product overrides:",
      error
    );
    return defaultOverrides();
  }
};

const writeOverrides = (
  overrides: ProductsOverrides
): void => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem(
      PRODUCTS_OVERRIDES_KEY,
      JSON.stringify(overrides)
    );
  } catch (error) {
    console.error(
      "Failed to save product overrides:",
      error
    );
  }
};

const getEffectiveProducts = (): Product[] => {
  const overrides = readOverrides();

  const catalog = [
    ...localProducts.filter(
      (product) =>
        !(product.id in overrides.updated)
    ),
    ...Object.values(overrides.updated),
  ].filter(
    (product) => !overrides.deleted.includes(product.id)
  );

  return [...catalog, ...overrides.added];
};

export const getProducts = async (): Promise<Product[]> => {
  return getEffectiveProducts();
};

export const getProduct = async (
  id: string
): Promise<Product | null> => {
  const productId = Number(id);

  return (
    getEffectiveProducts().find(
      (product) => product.id === productId
    ) ?? null
  );
};

export const getCategories = async (): Promise<string[]> => {
  return [
    ...new Set(
      getEffectiveProducts().map(
        (product) => product.category
      )
    ),
  ];
};

export const getProductsByCategory = async (
  category: string
): Promise<Product[]> => {
  return getEffectiveProducts().filter(
    (product) => product.category === category
  );
};

export const getNextProductId = (): number => {
  const overrides = readOverrides();

  const baseMax = localProducts.reduce(
    (max, product) => Math.max(max, product.id),
    0
  );

  const addedMax = overrides.added.reduce(
    (max, product) => Math.max(max, product.id),
    0
  );

  return Math.max(baseMax, addedMax) + 1;
};

export const createProduct = (product: Product): void => {
  const overrides = readOverrides();

  writeOverrides({
    ...overrides,
    added: [...overrides.added, product],
  });
};

export const updateProduct = (
  id: number,
  product: Product
): void => {
  const overrides = readOverrides();

  if (overrides.added.some((item) => item.id === id)) {
    writeOverrides({
      ...overrides,
      added: overrides.added.map((item) =>
        item.id === id ? product : item
      ),
    });

    return;
  }

  writeOverrides({
    ...overrides,
    updated: {
      ...overrides.updated,
      [id]: product,
    },
  });
};

export const deleteProduct = (id: number): void => {
  const overrides = readOverrides();

  const remainingUpdated = { ...overrides.updated };
  delete remainingUpdated[id];

  writeOverrides({
    added: overrides.added.filter(
      (product) => product.id !== id
    ),
    updated: remainingUpdated,
    deleted: overrides.deleted.includes(id)
      ? overrides.deleted
      : [...overrides.deleted, id],
  });
};