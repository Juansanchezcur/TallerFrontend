import { useEffect } from "react";
import AgregarEvento from "./AgregarEvento";
import { useNavigate } from "react-router-dom";
import Listados from "./Listados";
import Informes from "./Informes";
import Analisis from "./Analisis";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="Dashboard">
      <h2>DashBoard</h2>
      <div className="DashboardContent">
        <AgregarEvento />
        <h2>Estadísticas</h2>
        <div className="DashBoardDiv">
          <Listados />
          <Informes />
          <Analisis />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
