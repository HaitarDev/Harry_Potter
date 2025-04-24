import { Link, useLocation } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites";

const Navbar = () => {
  const location = useLocation();
  const { favorites } = useFavorites();

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          <img src="/logo1.png" alt="Harry Potter World Logo" />
          <span>Harry Potter World</span>
        </Link>

        <div className="navbar-links">
          <Link
            to="/"
            className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
          >
            Home
          </Link>
          <Link
            to="/characters"
            className={`nav-link ${
              location.pathname.includes("/characters") ? "active" : ""
            }`}
          >
            Characters
          </Link>
          <Link
            to="/favorites"
            className={`nav-link ${
              location.pathname === "/favorites" ? "active" : ""
            }`}
            style={{ position: "relative" }}
          >
            Favorites
            {favorites.length > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-8px",
                  right: "-12px",
                  backgroundColor: "var(--wizard-gold)",
                  color: "var(--wizard-dark)",
                  borderRadius: "50%",
                  width: "20px",
                  height: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.75rem",
                  fontWeight: "bold",
                  transition: "all 0.3s ease",
                  animation:
                    favorites.length === 1 ? "popIn 0.3s ease" : undefined,
                }}
              >
                {favorites.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
