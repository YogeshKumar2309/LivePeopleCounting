import { useEffect, useState } from "react";

const AdminPanel = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      fetch("/api/arduino/all", {
        credentials: "include", // session cookie bhejega yeh
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Unauthorized or Server Error");
          }
          return res.json();
        })
        .then((resData) => {
          if (resData.success && Array.isArray(resData.data)) {
            setData(resData.data);
          } else {
            setData([]);
          }
        })
        .catch((err) => {
          console.error("Fetch Error:", err);
          setData([]);
        });
    };

    fetchData();
    const interval = setInterval(fetchData, 5000); // refresh every 5 sec
    return () => clearInterval(interval);
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "N/A";

    const day = date.toLocaleString("en-IN", { day: "2-digit", timeZone: "Asia/Kolkata" });
    const month = date.toLocaleString("en-IN", { month: "short", timeZone: "Asia/Kolkata" });
    const year = date.toLocaleString("en-IN", { year: "numeric", timeZone: "Asia/Kolkata" });
    const time = date.toLocaleString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    });

    return `${day}-${month}-${year} | ${time}`;
  };

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
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={item._id || index}>
                <td>{index + 1}</td>
                <td>{item.people}</td>
                <td>{formatDate(item.createdAt)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
