import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "../Components/nav-bar/nav-bar";
import { deleteSession, getSession } from "../services/token-repository";
import { PATHNAMES } from "../services/route-service";

const Layout: React.FC = () => {
  const { user } = getSession();
  const navigate = useNavigate();
  const onLogout = () => {
    deleteSession();
    navigate(PATHNAMES.LOGIN);
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
