import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Registro = () => {
  const [departamentos, setDepartamentos] = useState([]);
  const [ciudades, setCiudades] = useState([]);

  const usuarioRef = useRef(null);
  const passwordRef = useRef(null);
  const departamentoRef = useRef(null);
  const ciudadRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      navigate("/dashboard");
    } else {
      fetch("https://babytracker.develotion.com/departamentos.php")
        .then((response) => response.json())
        .then((data) => setDepartamentos(data.departamentos));
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const traerCiudades = (e) => {
    const departamentoSeleccionado = e.target.value;
    setCiudades([]);
    ciudadRef.current.value = "-1";

    fetch(
      `https://babytracker.develotion.com/ciudades.php?idDepartamento=${departamentoSeleccionado}`
    )
      .then((response) => response.json())
      .then((data) => setCiudades(data.ciudades));
  };

  const registrarUsuario = () => {
    const usuario = usuarioRef.current.value;
    const password = passwordRef.current.value;
    const idDepartamento = parseInt(departamentoRef.current.value);
    const idCiudad = parseInt(ciudadRef.current.value);

    if (!usuario || !password || idDepartamento === -1 || idCiudad === -1) {
      toast.error("Por favor, complete todos los datos.");
      return;
    }

    const data = {
      usuario: usuario,
      password: password,
      idDepartamento: idDepartamento,
      idCiudad: idCiudad,
    };

    fetch("https://babytracker.develotion.com/usuarios.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.codigo === 200) {
          toast.success("Usuario registrado exitosamente");
          localStorage.setItem("token", result.apiKey);
          localStorage.setItem("idUsuario", result.id);
          navigate("/dashboard");
        } else {
          toast.error(`${result.mensaje}`);
        }
        passwordRef.current.value = "";
      });
  };

  return (
    <section className="Container">
      <h2>Registro en la Aplicación</h2>
      <div>
        <label>
          <i className="fa-solid fa-user"></i>
          <input type="text" placeholder="Usuario" ref={usuarioRef} />
        </label>
        <label>
          <i className="fa-solid fa-lock"></i>
          <input
            type="password"
            placeholder="Contraseña"
            ref={passwordRef}
            required
          />
        </label>
        <label>
          <i className="fa-solid fa-location-pin"></i>
          <select ref={departamentoRef} required onChange={traerCiudades}>
            <option value="-1">Seleccione un departamento</option>
            {departamentos.map((departamento) => (
              <option key={departamento.id} value={departamento.id}>
                {departamento.nombre}
              </option>
            ))}
          </select>
        </label>
        <label>
          <i className="fa-solid fa-city"></i>
          <select ref={ciudadRef} required>
            <option value="-1">Seleccione una ciudad</option>
            {ciudades.map((ciudad) => (
              <option key={ciudad.id} value={ciudad.id}>
                {ciudad.nombre}
              </option>
            ))}
          </select>
        </label>
      </div>
      <button type="button" onClick={registrarUsuario}>
        Registrar
      </button>
    </section>
  );
};

export default Registro;
