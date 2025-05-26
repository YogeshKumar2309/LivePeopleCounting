import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      setLoading(false);

      if (data.success) {
        alert("🎉 Logged in successfully!");

        // update login state
        onLoginSuccess(data.isAdmin);

        // Navigate to correct page
        if (data.isAdmin) {
          navigate("/admin"); // Admin home page
        } else {
          navigate("/"); // User home page
        }
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      setLoading(false);
      console.error("Error:", err);
      alert("Something went wrong!");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(90deg, #6dd5fa, #2980b9, #f4d03f)",
      }}
    >
      <form
        onSubmit={handleLogin}
        className="p-5 rounded shadow bg-white"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h3 className="text-center mb-4 text-primary fw-bold">Login</h3>

        <div className="mb-3">
          <label className="form-label fw-semibold">Email Address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="btn w-100 fw-bold"
          style={{
            background: "linear-gradient(90deg, #6dd5fa, #2980b9)",
            border: "none",
            color: "white",
          }}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-muted text-center mt-3 small">
          Don't have an account? Sign up from the header!
        </p>
      </form>
    </div>
  );
};

export default Login;
