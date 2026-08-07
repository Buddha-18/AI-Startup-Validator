import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        AI Startup Validator
      </div>

      <ul>
        <li>Home</li>
        <li>Features</li>
        <li>Pricing</li>
        <li>About</li>
      </ul>

      <button>Get Started</button>
    </nav>
  );
}

export default Navbar;