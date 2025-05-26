import { useState } from "react";
import { useNavigate } from "react-router-dom"; //  Import this

const SignUp = ({ onSignupSuccess }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // 🔁 Create navigate instance

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
      credentials: "include",
    });

    const data = await res.json();
    if (res.ok) {
      alert("Account created & logged in successfully! 🎉");
      onSignupSuccess(data.user);
      navigate("/"); // 🔁 Redirect to Home Page after signup
    } else {
      alert(data.msg || "Signup failed");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(90deg, #ffecd2, #fcb69f, #ff6f61)",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="p-5 rounded shadow bg-white"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h3 className="text-center mb-4 text-danger fw-bold">Sign Up</h3>

        <div className="mb-3">
          <label className="form-label fw-semibold">Full Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

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
            background: "linear-gradient(90deg, #ff6f61, #fcb69f)",
            border: "none",
            color: "white",
          }}
        >
          Sign Up
        </button>

        <p className="text-muted text-center mt-3 small">
          Already have an account? Login from the header!
        </p>
      </form>
    </div>
  );
};

export default SignUp;
