import React, { useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/Profile.css";
import "../styles/Home.css";

function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const [persistedUser, setPersistedUser] = useState(
    () => JSON.parse(localStorage.getItem("user")) || null
  );

  const [stockData, setStockData] = useState({
    symbol: "AAPL",
    price: "--",
    change: "--",
    changePercent: "--",
  });

  const [currencyData, setCurrencyData] = useState({
    base: "USD",
    rates: { EUR: "--", GBP: "--", PKR: "--" },
  });

  const [status, setStatus] = useState("Active");
  const idleTimer = useRef(null);

  // ✅ Idle status tracking
  useEffect(() => {
    const resetTimer = () => {
      setStatus("Active");
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => {
        setStatus("Idle");
      }, 25000);
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    resetTimer();

    return () => {
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, []);

  // ✅ Fetch stock + currency
  useEffect(() => {
    Promise.all([
      fetch("http://127.0.0.1:5000/api/stock").then((res) => res.json()),
      fetch("http://127.0.0.1:5000/api/currency").then((res) => res.json()),
    ])
      .then(([stockRes, currencyRes]) => {
        if (stockRes) setStockData(stockRes);

        if (currencyRes && currencyRes.rates) {
          setCurrencyData({
            base: currencyRes.base,
            rates: {
              EUR: currencyRes.rates.EUR,
              GBP: currencyRes.rates.GBP,
              PKR: currencyRes.rates.PKR,
            },
          });
        }
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  // ✅ Keep persisted user in sync with context
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      setPersistedUser(user);
    }
  }, [user]);

  const activeUser = user || persistedUser;
  if (!activeUser) return <p>Loading...</p>;

  const firstName = activeUser.full_name?.split(" ")[0] || "";
  const formattedFirstName =
    firstName.charAt(0).toUpperCase() + firstName.slice(1);

  const handleLogout = () => {
    logout();
    localStorage.removeItem("user"); // ✅ clear persistence
    navigate("/login");
  };

  return (
    <div className="profile-page">
      <div className="profile-info">
        <h1>Welcome, {formattedFirstName} 👋</h1>
        <p><strong>Name:</strong> {activeUser.full_name}</p>
        <p><strong>Registered Email:</strong> {activeUser.email}</p>

        {/* ================= USER ACTIVITY STATUS ================= */}
        <table className="user-table" style={{ marginTop: "20px" }}>
          <thead>
            <tr>
              <th>Username</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{activeUser.username}</td>
              <td
                style={{
                  color: status === "Active" ? "green" : "goldenrod",
                  fontWeight: "bold",
                }}
              >
                {status}
              </td>
            </tr>
          </tbody>
        </table>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* ================= DASHBOARDS ================= */}
      <div className="dashboard-container">
        <div className="dashboard-section">
          <h2>Stock Market</h2>
          <div className="card">
            <p><strong>Symbol:</strong> {stockData.symbol || "--"}</p>
            <p><strong>Price:</strong> {stockData.price || "--"}</p>
            <p>
              <strong>Change:</strong>{" "}
              {stockData.change && stockData.changePercent
                ? `${stockData.change} (${stockData.changePercent})`
                : "--"}
            </p>
          </div>
        </div>

        <div className="dashboard-section">
          <h2>Currency Rates (Base: {currencyData.base || "--"})</h2>
          <div className="card">
            <p><strong>EUR:</strong> {currencyData.rates.EUR || "--"}</p>
            <p><strong>GBP:</strong> {currencyData.rates.GBP || "--"}</p>
            <p><strong>PKR:</strong> {currencyData.rates.PKR || "--"}</p>
          </div>
        </div>
      </div>

      {/* ================= PROFILE NOTE ================= */}
      <div className="profile-note">
        <p>
          Thank you for creating an account on my portfolio.  
          This functionality is added to provide you with a personalized experience 
          and to showcase how authentication and user management can be implemented 
          in a real-world application.  
        </p>
      </div>
    </div>
  );
}

export default Profile;

