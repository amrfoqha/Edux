import HomePage from "./Pages/HomePage";
import LoginRegPage from "./Pages/LoginRegPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/auth" element={<LoginRegPage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
