import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { useNotification } from "../../context/notificationContext";
import { useEffect } from "react";

const ProtectedRoute = ({ redirectTo = "/login" }) => {
  const { isLoading, isAuthenticated, authStatus } = useAuth();

  const addNotification = useNotification();

  useEffect(() => {
    if (authStatus === "unknown") {
      addNotification(
        "error",
        "خطایی از سمت سرور رخ داده. ابتدا اینترنت خود را بررسی کنید",
      );
    }
  }, [authStatus]);

  if (isLoading) {
    return <p>loading...</p>;
  }

  if (authStatus === "unknown") {
    return <Outlet />;
  }

  if (isAuthenticated) {
    return <Outlet />;
  }

  return <Navigate to={redirectTo} />;
};

export default ProtectedRoute;
