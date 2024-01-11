import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./UserProfile.css";

const UserProfile = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth0();
  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="user-profile-container">
      
      <div className="user-info">
        <h1 className="welcome-message">Welcome, to Authflow!</h1>

        

        {user.email && <p className="user-email">Email: {user.email}</p>}

        {user.username && (
          <p className="user-username">Username: {user.username}</p>
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
