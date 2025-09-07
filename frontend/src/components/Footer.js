// src/components/Footer.js
import React from "react";
import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer-copy">
        &copy; {new Date().getFullYear()} M. Talha Faizan. All rights reserved. MyPortfolio™
      </p>
    </footer>
  );
}

export default Footer;

