import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <li className="nav-item">
          <Link href="/" className="nav-link">
            Home
          </Link>
          <Link href="/jobs" className="nav-link">
            Jobs
          </Link>
        </li>
      </nav>
    </>
  );
};

export default Navbar;
