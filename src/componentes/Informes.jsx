import Informe from "./Informe";
import { selectEventosDeHoyPorCategoriaOrdenados } from "../selectores";
import { useSelector } from "react-redux";

const Informes = () => {
  const biberonesDeHoyOrdenados = useSelector(
    selectEventosDeHoyPorCategoriaOrdenados("Biberón")
  );
  const panalesDeHoyOrdenados = useSelector(
    selectEventosDeHoyPorCategoriaOrdenados("Pañal")
  );
  const calcularHorasYMinutosDesdeUltimo = (ultimoEvento) => {
    if (!ultimoEvento) return null;
    const ahora = new Date();
    const tiempoEvento = new Date(ultimoEvento.fecha);
    const diferenciaMilisegundos = ahora - tiempoEvento;
    const diferenciaHoras = Math.floor(
      diferenciaMilisegundos / (1000 * 60 * 60)
    );
    const diferenciaMinutos = Math.floor(
      (diferenciaMilisegundos % (1000 * 60 * 60)) / (1000 * 60)
    );

    return { horas: diferenciaHoras, minutos: diferenciaMinutos };
  };

  const horasDesdeUltimoBiberon = calcularHorasYMinutosDesdeUltimo(
    biberonesDeHoyOrdenados[0]
  );
  const horasDesdeUltimoPanal = calcularHorasYMinutosDesdeUltimo(
    panalesDeHoyOrdenados[0]
  );
  return (
    <div>
      <h3>Informes</h3>
      <Informe
        dato="Biberones"
        dia={biberonesDeHoyOrdenados.length}
        horas={(horasDesdeUltimoBiberon && horasDesdeUltimoBiberon.horas) || 0}
        minutos={
          (horasDesdeUltimoBiberon && horasDesdeUltimoBiberon.minutos) || 0
        }
      />
      <Informe
        dato="Pañales"
        dia={panalesDeHoyOrdenados.length}
        horas={(horasDesdeUltimoPanal && horasDesdeUltimoPanal.horas) || 0}
        minutos={(horasDesdeUltimoPanal && horasDesdeUltimoPanal.minutos) || 0}
      />
    </div>
  );
};

export default Informes;
