import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const ActivityContext = createContext();

export const ActivityProvider = ({ children }) => {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isActive, setIsActive] = useState(true);
  const [showWarning, setShowWarning] = useState(false);
  const [countdown, setCountdown] = useState(10); 

  useEffect(() => {
    if (!user) return;

    let inactivityTimer;
    let countdownTimer;

    const resetTimers = () => {
      setIsActive(true);
      setShowWarning(false);
      setCountdown(10);

      clearTimeout(inactivityTimer);
      clearInterval(countdownTimer);

      inactivityTimer = setTimeout(() => {
        setShowWarning(true);

        countdownTimer = setInterval(() => {
  setCountdown((prev) => {
    if (prev <= 1) {
      clearInterval(countdownTimer);
      setShowWarning(false);
      logout();
      navigate("/login");
      return 0;
    }
    return prev - 1;
  });
}, 1000);

      }, 90000);
    };

    const events = ["mousemove", "keydown", "scroll", "touchstart"];
    events.forEach((event) => window.addEventListener(event, resetTimers));

    resetTimers(); 

    return () => {
      clearTimeout(inactivityTimer);
      clearInterval(countdownTimer);
      events.forEach((event) => window.removeEventListener(event, resetTimers));
    };
  }, [logout, navigate, user]);

  return (
    <ActivityContext.Provider value={{ isActive, showWarning, countdown }}>
      {children}

      {showWarning && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.5)", 
            backdropFilter: "blur(2px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: "#fffae6",
              border: "1px solid #f59e0b",
              padding: "20px 28px",
              borderRadius: "14px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
              fontWeight: "600",
              textAlign: "center",
              minWidth: "280px",
            }}
          >
            You have been inactive!<br />
            Logging out in {countdown} second{countdown !== 1 ? "s" : ""}.
          </div>
        </div>
      )}
    </ActivityContext.Provider>
  );
};
export const useActivity = () => useContext(ActivityContext);
