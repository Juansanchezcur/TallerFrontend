import { useSelector } from "react-redux";
import { useId } from "react";
/* eslint-disable react/prop-types */
const ListadoEventos = ({ eventos, titulo }) => {
  const categorias = useSelector((state) => state.eventos.categorias);
  const idUnico = useId();

  return (
    <div>
      <h4>{titulo}</h4>
      <ul>
        {eventos &&
          categorias &&
          eventos.map((evento, index) => {
            const categoria = categorias.find(
              (cat) => cat.id === evento.idCategoria
            );
            return (
              <li key={evento.id || `${idUnico}-${index}`}>
                <strong>Evento: </strong>
                {categoria ? categoria.tipo : "Categoría desconocida"}
                <strong>Fecha y Hora: </strong>
                {evento.fecha}
              </li>
            );
          })}
      </ul>
    </div>
  );
};
export default ListadoEventos;
