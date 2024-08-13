import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { agregarEvento, setCategorias } from "../features/eventosSlice";

const AgregarEvento = () => {
  const dispatch = useDispatch();

  const categorias = useSelector((state) => state.eventos.categorias);
  const categoriaRef = useRef(null);
  const fechayHoraRef = useRef(null);
  const detallesRef = useRef(null);

  const ajustarAGMT3 = (fecha) => {
    const nuevaFecha = new Date(fecha);
    nuevaFecha.setHours(nuevaFecha.getHours() - 3);
    return nuevaFecha;
  };

  useEffect(
    () => {
      fetch("https://babytracker.develotion.com/categorias.php", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          apikey: localStorage.getItem("token"),
          iduser: localStorage.getItem("idUsuario"),
        },
      })
        .then((response) => response.json())
        .then((data) => {
          dispatch(setCategorias(data.categorias));
        });
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const agregarNuevoEvento = () => {
    const categoria = parseInt(categoriaRef.current.value);
    let fechayHora = fechayHoraRef.current.value;
    const detalles = detallesRef.current.value || "";

    if (categoria === -1) {
      toast.error("Por favor, elige una categoría.");
      return;
    }

    if (!fechayHora) {
      const ahora = ajustarAGMT3(new Date());
      fechayHora = ahora.toISOString();
    }

    const [fecha, hora] = fechayHora.split("T");
    const [year, month, day] = fecha.split("-");
    const [hour, minute] = hora.split(":");

    const fechaSeleccionada = new Date(year, month - 1, day, hour, minute);
    fechaSeleccionada.setHours(fechaSeleccionada.getHours() - 3);

    const fechaActual = ajustarAGMT3(new Date());

    if (fechaSeleccionada > fechaActual) {
      toast.error("No se pueden registrar eventos futuros.");
      return;
    }

    const data = {
      idCategoria: categoria,
      idUsuario: parseInt(localStorage.getItem("idUsuario")),
      fecha: fechayHora,
      detalle: detalles,
    };

    fetch("https://babytracker.develotion.com/eventos.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: localStorage.getItem("token"),
        iduser: localStorage.getItem("idUsuario"),
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.codigo === 200) {
          data.id = result.idEvento;
          data.fecha = fechaSeleccionada
            .toISOString()
            .replace("T", " ")
            .split(".")[0];
          dispatch(agregarEvento(data));
          toast.success("Evento registrado exitosamente");
          categoriaRef.current.value = "-1";
          fechayHoraRef.current.value = "";
          detallesRef.current.value = "";
        } else {
          toast.error(`${result.mensaje}`);
        }
      });
  };

  return (
    <div className="AgregarEvento">
      <h3>Agregar evento:</h3>
      <label>
        Categoría:
        <select ref={categoriaRef}>
          <option value="-1">Seleccionar categoría</option>
          {categorias &&
            categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.tipo}
              </option>
            ))}
        </select>
      </label>
      <label>
        Fecha y hora:
        <input ref={fechayHoraRef} type="datetime-local" />
      </label>
      <label>
        <textarea ref={detallesRef} placeholder="Detalles opcionales" />
      </label>
      <input type="button" value="Registrar" onClick={agregarNuevoEvento} />
    </div>
  );
};

export default AgregarEvento;
