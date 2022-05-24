import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "phaserController",
  initialState: {
    colision: false,
    enemies: false,
    showButtons: false,
    playerPos: { x: 0, y: 0 },
    teste: false,
    id: 0,
  },
  reducers: {
    changeColision(state, { payload }) {
      return { ...state, colision: payload };
    },
    changeEnemies(state, { payload }) {
      return { ...state, enemies: payload };
    },
    changePlayerPos(state, { payload }) {
      return { ...state, playerPos: payload };
    },
    changeCodeButtons(state, { payload }) {
      ///TODO - Passar isso para o componente de highlighter
      return { ...state, showButtons: payload };
    },
    changeId(state, { payload }) {
      return { ...state, id: payload };
    },
  },
});

export const {
  changeColision,
  changeEnemies,
  changePlayerPos,
  changeCodeButtons,
  changeId,
} = slice.actions;

export const selectPhaser = (state) => state.phaserController;

export default slice.reducer;