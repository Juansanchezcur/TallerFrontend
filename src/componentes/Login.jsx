import { useState } from "react";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      navigate("/dashboard");
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hacerLogin = () => {
    const data = {
      usuario: usuario,
      password: password,
    };

    fetch("https://babytracker.develotion.com/login.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.codigo === 200) {
          toast.success(`Bienvenido/a ${data.usuario}.`);
          localStorage.setItem("token", result.apiKey);
          localStorage.setItem("idUsuario", result.id);
        } else {
          toast.error(`Credenciales incorrectas`);
        }
        setUsuario("");
        setPassword("");
      });
  };

  const cambioUsuario = (e) => {
    setUsuario(e.target.value);
  };

  const cambioPassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <section className="Container">
      <h2>Iniciar Sesión</h2>
      <div>
        <label>
          <i className="fa-solid fa-user"></i>
          <input
            type="text"
            value={usuario}
            onChange={cambioUsuario}
            placeholder="Usuario"
          />
        </label>
        <label>
          <i className="fa-solid fa-lock" />
          <input
            type="password"
            value={password}
            onChange={cambioPassword}
            placeholder="Contraseña"
          />
        </label>
      </div>
      <button onClick={hacerLogin} disabled={!usuario || !password}>
        Ingresar
      </button>
    </section>
  );
};

export default Login;
