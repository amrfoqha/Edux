import { Navbar } from "./Layouts/Navbar.jsx";
import { useAuth } from "./Hooks/useAuth.jsx";
import AuthRoutes from "./Routes/AuthRoutes.jsx";
import UnAuthRoutes from "./Routes/UnAuthRoutes.jsx";

function App() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar isLoggedIn={isAuthenticated} />
      {isAuthenticated ? <AuthRoutes /> : <UnAuthRoutes />}
    </>
  );
}

export default App;
