import ListadoEventos from "./ListadoEventos";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setEventos } from "../features/eventosSlice";
import { selectEventosAnteriores, selectEventosDeHoy } from "../selectors";

const Listados = () => {
  const dispatch = useDispatch();

  const eventosDeHoy = useSelector(selectEventosDeHoy);
  const eventosAnteriores = useSelector(selectEventosAnteriores);
  useEffect(
    () => {
      const idUsuario = localStorage.getItem("idUsuario");
      fetch(
        `https://babytracker.develotion.com/eventos.php?idUsuario=${idUsuario}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            apikey: localStorage.getItem("token"),
            iduser: parseInt(idUsuario),
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          dispatch(setEventos(data.eventos));
        });
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <div>
      <h3>Listados</h3>
      <div>
        <ListadoEventos eventos={eventosDeHoy} titulo="Eventos de hoy: " />
        <ListadoEventos
          eventos={eventosAnteriores}
          titulo="Eventos anteriores: "
        />
      </div>
    </div>
  );
};

export default Listados;
