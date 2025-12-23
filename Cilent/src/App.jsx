import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/HomePage";
import LoginRegPage from "./Pages/LoginRegPage";
import LoginFormComponent from "./Components/LoginFormComponent";
import RegistarionComponent from "./Components/RegistarionComponent";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<LoginRegPage />}>
        <Route path="login" element={<LoginFormComponent />} />
        <Route path="register" element={<RegistarionComponent />} />
        <Route path="*" element={<Navigate to="/auth/login" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
