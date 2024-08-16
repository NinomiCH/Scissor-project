// src/components/Header.tsx
"use client";

import React from "react";
import ExampleComponent from "./ExampleComponent"; 
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <h1>Scissor</h1>
      <nav className="nav">
        <a href="/" className="nav-link">
          Home
        </a>
        <a href="/about" className="nav-link">
          About
        </a>
        <a href="/contact" className="nav-link">
          Contact Us
        </a>
      </nav>
      <ExampleComponent /> {/* Use ExampleComponent here */}
    </header>
  );
};

export default Header;
