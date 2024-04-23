// store/favoritesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Favorite {
  id: number;
  title: string;
  url: string;
}

interface FavoritesState {
  favorites: Favorite[];
}

const initialState: FavoritesState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Favorite>) => {
      state.favorites.push(action.payload);
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.favorites = state.favorites.filter(favorite => favorite.id !== action.payload);
    },
    removeAllFavorites: (state) => {
      state.favorites = [];
    },
  },
});

export const { addFavorite, removeFavorite, removeAllFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
