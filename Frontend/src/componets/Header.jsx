import styles from "./Header.module.css";
import Logout from "./Logout";
import { Link, NavLink } from "react-router-dom";

const Header = ({ isLoggedIn, isAdmin, onLogout }) => {
  return (
    <div className={styles.myContainer}>
      <nav
        className="navbar navbar-expand-lg"
        style={{
          width: "100vw",
          background: "linear-gradient(90deg, #667eea, #764ba2)",
          padding: "1rem 2rem",
        }}
      >
        <div className="container-fluid">
          <Link to="/" className="navbar-brand fw-bold fs-3 text-white">
            Y-Desserts
          </Link>
          <button
            className="navbar-toggler bg-light"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-between"
            id="navbarNav"
          >
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              {/* Public Menu */}
              {!isAdmin && (
                <>
                  <li className="nav-item">
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        `nav-link fw-semibold ${
                          isActive ? "active text-warning" : "text-white"
                        }`
                      }
                    >
                      Home
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink
                      to="/product"
                      className={({ isActive }) =>
                        `nav-link fw-semibold ${
                          isActive ? "active text-warning" : "text-white"
                        }`
                      }
                    >
                      Product
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink
                      to="/about"
                      className={({ isActive }) =>
                        `nav-link fw-semibold ${
                          isActive ? "active text-warning" : "text-white"
                        }`
                      }
                    >
                      About
                    </NavLink>
                  </li>
                </>
              )}

              {/* Admin-only Menu */}
              {isAdmin && (
                <>
                  <li className="nav-item">
                    <NavLink
                      to="/admin"
                      className={({ isActive }) =>
                        `nav-link fw-semibold ${
                          isActive ? "active text-warning" : "text-white"
                        }`
                      }
                    >
                      Admin Home
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink
                      to="/admin/edit-product"
                      className={({ isActive }) =>
                        `nav-link fw-semibold ${
                          isActive ? "active text-warning" : "text-white"
                        }`
                      }
                    >
                      Edit Product
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink
                      to="/admin/analyse"
                      className={({ isActive }) =>
                        `nav-link fw-semibold ${
                          isActive ? "active text-warning" : "text-white"
                        }`
                      }
                    >
                      Analyse
                    </NavLink>
                  </li>
                </>
              )}
            </ul>

            {/* Right side buttons */}
            <div className="d-flex">
              {isLoggedIn ? (
                <Logout onLogout={onLogout} />
              ) : (
                <>
                  <Link to="/login">
                    <button
                      type="button"
                      className="btn btn-outline-light me-2"
                    >
                      Login
                    </button>
                  </Link>
                  <Link to="/signup">
                    <button
                      type="button"
                      className="btn btn-warning fw-bold"
                    >
                      Sign-up
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
