import HomePage from "./Pages/HomePage";
import LoginRegPage from "./Pages/LoginRegPage";
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./Components/Header.jsx";
import ChatPage from "./Pages/ChatPage.jsx";
import ProfilePage from "./Pages/UserProfile.jsx";
import Footer from "./Components/Footer.jsx";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<LoginRegPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
