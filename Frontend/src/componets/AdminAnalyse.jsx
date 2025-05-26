import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminAnalyse = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthAndFetch = async () => {
      try {
        // 1. Check admin auth
        const authRes = await fetch("http://localhost:3000/api/auth/check", {
          credentials: "include",
        });

        if (authRes.status === 401) {
          navigate("/login"); // unauthorized redirect
          return;
        }

        // 2. If authorized, fetch Arduino data
        const fetchData = async () => {
          const res = await fetch("http://localhost:3000/api/arduino/all", {
            method: "GET",
            credentials: "include",
          });

          if (!res.ok) {
            throw new Error("Unauthorized or Server Error");
          }

          const json = await res.json();
          setData(json.data); // FIXED: access json.data
        };

        // Initial fetch call
        await fetchData();

        // Interval for auto-refresh every 5s
        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);

      } catch (err) {
        console.error("Fetch error:", err.message);
      }
    };

    checkAuthAndFetch();
  }, [navigate]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Admin Panel - Arduino Data</h2>
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>People Count</th>
            <th>Date & Time</th>
          </tr>
        </thead>
        <tbody>
          {data?.length > 0 ? (
            data.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.people}</td>
                <td>{new Date(item.createdAt).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">No data available</td>
            </tr>
          )}
        </tbody>
      </table>

      <button
  onClick={async () => {
    const res = await fetch("/api/arduino/", {
      method: "GET",
      credentials: "include", // session ke liye important hai
    });
    const json = await res.json();
    if (json.success) {
      alert("Data saved successfully!");
    } else {
      alert(json.msg || "Something went wrong");
    }
  }}
  className="btn btn-primary"
>
  Save Arduino Data
</button>

    </div>
  );
};

export default AdminAnalyse;
