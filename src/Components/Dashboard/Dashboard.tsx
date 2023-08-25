import { Link } from "react-router-dom";
import { ROLES } from "../../Models/Role.d";
import { getSession } from "../../Services/TokenRepository";
import "./Dashboard.css";
import { PATHNAMES } from "../../Services/RouteService";

const Dashboard: React.FC = () => {
  const { user } = getSession();

  return (
    <ul>
      {user.role === ROLES.admin && (
        <>
          <li>
            <Link to={PATHNAMES.PRODUCTS}>Administrar productos</Link>
          </li>
          <li>
            <Link to={PATHNAMES.USERS}>Administrar usuarios</Link>
          </li>
        </>
      )}
      {(user.role === ROLES.admin || user.role === ROLES.waiter) && (
        <>
          <li>
            <Link to={PATHNAMES.ORDERS + "/" + PATHNAMES.CREATE}>
              Crear pedidos
            </Link>
          </li>
        </>
      )}
      <li>
        <Link to={PATHNAMES.ORDERS + "/" + PATHNAMES.PENDING}>
          Ver pedidos por preparar
        </Link>
      </li>
      <li>
        <Link to={PATHNAMES.ORDERS + "/" + PATHNAMES.DELIVERING}>
          Ver pedidos por entregar
        </Link>
      </li>
      <li>
        <Link to={PATHNAMES.ORDERS + "/" + PATHNAMES.DELIVERED}>
          Ver pedidos por entregados
        </Link>
      </li>
    </ul>
  );
};
export default Dashboard;
