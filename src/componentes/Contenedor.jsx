import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Contenedor = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Contenedor;
