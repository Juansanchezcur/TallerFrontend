import { Provider } from "react-redux";
import "./App.css";
import Contenedor from "./componentes/Contenedor.jsx";
import Login from "./componentes/Login.jsx";
import Registro from "./componentes/Registro.jsx";
import Dashboard from "./componentes/Dashboard.jsx";
import NoEncontrado from "./componentes/NoEncontrado.jsx";
import Lobby from "./componentes/Lobby.jsx";
import { store } from "./store/store.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Contenedor />}>
            <Route path="/" element={<Lobby />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<NoEncontrado />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
