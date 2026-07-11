import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header>
      <nav className="navbar">

        <div className="logo">
          CampusCore
        </div>

        <ul>

          <li><Link to="/">Home</Link></li>

          <li><a href="#about">About</a></li>

          <li><a href="#features">Features</a></li>

          <li><a href="#events">Events</a></li>

          <li><a href="#contact">Contact</a></li>

          <li>
            <Link to="/login" className="login-btn">
              Login
            </Link>
          </li>

          <li>
            <Link to="/signup" className="signup-btn">
              Sign Up
            </Link>
          </li>

        </ul>

      </nav>
    </header>
  );
}

export default Navbar;