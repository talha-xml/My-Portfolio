import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; 
import "./Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);  
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">PORTFOLIO</Link>
      </div>

      <div className={`navbar-links ${isOpen ? "open" : ""}`}>
        <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
        <Link to="/about" onClick={() => setIsOpen(false)}>About</Link>
        <Link to="/skills" onClick={() => setIsOpen(false)}>Skills</Link>
        <Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link>

        {user ? (
          <>
            <span className="nav-separator">|</span>
            <Link to="/profile" onClick={() => setIsOpen(false)}>Profile</Link>
          </>
        ) : (
          <>
            <span className="nav-separator">|</span>
            <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
          </>
        )}
      </div>
      <div className={`hamburger ${isOpen ? "active" : ""}`} onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </nav>
  );
}
export default Navbar;
