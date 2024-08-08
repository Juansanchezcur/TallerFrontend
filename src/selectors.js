import { createSelector } from "reselect";

const selectEventos = (state) => state.eventos.eventos;

export const selectEventosDeHoy = createSelector([selectEventos], (eventos) => {
  const hoy = new Date().toISOString().split("T")[0];
  return eventos.filter((evento) => evento.fecha.split("T")[0] === hoy);
});

export const selectEventosAnteriores = createSelector(
  [selectEventos],
  (eventos) => {
    const hoy = new Date().toISOString().split("T")[0];
    return eventos.filter((evento) => evento.fecha.split("T")[0] < hoy);
  }
);
