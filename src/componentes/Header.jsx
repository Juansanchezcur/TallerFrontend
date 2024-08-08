import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const desloguear = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("idUsuario");
    navigate("/login");
  };
  return (
    <header>
      <div>
        <img src="public\img\ORT.png" alt="Logo" />
      </div>
      <nav>
        <ul>
          {localStorage.getItem("token") ? (
            <>
              <li>
                <NavLink to="/dashboard">DashBoard</NavLink>
              </li>
              <li>
                <a onClick={desloguear}>Cerrar sesión</a>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/login">Ingresar</NavLink>
              </li>
              <li>
                <NavLink to="/registro">Registrarse</NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
