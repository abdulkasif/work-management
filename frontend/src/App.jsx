import { Route, Routes } from "react-router-dom"
import SignUpPage from "./pages/SignUpPage"
import LoginPage from "./pages/LoginPage"
import EmailVerificationPage from "./pages/EmailVerificationPage"
import ResetPasswordPage from "./pages/ResetPagePassword"
import ForgotPasswordPage from "./pages/ForgetPasswordPage"
import Home from "./pages/Home"
function App() {
   return (

     <div className="min-h-screen bg-gradient-to-br 
     from-gray-900
     via-green-900 
     to-emerald-900 
     ">
     
     
    <Routes>

      <Route path="/home" element={<Home/>}/>
      <Route path="/signup" element={<SignUpPage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/emailverfication" element={<EmailVerificationPage/>}/>
      <Route path="/reset-password" element={<ResetPasswordPage/>}/>
      <Route path="/forget-password" element={<ForgotPasswordPage/>}/>



    </Routes>
    </div>
  )
}

export default App
