import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Signup.css";

function Signup() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fullName = e.target.fullName.value.trim();
    const username = e.target.username.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();
    const confirmPassword = e.target.confirmPassword.value.trim();

    if (!fullName || !username || !email || !password || !confirmPassword) {
      setError("⚠️ Please fill in all fields.");
      setSuccess("");
      return;
    }

    if (password !== confirmPassword) {
      setError("❌ Passwords do not match.");
      setSuccess("");
      return;
    }

    setError("");
    setSuccess("");

    try {
      const res = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: fullName,
          username,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "⚠️ Something went wrong.");
        setSuccess("");
      } else {
        setSuccess(data.message || "✅ Signup successful!");
        setError("");
        e.target.reset();
      }
    } catch (err) {
      setError("⚠️ Server not reachable.");
      setSuccess("");
      console.error(err);
    }
  };

  return (
    <div className="signup-page">
      {/* Sticky Note on the LEFT */}
      <div className="signup-guidelines">
        <h3>📌 Guidelines</h3>
        <ul>
          <li><b>Full Name:</b> Only letters, spaces, and dot (.) allowed</li>
          <li><b>Username:</b> Must be lowercase, not all numbers, only letters, digits, <code>.</code> and <code>_</code></li>
          <li><b>Password:</b> 8–32 characters, must include:
            <ul>
              <li>✅ At least 1 uppercase letter</li>
              <li>✅ At least 1 number</li>
              <li>✅ At least 1 special character</li>
            </ul>
          </li>
        </ul>
      </div>

      {/* Signup Container */}
      <div className="signup-container">
        <h1>Sign Up</h1>

        {/* Info Card */}
        <div className="signup-info-card">
          No need to create an account! This is only for Fullstack practice purposes. But, if you want to see additional of my work, by creating an account, you will be redirected to your Profile.
        </div>

        {/* Error / Success Messages */}
        {error && <div className="signup-error">{error}</div>}
        {success && <div className="signup-success">{success}</div>}

        <form className="signup-form" onSubmit={handleSubmit}>
          <input type="text" name="fullName" placeholder="Full Name" className="signup-input" />
          <input type="text" name="username" placeholder="Username" className="signup-input" />
          <input type="email" name="email" placeholder="Email" className="signup-input" />

          {/* Password Field */}
          <div className="password-wrapper">
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="signup-input password-input"
            />
            <button type="button" className="toggle-password-btn" onClick={togglePasswordVisibility}>
              {passwordVisible ? "Hide" : "Show"}
            </button>
          </div>

          {/* Confirm Password Field */}
          <div className="password-wrapper">
            <input
              type={confirmPasswordVisible ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              className="signup-input password-input"
            />
            <button type="button" className="toggle-password-btn" onClick={toggleConfirmPasswordVisibility}>
              {confirmPasswordVisible ? "Hide" : "Show"}
            </button>
          </div>

          <button className="signup-btn" type="submit">Create Account</button>
        </form>

        <p className="signup-login-text">
          Already a member?{" "}
          <Link to="/login" className="signup-login-link"><u>Login Here</u></Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;

