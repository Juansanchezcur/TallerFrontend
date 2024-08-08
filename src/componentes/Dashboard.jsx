import { useEffect } from "react";
import AgregarEvento from "./AgregarEvento";
import { useNavigate } from "react-router-dom";

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
    </>
  );
};

export default Dashboard;
