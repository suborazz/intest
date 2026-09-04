import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ISidebarStoreStore {
  isOpen: boolean;
  setIsOpen: () => void;
}

export const useSidebarStore = create(
  persist<ISidebarStoreStore>(
    (set, get) => ({
      isOpen: false,
      setIsOpen: () => {
        set({ isOpen: !get().isOpen });
      },
    }),
    {
      name: "sidebarOpen",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
