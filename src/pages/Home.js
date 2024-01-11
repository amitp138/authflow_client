import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth0();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/auth/user");
    } else {
      // Set showContent to true only when authentication status is determined
      setShowContent(true);
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      {isLoading ? (
        // Show loading indicator while checking authentication status
        <div>Loading...</div>
      ) : showContent ? (
        // Show content only when authentication status is determined
        <>
          <header>
            <h1>AuthFlow</h1>
          </header>
          <main>
            <Link to="/signin" className="navigation-link">
              Sign In
            </Link>
            <Link to="/signup" className="navigation-link">
              Sign Up
            </Link>
          </main>
          <footer></footer>
        </>
      ) : null}
    </>
  );
};

export default Home;
