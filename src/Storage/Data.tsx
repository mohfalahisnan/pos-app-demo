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

// Mendapatkan warehouse yang dipilih
export const getSelectedWarehouse = (): string | null => {
  if (typeof window === "undefined" || !window.localStorage) return null;
  const data = localStorage.getItem(SELECTED_WAREHOUSE_KEY);
  return data ? JSON.parse(data) : null;
};

export const setSelectedWarehouse = (warehouseId: string): void => {
  if (typeof window === "undefined" || !window.localStorage) return;
  localStorage.setItem(SELECTED_WAREHOUSE_KEY, JSON.stringify(warehouseId));
};
