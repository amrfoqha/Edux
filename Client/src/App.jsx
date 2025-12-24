import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/HomePage";
import LoginRegPage from "./Pages/LoginRegPage";
import LoginFormComponent from "./Components/LoginFormComponent";
import RegistarionComponent from "./Components/RegistarionComponent";
import Header from "./Components/Header";
import Footer from "./Components/Footer";


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Footer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<LoginRegPage />}>
          <Route path="login" element={<LoginFormComponent />} />
          <Route path="register" element={<RegistarionComponent />} />
          <Route path="*" element={<Navigate to="/auth/login" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
