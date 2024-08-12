import Grafica from "./Grafica";
import Info from "./Info";
import { useSelector } from "react-redux";
import {
  selectCantidadPorCategoria,
  selectComidasUltimaSemana,
  selectTiempoRestanteBiberon,
} from "../selectores";

const Analisis = () => {
  const cantidadesPorCategoria = useSelector(selectCantidadPorCategoria);
  const comidasUltimaSemana = useSelector(selectComidasUltimaSemana);
  const tiempoRestanteBiberon = useSelector(selectTiempoRestanteBiberon);
  return (
    <div>
      <h3>Analisis</h3>
      <Grafica
        labels={cantidadesPorCategoria.map((item) => item.tipo)}
        data={cantidadesPorCategoria.map((item) => item.cantidad)}
        titulo="Cantidad de eventos por categoría"
        item="Eventos"
      />
      <Grafica
        labels={comidasUltimaSemana.map((item) => item.dia)}
        data={comidasUltimaSemana.map((item) => item.cantidad)}
        titulo="Comidas de la última semana"
        item="Comidas"
      />
      <Info {...tiempoRestanteBiberon} />
    </div>
  );
};

export default Analisis;
