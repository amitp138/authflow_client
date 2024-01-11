import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth0();

  useEffect(() => {
    console.log(isAuthenticated);
    if (isAuthenticated) {
      navigate("/auth/user");
    }
  }, [isAuthenticated, navigate]);

  return (
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
  );
};

export default Home;
