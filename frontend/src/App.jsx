import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import ResetPagePassword from "./pages/ResetPagePassword";
import ForgetPasswordPage from "./pages/ForgetPasswordPage";
import AddClientPage from "./pages/homepages/AddClientPage";
import AddProjectPage from "./pages/homepages/AddProjectPage";
import AddMemberPage from "./pages/homepages/AddMemberPage";
import ProtectedRoute from "./context/ProtectedRoute.jsx"

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* Protected Routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/emailverification"
          element={
            <ProtectedRoute>
              <EmailVerificationPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reset-password"
          element={
            <ProtectedRoute>
              <ResetPagePassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="/forget-password"
          element={
            <ProtectedRoute>
              <ForgetPasswordPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-client"
          element={
            <ProtectedRoute>
              <AddClientPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-project"
          element={
            <ProtectedRoute>
              <AddProjectPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-member"
          element={
            <ProtectedRoute>
              <AddMemberPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
