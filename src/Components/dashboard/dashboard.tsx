import { Link } from "react-router-dom";
import { getSession } from "../../services/token-repository";
import { PATHNAMES } from "../../services/route-service";

const Dashboard: React.FC = () => {
  const { user } = getSession();

  return (
    <ul>
      {user.role === "admin" && (
        <>
          <li>
            <Link to={PATHNAMES.PRODUCTS}>Administrar productos</Link>
          </li>
          <li>
            <Link to={PATHNAMES.USERS}>Administrar usuarios</Link>
          </li>
        </>
      )}
      {(user.role === "admin" || user.role === "waiter") && (
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
