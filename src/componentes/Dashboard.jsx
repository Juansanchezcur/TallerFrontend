import { useEffect } from "react";
import AgregarEvento from "./AgregarEvento";
import { useNavigate } from "react-router-dom";
import Listados from "./Listados";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h2>DashBoard</h2>
      <AgregarEvento />
      <Listados />
    </>
  );
};

export default Dashboard;
