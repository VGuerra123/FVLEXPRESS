import { create } from 'zustand';

interface UserState {
  userId?: string;
  role?: 'buyer' | 'vendor' | 'admin';
  vendorId?: string;
  setUser: (u: Partial<UserState>) => void;
  logout: () => void;
}
export const useUserStore = create<UserState>((set) => ({
  setUser: (u) => set((s) => ({ ...s, ...u })),
  logout: () => set({ userId: undefined, role: undefined, vendorId: undefined })
}));
