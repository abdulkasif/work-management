import React from "react";
import { Routes, Route } from "react-router-dom"; 
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage"; 
import SignUpPage from "./pages/SignUpPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import ResetPagePassword from "./pages/ResetPagePassword"; 
import ForgetPasswordPage from "./pages/ForgetPasswordPage"; 

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/emailverification" element={<EmailVerificationPage />} />
        <Route path="/reset-password" element={<ResetPagePassword />} />
        <Route path="/forget-password" element={<ForgetPasswordPage />} /> 
      </Routes>
    </div>
  );
}

export default App;
