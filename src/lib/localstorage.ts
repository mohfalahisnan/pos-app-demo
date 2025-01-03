export const PRODUCT_STORAGE_KEY = 'products';
export const WAREHOUSE_STORAGE_KEY = 'warehouses';
export const SELECTED_WAREHOUSE_KEY = 'selectedWarehouse';
export const SELECTED_STORE_KEY = 'selectedStore';

export const getSelectedStore = (): string | null => {
  if (typeof window === 'undefined' || !window.localStorage) return null;
  const data = localStorage.getItem(SELECTED_STORE_KEY);
  return data ? JSON.parse(data) : null;
};

export const setSelectedStore = (storeId: string): void => {
  if (typeof window === 'undefined' || !window.localStorage) return;
  localStorage.setItem(SELECTED_STORE_KEY, JSON.stringify(storeId));
};
