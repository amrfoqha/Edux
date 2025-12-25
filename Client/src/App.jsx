import HomePage from "./Pages/HomePage";
import LoginRegPage from "./Pages/LoginRegPage";
import { Routes, Route, Navigate } from "react-router-dom";
import UserProfile from "./Pages/UserProfile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth" element={<LoginRegPage />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
