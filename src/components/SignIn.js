// SignIn.js
import React from "react";
import "./SignIn.css";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const SignIn = () => {
  const { loginWithRedirect } = useAuth0();

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
          onClick={() =>
            loginWithRedirect({
              redirectUri: `${process.env.REACT_APP_REDIRECT_URI_AFTER_LOGIN}`,
            })
          }
        >
          Auth0
        </button>
      </form>
    </div>
  );
};

export default SignIn;
