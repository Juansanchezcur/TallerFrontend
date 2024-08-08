import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  eventos: [],
  categorias: [],
};

export const eventosSlice = createSlice({
  name: "eventos",
  initialState,
  reducers: {
    setEventos: (state, action) => {
      state.eventos = action.payload;
    },

    agregarEvento: (state, action) => {
      state.eventos.push(action.payload);
    },
    eliminarEvento: (state, action) => {
      const index = state.eventos.findIndex(
        (evento) => evento.id === action.payload
      );
      if (index !== -1) {
        state.eventos = [
          ...state.eventos.slice(0, index),
          ...state.eventos.slice(index + 1),
        ];
      }
    },
    setCategorias: (state, action) => {
      state.categorias = action.payload;
    },
  },
});

export const { setEventos, agregarEvento, eliminarEvento, setCategorias } =
  eventosSlice.actions;
export default eventosSlice.reducer;
