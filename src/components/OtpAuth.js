import React, { useState } from "react";
import "./OtpAuth.css";
import { useNavigate } from "react-router-dom";

const OtpAuth = () => {
  const navigate = useNavigate();

  const [number, setNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [message, setMessage] = useState("");

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    const isNumber = /^[0-9]*$/.test(inputValue);

    if (isNumber || inputValue === "") {
      // Slice the input to allow only 10 digits
      const truncatedInput = inputValue.slice(0, 10);
      setNumber(truncatedInput);
      setMessage(""); // Clear any previous error message
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if the entered number is valid (10 digits)
    if (number.length !== 10) {
      setMessage("Please enter a valid 10-digit mobile number.");
      return;
    }

    try {
      if (isOtpSent) {
        // Verify OTP
        const response = await fetch(process.env.REACT_APP_OTP_AUTH_VERIFY_URI, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ to: number, enteredOtp: otp }),
        });

        const result = await response.json();
        if (result.success) {
          setMessage("OTP verified successfully!");
          navigate("/auth/user");
        } else {
          setMessage("Failed to verify OTP. Please try again.");
        }
      } else {
        // Send OTP
        const response = await fetch(process.env.REACT_APP_OTP_AUTH_SENT_OTP_URI, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ to: number }),
        });

        const result = await response.json();
        if (result.success) {
          setIsOtpSent(true);
          setMessage("OTP sent successfully!");
          
        } else {
          setMessage("Failed to send OTP. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="otp-container">
      <div className="otp-form">
        <h1 className="otp-heading">
          {isOtpSent ? "Verify OTP" : "OTP Login"}
        </h1>
        <input
          type="tel"
          value={number}
          onChange={handleInputChange}
          placeholder="Enter mobile number"
          className="number-input"
        />
        {isOtpSent && (
          <input
            type="tel"
            value={otp}
            onChange={(event) => setOtp(event.target.value)}
            placeholder="Enter OTP"
            className="otp-input"
          />
        )}
        <button
          type="button"
          className="otpsendandverifybutton"
          onClick={handleSubmit}
        >
          {isOtpSent ? "Verify OTP" : "Send OTP"}
        </button>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default OtpAuth;
