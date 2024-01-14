import React, { useState } from "react";
import "./EmailAuth.css";
import { Link, useNavigate } from "react-router-dom";

const EmailAuth = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [emailValidation, setEmailValidation] = useState({
    isValid: false,
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Update email validation
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValid = emailRegex.test(value);
      setEmailValidation({
        isValid,
        message:
          isValid || value === "" ? "" : "Please enter a valid email address.",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const invalidFields = [];

    if (!emailValidation.isValid) {
      invalidFields.push("Email");
    }

    if (invalidFields.length > 0) {
      alert(`Please fix the following fields: ${invalidFields.join(", ")}`);
      return;
    }
    try {
      const response = await fetch(`${process.env.REACT_APP_EMAIL_AUTH_URI}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Login successful
        console.log("Login successful");
        navigate("/auth/user", {
          state: {
            email: formData.email,
            username: formData.username,
          },
        });
      } else {
        // Handle Login error
        console.error("Login failed");
        alert("Login failed. Please check your credentials and try again.");
      }
    } catch (error) {
      console.error("Error during Login:", error);
      alert("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input
          type="text"
          name="username"
          className="login-input"
          placeholder="Username"
          onChange={handleInputChange}
          value={formData.username}
        />
        <input
          type="email"
          name="email"
          className={`login-input ${
            emailValidation.isValid ? "valid" : "invalid"
          }`}
          placeholder="Email"
          onChange={handleInputChange}
          value={formData.email}
        />
        {formData.email && emailValidation.message && (
          <p className="validation-message">{emailValidation.message}</p>
        )}
        <input
          type="password"
          name="password"
          className="login-input"
          placeholder="Password"
          onChange={handleInputChange}
          value={formData.password}
        />

        <button type="submit" className="login-button">
          Sign In
        </button>
        <Link to="/forgotpass">Forgot password?</Link>
      </form>
    </div>
  );
};

export default EmailAuth;
