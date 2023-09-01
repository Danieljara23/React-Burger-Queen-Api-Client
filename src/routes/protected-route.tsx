import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { getSession } from "../services/token-repository";
import { getUser } from "../services/user-repository";
import { PATHNAMES } from "../services/route-service";
import { useEffect } from "react";

export const ProtectedRoute = () => {
  const { token, userId } = getSession();
  const navigate = useNavigate();
  const validateUser = async () => {
    try {
      await getUser(userId);
    } catch (error) {
      navigate(PATHNAMES.LOGIN);
    }
  };

  useEffect(() => {
    validateUser();
  });

  return token ? <Outlet /> : <Navigate to={PATHNAMES.LOGIN} replace />;
};
