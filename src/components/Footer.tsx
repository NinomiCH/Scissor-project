// src/components/Footer.tsx
"use client";

import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <p>&copy; 2024 Scissor. All rights reserved.</p>
        <div className="footer-buttons">
          <button>Privacy Policy</button>
          <button>Terms of Service</button>
          <button>Contact Us</button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
