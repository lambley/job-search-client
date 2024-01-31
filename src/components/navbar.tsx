import React from "react";
import Link from "next/link";
import { Navbar, Nav } from "react-bootstrap";

const CustomNavbar = () => {
  return (
    <div className="title-bar">
      <div className="title-bar-text">
        <Link href="/" passHref style={{ color: "white", padding: "8px" }}>
          Home
        </Link>
        <Link href="/jobs" passHref style={{ color: "white", padding: "8px"  }}>
          Jobs
        </Link>
      </div>
      <div className="title-bar-controls">
        <button aria-label="Minimize"></button>
        <button aria-label="Maximize"></button>
        <button aria-label="Close"></button>
      </div>
    </div>
  );
};

export default CustomNavbar;
