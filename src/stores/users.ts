import { create } from 'zustand';

interface UserStoreProps {
    count: number;
    increment(): void;
}

export const useUserStore = create<UserStoreProps>((set) => ({
    count: 0,
    increment: () => set((prev) => ({ count: prev.count + 1 }))
}));
