import { createSelector } from "reselect";

const selectEventos = (state) => state.eventos.eventos;
const selectCategorias = (state) => state.eventos.categorias;

//4.2.1. Listado del día
export const selectEventosDeHoy = createSelector([selectEventos], (eventos) => {
  const hoy = new Date().toISOString().split("T")[0];
  return eventos.filter((evento) => evento.fecha.split("T")[0] >= hoy);
});

//4.2.2. Listado de días anteriores
export const selectEventosAnteriores = createSelector(
  [selectEventos],
  (eventos) => {
    const hoy = new Date().toISOString().split("T")[0];
    return eventos.filter((evento) => evento.fecha.split("T")[0] < hoy);
  }
);

//4.3.1 y 4.3.2 Informe de eventos:
export const selectEventosDeHoyPorCategoriaOrdenados = (tipoCategoria) =>
  createSelector([selectEventos, selectCategorias], (eventos, categorias) => {
    const hoy = new Date().toISOString().split("T")[0];
    const categoria = categorias.find((cat) => cat.tipo === tipoCategoria);
    if (!categoria) {
      return [];
    }

    return eventos
      .filter(
        (evento) =>
          evento.idCategoria === categoria.id &&
          evento.fecha.split("T")[0] >= hoy
      )
      .sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
  });

//4.4.1. Gráfico de cantidades por categoría:
export const selectCantidadPorCategoria = createSelector(
  [selectEventos, selectCategorias],
  (eventos, categorias) => {
    const cantidadesPorCategoria = categorias.map((categoria) => {
      const cantidad = eventos.filter(
        (evento) => evento.idCategoria === categoria.id
      ).length;

      return {
        tipo: categoria.tipo,
        cantidad: cantidad,
      };
    });

    return cantidadesPorCategoria.filter((categoria) => categoria.cantidad > 0);
  }
);

//4.4.2. Gráfico de comidas de la última semana
export const selectComidasUltimaSemana = createSelector(
  [selectEventos, selectCategorias],
  (eventos, categorias) => {
    const hoy = new Date();
    const semana = [];

    for (let i = 6; i >= 0; i--) {
      const dia = new Date(hoy);
      dia.setDate(hoy.getDate() - i);
      semana.push(dia.toISOString().split("T")[0]);
    }

    const categoriaComida = categorias.find((cat) => cat.tipo === "Comida");
    if (!categoriaComida) {
      return semana.map((dia) => ({ dia, cantidad: 0 }));
    }
    const comidasPorDia = semana.map((dia) => ({
      dia,
      cantidad: eventos.filter(
        (evento) =>
          evento.fecha.split(" ")[0] === dia &&
          evento.idCategoria === categoriaComida.id
      ).length,
    }));

    return comidasPorDia;
  }
);

//4.4.3. Tiempo restante para el próximo biberón
export const selectUltimoBiberon = createSelector(
  [selectEventos, selectCategorias],
  (eventos, categorias) => {
    const categoriaBiberon = categorias.find((cat) => cat.tipo === "Biberón");
    if (!categoriaBiberon) return null;

    const biberones = eventos.filter(
      (evento) => evento.idCategoria === categoriaBiberon.id
    );
    if (biberones.length === 0) return null;

    return biberones.reduce((ultimo, actual) =>
      new Date(actual.fecha) > new Date(ultimo.fecha) ? actual : ultimo
    );
  }
);

export const selectTiempoRestanteBiberon = createSelector(
  [selectUltimoBiberon],
  (ultimoBiberon) => {
    if (!ultimoBiberon) return { minutos: null };

    const ahora = new Date();
    const fechaUltimoBiberon = new Date(ultimoBiberon.fecha);
    const proximoBiberon = new Date(
      fechaUltimoBiberon.getTime() + 4 * 60 * 60 * 1000
    );
    const tiempoRestanteMs = proximoBiberon - ahora;
    const minutos = Math.floor(tiempoRestanteMs / (1000 * 60));

    return {
      minutos: minutos > 0 ? minutos : Math.abs(minutos),
      excedido: minutos <= 0,
    };
  }
);
