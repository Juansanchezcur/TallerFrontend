import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Lobby() {
  const navigate = useNavigate();

  useEffect(() => {
    const apiKey = localStorage.getItem("token");
    if (apiKey) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return;
}

export default Lobby;
