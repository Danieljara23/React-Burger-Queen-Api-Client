import { Outlet } from "react-router-dom";
import NavBar from "../Components/nav-bar/nav-bar";
import { getSession } from "../services/token-repository";

const Layout: React.FC = () => {
  const { user } = getSession();

  const onLogout = () => {
    console.log("Logout");
  };

  return (
    <>
      <header>
        <span>LabBurger</span>
        <NavBar user={user} onLogout={onLogout} />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>Created by Laboratoria</footer>
    </>
  );
};

export default Layout;
