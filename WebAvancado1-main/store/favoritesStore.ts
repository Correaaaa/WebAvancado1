import create from 'zustand';

interface Favorite {
  id: number;
  title: string;
  url: string;
}

interface FavoritesState {
  favorites: Favorite[];
  addFavorite: (favorite: Favorite) => void;
  removeFavorite: (id: number) => void;
  updateFavorite: (id: number, updatedFavorite: Favorite) => void;
  removeAllFavorites: () => void;
}

const useFavoritesStore = create<FavoritesState>((set) => ({
  favorites: [],
  addFavorite: (favorite) =>
    set((state) => ({ favorites: [...state.favorites, favorite] })),
  removeFavorite: (id) =>
    set((state) => ({
      favorites: state.favorites.filter((fav) => fav.id !== id),
    })),
  updateFavorite: (id, updatedFavorite) =>
    set((state) => ({
      favorites: state.favorites.map((fav) =>
        fav.id === id ? updatedFavorite : fav
      ),
    })),
  removeAllFavorites: () => set({ favorites: [] }),
}));

export default useFavoritesStore;
