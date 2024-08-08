import { useSelector } from "react-redux";
/* eslint-disable react/prop-types */
const ListadoEventos = ({ eventos, titulo }) => {
  const categorias = useSelector((state) => state.eventos.categorias);
  return (
    <div>
      <h4>{titulo}</h4>
      <ul>
        {eventos &&
          categorias &&
          eventos.map((evento) => {
            const categoria = categorias.find(
              (cat) => cat.id === evento.idCategoria
            );
            return (
              <li key={evento.id}>
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
