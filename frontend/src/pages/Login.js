import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";  
import "../styles/Login.css";

function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({ identifier: "", password: "" });

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);  

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else if (data.message && data.user) {
        setSuccess(data.message);

        login(data.user, data.token);

        setTimeout(() => {
          navigate("/profile");
        }, 1000);
      }
    } catch (err) {
      setError("Unable to connect to the server. Please try again later.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Login</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="identifier"
            placeholder="Enter Email or Username"
            className="login-input"
            value={formData.identifier}
            onChange={handleChange}
            required
          />
          <div className="password-wrapper">
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="login-input password-input"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="button" className="toggle-password-btn" onClick={togglePasswordVisibility}>
              {passwordVisible ? "Hide" : "Show"}
            </button>
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>
        {error && <div className="form-error">{error}</div>}
        {success && <div className="form-success">{success}</div>}
        <p className="login-footer">
          New to our service? <Link to="/signup"><u>Sign Up Here</u></Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
