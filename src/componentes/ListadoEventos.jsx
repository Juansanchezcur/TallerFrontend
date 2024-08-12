import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { eliminarEvento } from "../features/eventosSlice";
import { useDispatch } from "react-redux";

/* eslint-disable react/prop-types */
const ListadoEventos = ({ eventos, titulo }) => {
  const categorias = useSelector((state) => state.eventos.categorias);
  const dispatch = useDispatch();

  const borrarEvento = (idEvento) => {
    fetch(
      `https://babytracker.develotion.com/eventos.php?idEvento=${idEvento}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          apikey: localStorage.getItem("token"),
          iduser: localStorage.getItem("idUsuario"),
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.codigo === 200) {
          toast.success("Evento eliminado exitosamente");
          dispatch(eliminarEvento(idEvento));
        } else {
          toast.error("No se pudo eliminar el evento");
        }
      });
  };
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
                <img
                  src={`https://babytracker.develotion.com/imgs/${categoria.imagen}.png`}
                  alt={categoria.tipo}
                />

                <strong>Evento: </strong>
                {categoria ? categoria.tipo : "Categoría desconocida"}
                <strong>Fecha y Hora: </strong>
                {evento.fecha}
                <input
                  type="button"
                  value="Eliminar"
                  onClick={() => borrarEvento(evento.id)}
                />
              </li>
            );
          })}
      </ul>
    </div>
  );
};
export default ListadoEventos;
