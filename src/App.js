import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import EditPass from "./components/EditPass";
import EmailAuth from "./components/EmailAuth";
import UserProfile from "./components/UserProfile";
import OtpAuth from "./components/OtpAuth";
import ForgotPass from "./components/ForgotPass";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signin/emailauth" element={<EmailAuth />} />
          <Route path="/signin/otpauth" element={<OtpAuth />} />
          <Route path="/forgotpass" element={<ForgotPass />} />
          <Route path="/reset-password/:_id/:token" element={<EditPass />} />
          <Route path="/auth/user" element={<UserProfile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
