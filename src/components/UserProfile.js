import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./UserProfile.css";
import { useLocation } from "react-router-dom";

const UserProfile = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth0();
  const location = useLocation();

  useEffect(() => {
    // Extract code and state parameters from the query string
    const searchParams = new URLSearchParams(location.search);
    const codeFromQuery = searchParams.get("code");
    const stateFromQuery = searchParams.get("state");
  
    if (codeFromQuery && stateFromQuery) {
      console.log("Received code:", codeFromQuery);
      console.log("Received state:", stateFromQuery);
  
      //  Exchange the code for tokens with Auth0
      const exchangeCodeForTokens = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_AUTH0_TOKEN_ENDPOINT}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              grant_type: 'authorization_code',
              client_id: `${process.env.REACT_APP_CLIENT_ID}`,
              client_secret: `${process.env.REACT_APP_CLIENT_SECRET}`,
              code: codeFromQuery,  // Change this line
              redirect_uri: `${process.env.REACT_APP_REDIRECT_URI_AFTER_LOGIN}`,
            }),
            
          });
  
          const data = await response.json();
  
          // Handle the received tokens (access token and ID token)
          console.log('Received tokens:', data);
          // You might want to store tokens in your state or a global state management solution
        } catch (error) {
          console.error('Error exchanging code for tokens:', error);
        }
      };
      // Call the function to exchange code for tokens
      exchangeCodeForTokens();
    }
  }, [location.search]);
  

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
