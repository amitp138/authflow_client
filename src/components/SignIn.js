// SignIn.js
import React, { useEffect } from "react";
import "./SignIn.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const SignIn = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  useEffect(() => {
    console.log("Is authenticated:", isAuthenticated);
    if (isAuthenticated) {
      console.log("Redirecting to /auth/user");
      navigate("/auth/user");
    }
  }, [isAuthenticated, navigate]);
  return (
    <div className="container">
      <form>
        <h1>Sign In</h1>

        <Link to="/signin/emailauth" className="email-button">
          Email/username
        </Link>

        <Link to="/signin/otpauth" className="otp-button">
          Login with OTP
        </Link>

        <button
          type="button"
          className="social-button"
          onClick={() => loginWithRedirect()}
        >
          Auth0
        </button>
      </form>
    </div>
  );
};

export default SignIn;
