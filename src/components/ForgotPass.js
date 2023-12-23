import React, { useState } from "react";
import "./ForgotPass.css";
import {Link} from "react-router-dom"
const ForgotPass = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const validateEmail = (inputEmail) => {
    if (!inputEmail || !inputEmail.includes("@")) {
      setError("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    // Show error if email is not properly formatted and not empty
    if (newEmail && !newEmail.includes("@")) {
      setError("Please enter a valid email address");
    } else {
      setError(null);
    }
  };

  const handleResetPasswordClick = async () => {
    try {
      setLoading(true);

      // Validate email before making the request
      if (!validateEmail(email)) {
        return;
      }

      // Make a POST request to your backend to handle password reset
      const response = await fetch(
        process.env.REACT_APP_FORGOT_PASSWORD_RESET_URI,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ em:email }),
        }
      );

      if (response.ok) {
        // Password reset request successful
        setSuccess(true);
        
      } else {
        // Handle error cases
        setError("Password reset request failed");
      }
    } catch (error) {
      console.error("Error making password reset request:", error);
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-pass-container">
      <form className="forgot_pass_form">
        <h2 className="forgot-pass-heading">Forgot Password</h2>

        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          className="forgot-pass-input"
          placeholder="Enter your email address"
        />

        <button
          onClick={handleResetPasswordClick}
          className="forgot-pass-button"
          disabled={loading || !!error}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>

        {error && <p className="error-message">{error}</p>}
        {success && (
          <p className="success-message">
            Password reset request successful. Check your email for instructions.
            <Link to="/">back to home </Link>
          </p>
        )}
      </form>
    </div>
  );
};

export default ForgotPass;
