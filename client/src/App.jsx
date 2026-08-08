import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Validate from "./pages/Validate";
import Login from "./pages/Login";
import Register from "./pages/Register";

import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";

import "./index.css";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {/* Background */}
      <div className="bg-gradient"></div>

      <div className="bg-blob blob1"></div>
      <div className="bg-blob blob2"></div>
      <div className="bg-blob blob3"></div>

      <Routes>

        {/* Landing Page */}
        <Route
          path="/"
          element={<Home />}
        />


        {/* Startup Validator */}
        <Route
          path="/validate"
          element={
            <ProtectedRoute>
              <Validate />
            </ProtectedRoute>
          }
        />


        {/* Login */}
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/validate" replace />
            ) : (
              <Login />
            )
          }
        />


        {/* Register */}
        <Route
          path="/register"
          element={
            isAuthenticated ? (
              <Navigate to="/validate" replace />
            ) : (
              <Register />
            )
          }
        />


        {/* Unknown Route */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </>
  );
}

export default App;