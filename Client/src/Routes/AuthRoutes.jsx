import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import ChatPage from "../Pages/ChatPage";
import UserProfile from "../Pages/UserProfile";
import DirectMessagePage from "../Pages/DirectMessagePage.jsx";
import GroupChatPage from "../Pages/GroupChatPage.jsx";
import { useAuth } from "../Hooks/useAuth.jsx";
import BrowesResourcePage from "../Pages/BrowesResourcePage";
import ResourceDetailsPage from "../Pages/ResourceDetailsPage";
import RoomsPage from "@/Pages/RoomsPage.jsx";
import { CreateRoomPage } from "@/Pages/CreateRoomPage.jsx";
import AboutUs from "../Pages/AboutUs";
import RequestPage from "../Pages/RequestPage";
export default function AuthRoutes() {
  const { user } = useAuth();
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/rooms" element={<RoomsPage />} />
      <Route
        path="/dm/:otherUserId"
        element={<DirectMessagePage currentUser={user} />}
      />
      <Route path="/group/:id" element={<GroupChatPage currentUser={user} />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/browse" element={<BrowesResourcePage />} />
      <Route path="/add-room" element={<CreateRoomPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
      <Route path="/resources/:id" element={<ResourceDetailsPage />} />
      <Route path="/requestPage" element={<RequestPage />} />
      <Route path="/about" element={<AboutUs />} />
    </Routes>
  );
}
