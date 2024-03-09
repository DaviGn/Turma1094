import { create } from 'zustand';

interface ProductStoreProps {
    count: number;
    increment(): void;
}

export const useProductStore = create<ProductStoreProps>((set) => ({
    count: 0,
    increment: () => set((prev) => ({ count: prev.count + 1 }))
}));
