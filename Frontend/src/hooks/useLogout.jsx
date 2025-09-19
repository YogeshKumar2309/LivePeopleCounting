import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";
import toast from "react-hot-toast";

const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      const result = await res.json();
      if (res.ok && result.success) {
        dispatch(logout());
        toast.success("Logout successful");
        navigate("/login"); 
      } else {
        console.error("Logout failed:", result.message);
      }
    } catch (err) {
      console.error("Error during logout:", err);
    }
  };

  return handleLogout;
};

export default useLogout;
