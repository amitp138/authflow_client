// SignUp.js

import React, { useState } from "react";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [emailValidation, setEmailValidation] = useState(false);

  const [passwordValidation, setPasswordValidation] = useState({
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });

  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Update email validation
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setEmailValidation(emailRegex.test(value));
    }

    // Update password validation
    if (name === "password") {
      const regexUpperCase = /[A-Z]/;
      const regexLowerCase = /[a-z]/;
      const regexNumber = /[0-9]/;
      const regexSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

      setPasswordValidation({
        hasUpperCase: regexUpperCase.test(value),
        hasLowerCase: regexLowerCase.test(value),
        hasNumber: regexNumber.test(value),
        hasSpecialChar: regexSpecialChar.test(value),
      });
    }

    // Check if confirmPassword matches password
    if (name === "confirmPassword") {
      setPasswordMatch(value === formData.password);
    }
  };

  const renderPasswordSuggestions = () => {
    if (formData.password.trim() === "") {
      return null;
    }
    return (
      <div className="password-hints">
        <p
          className={`password-hint ${
            passwordValidation.hasUpperCase ? "valid" : "invalid"
          }`}
        >
          {passwordValidation.hasUpperCase ? "✓" : "•"} At least one uppercase
          letter
        </p>
        <p
          className={`password-hint ${
            passwordValidation.hasLowerCase ? "valid" : "invalid"
          }`}
        >
          {passwordValidation.hasLowerCase ? "✓" : "•"} At least one lowercase
          letter
        </p>
        <p
          className={`password-hint ${
            passwordValidation.hasNumber ? "valid" : "invalid"
          }`}
        >
          {passwordValidation.hasNumber ? "✓" : "•"} At least one number
        </p>
        <p
          className={`password-hint ${
            passwordValidation.hasSpecialChar ? "valid" : "invalid"
          }`}
        >
          {passwordValidation.hasSpecialChar ? "✓" : "•"} At least one special
          character
        </p>
      </div>
    );
  };

  const renderPasswordMatchHint = () => {
    if (formData.confirmPassword.trim() === "") {
      return null;
    }
    return (
      <p className={`password-hint ${passwordMatch ? "valid" : "invalid"}`}>
        {passwordMatch ? "Passwords match " : "Passwords do not match"}
      </p>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation logic
    const invalidFields = [];

    if (!emailValidation) {
      invalidFields.push("Email");
    }

    if (!passwordMatch) {
      invalidFields.push("Password and Confirm Password");
    }

    if (
      !passwordValidation.hasUpperCase ||
      !passwordValidation.hasLowerCase ||
      !passwordValidation.hasNumber ||
      !passwordValidation.hasSpecialChar
    ) {
      invalidFields.push("Password conditions not met");
    }

    // Add more validation checks as needed

    if (invalidFields.length > 0) {
      alert(`Please fix the following fields: ${invalidFields.join(", ")}`);
      return;
    }

    // Proceed with form submission
    try {
      const response = await fetch(process.env.REACT_APP_SIGNUP_REGISTER_URI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Registration successful, you can handle it accordingly
        console.log("Registration successful");

        // Send email
        try {
          // Use emailjs to send an email
          await emailjs.sendForm(
            process.env.REACT_APP_SERVICE_ID,
            process.env.REACT_APP_WELCOME_TEMPLATE_ID,
            formData,
            process.env.REACT_APP_PUBLIC_KEY
          );

          // Email sent successfully
          console.log("Email sent successfully");
          navigate("/");
        } catch (emailError) {
          // Handle email sending error
          console.error("Error sending email:", emailError);
          alert(
            "An unexpected error occurred while sending the email. Please try again later."
          );
        }
      } else {
        // Handle registration error
        console.error("Registration failed");
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="signup">
      <form onSubmit={handleSubmit}>
        <h1>SignUp</h1>
        <input
          type="text"
          name="username"
          className="signup-input"
          placeholder="UserName"
          onChange={handleInputChange}
          value={formData.username}
        />
        <input
          type="email"
          name="email"
          className={`signup-input ${emailValidation ? "valid" : "invalid"}`}
          placeholder="Email"
          onChange={handleInputChange}
          value={formData.email}
        />
        <input
          type="password"
          name="password"
          className="signup-input"
          placeholder="Password"
          onChange={handleInputChange}
          value={formData.password}
        />
        {renderPasswordSuggestions()}

        <input
          type="password"
          name="confirmPassword"
          className={`signup-input ${passwordMatch ? "valid" : "invalid"}`}
          placeholder="Confirm Password"
          onChange={handleInputChange}
          value={formData.confirmPassword}
        />
        {renderPasswordMatchHint()}
        <button type="submit" className="signup-button">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
