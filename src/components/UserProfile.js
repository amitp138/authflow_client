import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./UserProfile.css";
import { useLocation } from "react-router-dom";

const UserProfile = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth0();
  const location = useLocation();

  // Provide default values for email and username or handle the null case
  const { email = null, username = null } = location.state || {};

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="user-profile-container">
      {isAuthenticated && user.picture && (
        <img className="user-picture" src={user.picture} alt={user.name} />
      )}
      <div className="user-info">
        <h1 className="welcome-message">Welcome, to Authflow!</h1>

        {isAuthenticated && <h2 className="user-name">{user.name}</h2>}

        {email != null && <p className="user-email">Email: {email}</p>}

        {username != null && (
          <p className="user-username">Username: {username}</p>
        )}

        {isAuthenticated && user.sub && (
          <p className="user-sub">ID: {user.sub}</p>
        )}
        {isAuthenticated && user.given_name && user.family_name && (
          <p className="user-full-name">
            {user.given_name} {user.family_name}
          </p>
        )}
        {isAuthenticated && user.nickname && (
          <p className="user-nickname">Nickname: {user.nickname}</p>
        )}
      </div>
      {isAuthenticated && (
        <button
          className="logout-button"
          onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }
        >
          Log Out
        </button>
      )}
    </div>
  );
};

export default UserProfile;
