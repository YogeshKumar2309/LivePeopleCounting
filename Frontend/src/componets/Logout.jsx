import React from "react";

const Logout = ({ onLogout }) => {
  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        alert("Logged out successfully!");
        if (onLogout) onLogout(); // logout state update
      } else {
        alert("Logout failed!");
      }
    } catch (err) {
      console.error("Logout Error:", err);
      alert("An error occurred while logging out.");
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <button
        onClick={handleLogout}
        className="btn btn-danger fw-bold"
        style={{ padding: "10px 20px", borderRadius: "5px" }}
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
