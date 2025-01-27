import { create } from 'zustand';

import { User } from 'api/users/types';

import { getStorageItem } from 'utils/storage';

interface State {
  isLogged: boolean;
  setIsLogged: (isLogged: boolean) => void;

  user: User | null;
  setUser: (user: User | null) => void;
}

const useAuthStore = create<State>((set) => ({
  isLogged: getStorageItem('token') ? true : false,
  setIsLogged: (isLogged: boolean) => set({ isLogged }),

  user: null,
  setUser: (user: User | null) => {
    set({ user });
  }
}));

export { useAuthStore };
