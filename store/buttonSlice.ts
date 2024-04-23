// store/buttonSlice.ts
import { createSlice } from '@reduxjs/toolkit';

interface ButtonState {
  buttonText: string;
}

const initialState: ButtonState = {
  buttonText: 'Clique aqui',
};

const buttonSlice = createSlice({
  name: 'button',
  initialState,
  reducers: {
    changeText: (state) => {
      state.buttonText = 'Botão clicado!';
    },
  },
});

export const { changeText } = buttonSlice.actions;
export default buttonSlice.reducer;
