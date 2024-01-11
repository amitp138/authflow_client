import React from "react";
import "./UserProfile.css";
import { useLocation } from "react-router-dom";

const UserPageAfterOtpAndEmail = () => {
  const location = useLocation();

  // Provide default values for email and username or handle the null case
  const { email = null, username = null } = location.state || {};

  return (
    <div className="user-profile-container">
      <div className="user-info">
        <h1 className="welcome-message">Welcome, to Authflow!</h1>
        {email != null && <p className="user-email">Email: {email}</p>}

        {username != null && (
          <p className="user-username">Username: {username}</p>
        )}
      </div>
    </div>
  );
};

export default UserPageAfterOtpAndEmail;
