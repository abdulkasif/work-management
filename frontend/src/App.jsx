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
import ProtectedRoute from "./context/ProtectedRoute.jsx";
import ShowClientPage from "./pages/detailpages/ShowClientPage.jsx";
import ShowMemberPage from "./pages/detailpages/ShowMemberPage.jsx";
import ShowProjectPage from "./pages/detailpages/ShowProjectPage.jsx";
import MemberHomePage from "./pages/assignpages/MemberHomePage.jsx";

function App() {
  return (
    <div className="min-h-screen bg-gray-900 ">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LoginPage />} />
        
        {/* Protected Routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute allowedDesignations={["Team Lead", "Member", "Manager"]}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-client"
          element={
            <ProtectedRoute allowedDesignations={["Manager"]}>
              <AddClientPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-project"
          element={
            <ProtectedRoute allowedDesignations={["Team Lead", "Manager"]}>
              <AddProjectPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-member"
          element={
            <ProtectedRoute allowedDesignations={["Team Lead", "Manager"]}>
              <AddMemberPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/clients"
          element={
            <ProtectedRoute allowedDesignations={["Manager"]}>
              <ShowClientPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/members"
          element={
            <ProtectedRoute allowedDesignations={["Team Lead", "Manager"]}>
              <ShowMemberPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects"
          element={
            <ProtectedRoute allowedDesignations={["Team Lead", "Manager"]}>
              <ShowProjectPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/members-home"
          element={
            <ProtectedRoute allowedDesignations={["Member"]}>
              <MemberHomePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
