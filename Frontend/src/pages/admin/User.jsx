const API_BASE = import.meta.env.VITE_API_BASE;
import { useState, useEffect } from "react";
import { Search } from "lucide-react";

const User = () => {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalUserLenght, setTotalUserLenght] = useState(0);
  const usersPerPage = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/admin/getAllUser`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json", // tells server we expect JSON
            Accept: "application/json", // tells server to send JSON
          },
          credentials: "include", //  include cookies/session if needed
        });
        const data = await res.json(); // convert response to JSON
        setUsers(data.users);
        setFiltered(data.users);
        setTotalUserLenght(data.users.length)
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  //  Search filter
  useEffect(() => {
    const result = users.filter(
      (u) =>
        u.fullName.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(result);
    setPage(1); // search change par first page par wapas
  }, [search, users]);

  //  Pagination logic
  const startIndex = (page - 1) * usersPerPage;
  const selectedUsers = filtered.slice(startIndex, startIndex + usersPerPage);
  const totalPages = Math.ceil(filtered.length / usersPerPage);

  return (
    <div className="w-full min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/*  Search Bar */}
        <div className="flex items-center gap-2 rounded-xl px-4 py-2 mb-6 shadow">
          <Search size={18} className="text-stone-400" />
          <input
            type="text"
            placeholder="Search users by name or email..."
            className="bg-transparent outline-none flex-1 text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="text-right px-4 py-5 text-gray-700">Total Users: {totalUserLenght}</div>

        {/* User List */}
        <div className="space-y-3">
          {selectedUsers.length > 0 ? (
            selectedUsers.map((user) => (
              <div
                key={user._id}
                className="flex items-center gap-4  rounded-xl p-3 shadow  transition"
              >
                <img
                  src={user.avatar}
                  alt={user.fullName}
                  className="w-12 h-12 rounded-full object-cover border border-stone-600"
                />
                <div>
                  <h3 className="font-semibold">{user.fullName}</h3>
                  <p className="text-sm text-stone-400">{user.email}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-stone-400 text-center py-10">No users found.</p>
          )}
        </div>

        {/* Pagination */}
        {filtered.length > usersPerPage && (
          <div className="flex justify-center gap-3 mt-8">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2  rounded-lg  disabled:opacity-50 border-1"
            >
              Prev
            </button>
            <span className="text-stone-400">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className="px-4 py-2 rounded-lg disabled:opacity-50 border-1"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default User;
