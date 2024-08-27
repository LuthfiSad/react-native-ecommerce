// useUser.ts
import {create} from 'zustand';

interface UserState {
  name: string;
  bankBalance: number;
  favoriteCount: number;
  isLoggedIn: boolean;
  login: (name: string, bankBalance: number) => void;
  logout: () => void;
}

export const useUser = create<UserState>(set => ({
  name: '',
  bankBalance: 0,
  favoriteCount: 4,
  isLoggedIn: false,
  login: (name, bankBalance) => set({name, bankBalance, isLoggedIn: true}),
  logout: () => set({name: '', bankBalance: 0, isLoggedIn: false}),
}));
