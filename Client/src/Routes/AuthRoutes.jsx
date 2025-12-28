import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import ChatPage from "../Pages/ChatPage";
import UserProfile from "../Pages/UserProfile";
import BrowesResourcePage from "../Pages/BrowesResourcePage";
import ResourceDetailsPage from "../Pages/ResourceDetailsPage";


export default function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/browse" element={<BrowesResourcePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
      <Route path="/resources/:id" element={<ResourceDetailsPage />} />

    </Routes>
  );
}
