// CheckAuth.js
import { Navigate, useLocation } from "react-router-dom";

const CheckAuth = ({ isAuthenticated, user, children }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  // If user is not authenticated
  if (!isAuthenticated) {
    // Allow access to public routes and auth routes
    if (
      currentPath === "/" ||
      currentPath === "/products" ||
      currentPath === "/about" ||
      currentPath === "/contact" ||
      currentPath === "/login" ||
      currentPath === "/register"
    ) {
      return children;
    }
    // Redirect to login for protected routes
    return <Navigate to="/login" replace />;
  }

  // If user is authenticated
  if (isAuthenticated && user) {
    const userRole = user.role;

    // Handle login/register redirects for authenticated users
    if (currentPath === "/login" || currentPath === "/register") {
      if (userRole === "admin") {
        return <Navigate to="/admin" replace />;
      } else if (userRole === "user") {
        return <Navigate to="/" replace />;
      }
    }

    // Admin user logic
    if (userRole === "admin") {
      // Admin trying to access root path should go to admin dashboard
      if (currentPath === "/") {
        return <Navigate to="/admin" replace />;
      }

      // Admin accessing user-specific routes should be redirected to unauthorized page
      if (currentPath.startsWith("/user") || currentPath.startsWith("/favorites")) {
        return <Navigate to="/unauth-page" replace />;
      }

      // Allow admin routes
      if (currentPath.startsWith("/admin")) {
        return children;
      }
    }

    // Regular user logic
    if (userRole === "user") {
      // User trying to access admin routes should go to unauthorized page
      if (currentPath.startsWith("/admin")) {
        return <Navigate to="/unauth-page" replace />;
      }

      // Allow user routes
      if (
        currentPath === "/" ||
        currentPath.startsWith("/user") ||
        currentPath.startsWith("/favorites")
      ) {
        return children;
      }
    }

    // Default: allow access to current route
    return children;
  }

  // Fallback: redirect to login
  return <Navigate to="/login" replace />;
};

export default CheckAuth;

