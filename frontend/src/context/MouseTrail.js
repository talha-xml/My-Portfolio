import { useEffect } from "react";

const MouseTrail = () => {
  useEffect(() => {
    const handleMouseMove = (e) => {
      const trail = document.createElement("div");

      Object.assign(trail.style, {
        position: "fixed",
        left: `${e.clientX}px`,
        top: `${e.clientY}px`,
        width: "15px",
        height: "15px",
        background: "rgba(33, 161, 241, 0.4)",
        borderRadius: "50%",
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        transition: "transform 0.1s ease, opacity 0.3s ease",
        zIndex: 9999,
      });

      document.body.appendChild(trail);

      setTimeout(() => {
        trail.style.opacity = "0";
      }, 50);

      setTimeout(() => {
        trail.remove();
      }, 400);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return null; 
};

export default MouseTrail;

