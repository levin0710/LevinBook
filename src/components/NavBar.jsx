import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { supabase } from '../client'

import './NavBar.css';

const NavBar = ({data, onSearch}) => {
  

  const searchItems = searchValue => {
    if (searchValue !== "") {
      const filteredData = data.filter(item =>
        item.title.toLowerCase().includes(searchValue.toLowerCase())
      );
      onSearch(filteredData); // add this line
    } else {
      onSearch(data); // add this line
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.log("Error signing out:", error.message);
  };
  

  return (
    <div>
      <div className="top-navbar">
        <div className="top-navbar-logo">LevinBook</div>
        <div className="search-bar">
          <input type="text" placeholder="Search..." 
          onChange={(inputString) => searchItems(inputString.target.value)}/>
        </div>
        <div className="top-navbar-links">
          <Link className="link" to="/">
            Home
          </Link>
          <Link className="link" to="/new">
            Create Post
          </Link>
          <button className="link" onClick={signOut}>Sign Out</button>
        </div>

      </div>
      <div className="app-container">
        <Outlet/>
      </div>
    </div>  
  );
};

export default NavBar;
