import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
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
