import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { getSession } from "../Services/TokenRepository";
import { getUser } from "../Services/UserRepository";
import { PATHNAMES } from "../Services/RouteService";

export const ProtectedRoute = () => {
  const { token, userId } = getSession();
  const navigate = useNavigate();

  useEffect(() => {
    getUser(userId).catch(() => navigate(PATHNAMES.LOGIN));
  }, [userId, navigate]);

  return token ? <Outlet /> : <Navigate to={PATHNAMES.LOGIN} replace />;
};
