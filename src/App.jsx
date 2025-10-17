import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login.1";
import Register from "./pages/register";
import Home from "./pages/Home";

function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  return isLoggedIn ? children : <Navigate to="/" />;
}

export default function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  return (
    <Routes>
      {/* If user is logged in, go directly to /home instead of Login */}
      <Route
        path="/"
        element={isLoggedIn ? <Navigate to="/home" /> : <Login />}
      />

      <Route path="/register" element={<Register />} />

      {/* Protected route for Home */}
      <Route
        path="/home"
        element={
         
            <Home />
      
        }
      />
    </Routes>
  );
}
