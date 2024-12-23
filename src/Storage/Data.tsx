"use client";
// Tipe data untuk item yang akan disimpan
export interface Product {
  id: string;
  image: string;
  name: string;
  price: string;
}

export interface Warehouse {
  id: string;
  name: string;
  location: string;
}

export const PRODUCT_STORAGE_KEY = "products";
export const WAREHOUSE_STORAGE_KEY = "warehouses";
export const SELECTED_WAREHOUSE_KEY = "selectedWarehouse";

// Fungsi untuk membuat ID unik
export const generateUniqueId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Inisialisasi data awal jika localStorage kosong
export const initializeData = (): void => {
  if (typeof window === "undefined" || !window.localStorage) return;
  if (!localStorage.getItem(PRODUCT_STORAGE_KEY)) {
    const initialProducts: Product[] = [
      {
        id: generateUniqueId(),
        name: "Product A",
        price: "100",
        image: "/image1.jpg",
      },
      {
        id: generateUniqueId(),
        name: "Product B",
        price: "200",
        image: "/image2.jpg",
      },
      {
        id: generateUniqueId(),
        name: "Product C",
        price: "300",
        image: "/image3.jpg",
      },
      {
        id: generateUniqueId(),
        name: "Product D",
        price: "300",
        image: "/image4.jpg",
      },
      {
        id: generateUniqueId(),
        name: "Product E",
        price: "300",
        image: "/image5.jpg",
      },
    ];
    localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(initialProducts));
  }

  if (!localStorage.getItem(WAREHOUSE_STORAGE_KEY)) {
    const initialWarehouses: Warehouse[] = [
      { id: generateUniqueId(), name: "Warehouse 1", location: "Location A" },
      { id: generateUniqueId(), name: "Warehouse 2", location: "Location B" },
      { id: generateUniqueId(), name: "Warehouse 3", location: "Location C" },
    ];
    localStorage.setItem(
      WAREHOUSE_STORAGE_KEY,
      JSON.stringify(initialWarehouses)
    );

    // Set default selected warehouse
    localStorage.setItem(
      SELECTED_WAREHOUSE_KEY,
      JSON.stringify(initialWarehouses[0])
    );
  }

  if (!localStorage.getItem(SELECTED_WAREHOUSE_KEY)) {
    const warehouses = JSON.parse(
      localStorage.getItem(WAREHOUSE_STORAGE_KEY) || "[]"
    );
    if (warehouses.length > 0) {
      localStorage.setItem(
        SELECTED_WAREHOUSE_KEY,
        JSON.stringify(warehouses[0])
      );
    }
  }
};

// Panggil fungsi inisialisasi saat pertama kali script dijalankan
// initializeData();

// Mengambil semua data produk dari localStorage
export const getProducts = (): Product[] => {
  if (typeof window === "undefined" || !window.localStorage) return [];
  const data = localStorage.getItem(PRODUCT_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

// Menambahkan item produk baru ke localStorage
export const addProduct = (product: Omit<Product, "id">): void => {
  if (typeof window === "undefined" || !window.localStorage) return;
  const products = getProducts();
  const newProduct = { ...product, id: generateUniqueId() };
  products.push(newProduct);
  localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(products));
};

export const getProductById = (id: string): Product => {
  const products = getProducts();
  const productIndex = products.findIndex((item) => item.id === id);
  return products[productIndex];
};

// Mengupdate item produk berdasarkan ID
export const updateProduct = (
  id: string,
  updatedProduct: Partial<Product>
): void => {
  if (typeof window === "undefined" || !window.localStorage) return;
  const products = getProducts();
  const productIndex = products.findIndex((product) => product.id === id);

  if (productIndex !== -1) {
    products[productIndex] = { ...products[productIndex], ...updatedProduct };
    localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(products));
  } else {
    throw new Error("Product not found");
  }
};

// Menghapus item produk berdasarkan ID
export const deleteProduct = (id: string): void => {
  if (typeof window === "undefined" || !window.localStorage) return;
  const products = getProducts();
  const filteredProducts = products.filter((product) => product.id !== id);
  localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(filteredProducts));
};

// Mengambil semua data warehouse dari localStorage
export const getWarehouses = (): Warehouse[] => {
  if (typeof window === "undefined" || !window.localStorage) return [];
  const data = localStorage.getItem(WAREHOUSE_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

// Menambahkan warehouse baru ke localStorage
export const addWarehouse = (warehouse: Omit<Warehouse, "id">): void => {
  if (typeof window === "undefined" || !window.localStorage) return;
  const warehouses = getWarehouses();
  const newWarehouse = { ...warehouse, id: generateUniqueId() };
  warehouses.push(newWarehouse);
  localStorage.setItem(WAREHOUSE_STORAGE_KEY, JSON.stringify(warehouses));
};

// Mengupdate warehouse berdasarkan ID
export const updateWarehouse = (
  id: string,
  updatedWarehouse: Partial<Warehouse>
): void => {
  if (typeof window === "undefined" || !window.localStorage) return;
  const warehouses = getWarehouses();
  const warehouseIndex = warehouses.findIndex(
    (warehouse) => warehouse.id === id
  );

  if (warehouseIndex !== -1) {
    warehouses[warehouseIndex] = {
      ...warehouses[warehouseIndex],
      ...updatedWarehouse,
    };
    localStorage.setItem(WAREHOUSE_STORAGE_KEY, JSON.stringify(warehouses));
  } else {
    throw new Error("Warehouse not found");
  }
};

// Menghapus warehouse berdasarkan ID
export const deleteWarehouse = (id: string): void => {
  if (typeof window === "undefined" || !window.localStorage) return;
  const warehouses = getWarehouses();
  const filteredWarehouses = warehouses.filter(
    (warehouse) => warehouse.id !== id
  );
  localStorage.setItem(
    WAREHOUSE_STORAGE_KEY,
    JSON.stringify(filteredWarehouses)
  );
};

// Mendapatkan warehouse yang dipilih
export const getSelectedWarehouse = (): Warehouse | null => {
  if (typeof window === "undefined" || !window.localStorage) return null;
  const data = localStorage.getItem(SELECTED_WAREHOUSE_KEY);
  return data ? JSON.parse(data) : null;
};

export const setSelectedWarehouse = (warehouseId: string): void => {
  if (typeof window === "undefined" || !window.localStorage) return;
  const warehouses = getWarehouses();
  const selectedWarehouse = warehouses.find(
    (warehouse) => warehouse.id === warehouseId
  );
  if (selectedWarehouse) {
    localStorage.setItem(
      SELECTED_WAREHOUSE_KEY,
      JSON.stringify(selectedWarehouse)
    );
  } else {
    throw new Error("Warehouse not found");
  }
};
