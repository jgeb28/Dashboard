import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const isAuthenticated = localStorage.getItem("userId");

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}
