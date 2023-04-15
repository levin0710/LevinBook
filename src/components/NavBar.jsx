import React from "react";
import { Link, Outlet } from "react-router-dom";

import './NavBar.css';

const NavBar = () => {
  return (
    <div className="top-navbar">
      <div className="top-navbar-logo">LevinBook</div>
      <div className="search-bar">
        <input type="text" placeholder="Search" />
      </div>
      <div className="top-navbar-links">
        <Link className="link" to="/">
          Home
        </Link>
        <Link className="link" to="/new">
          Create Post
        </Link>
      </div>

      <div className="app-container">
        <Outlet />
      </div>
    </div>
  );
};

export default NavBar;
