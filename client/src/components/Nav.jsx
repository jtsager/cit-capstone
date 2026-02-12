import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav style={{ display: "flex", gap: "12px", margin: "12px 0" }}>
      <Link to="/">List</Link>
      <Link to="/new">New</Link>
      <Link to="/details/1">Details (example)</Link>
      <Link to="/details/2">Details for Item 2</Link>
      <Link to="/about">About</Link>
    </nav>
  );
}

export default Nav;
