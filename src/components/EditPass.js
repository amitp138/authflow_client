// EditPass.js
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EditPass.css";

const EditPass = () => {
  const { _id, token } = useParams();
  const Navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [passwordValidation, setPasswordValidation] = useState({
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });
  const [passwordMatch, setPasswordMatch] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

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

  const handlePassreset = async (e) => {
    e.preventDefault();

    // Validation logic
    const invalidFields = [];

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
    try {
      const Isresetted = await fetch(
        process.env.REACT_APP_UPDATE_PASSWORD_URI,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pass: formData.password,
            id: _id,
            authtoken: token,
          }),
        }
      );
      const result = await Isresetted.json();
      if (result.success) {
        alert("Password updated successfully");
        Navigate("/");
      } else {
        console.log("Password not updated successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="edit-pass-container">
      <form className="edit-pass-form" onSubmit={handlePassreset}>
        <h1 className="edit-pass-title">Forgot Password </h1>
        <input
          type="password"
          id="newpass"
          name="password"
          className="edit-pass-input"
          onChange={handleInputChange}
          placeholder="Enter your password"
        />
        {renderPasswordSuggestions()}

        <input
          type="password"
          id="confirmpass"
          name="confirmPassword"
          className="edit-pass-input"
          onChange={handleInputChange}
          placeholder="Confirm your password"
        />
        {renderPasswordMatchHint()}
        <button type="submit" className="edit-pass-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditPass;
