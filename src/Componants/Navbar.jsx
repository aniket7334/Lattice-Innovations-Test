import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="navbar" role="banner">
      <div className="brand-wrapper">
        <span className="brand-icon" aria-hidden="true">☀️</span>
        <h1>Weather Dashboard</h1>
      </div>

      <nav className="nav-links" role="navigation" aria-label="Main">
        <Link to="/" className="nav-link">
          🌤 Current
        </Link>
        <Link to="/history" className="nav-link">
          📊 History
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;