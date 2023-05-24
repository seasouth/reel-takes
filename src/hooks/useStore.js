import { create } from 'zustand'

export const useStore = create((set) => ({
  showSearchResults: false,
  setShowSearchResults: (showThem) => set(() => ({ showSearchResults: showThem })),
  searchValue: "",
  setSearchValue: (searchString) => set(() => ({ searchValue: searchString })),
}))