import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "../Pages/LoginPage";
import RegisterPage from "../Pages/RegisterPage";
import HomePage from "../Pages/HomePage.jsx";
import BrowesResourcePage from "../Pages/BrowesResourcePage";
import ResourceDetailsPage from "../Pages/ResourceDetailsPage";
export default function UnAuthRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/browse" element={<BrowesResourcePage />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
      <Route path="/resources/:id" element={<ResourceDetailsPage />} />
    </Routes>
  );
}
