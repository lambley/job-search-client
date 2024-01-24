import React from "react";
import Link from "next/link";
import { Navbar, Nav } from "react-bootstrap";

const CustomNavbar = () => {
  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      className="border-bottom border-white pb-3"
    >
      <div className="m-3">
        <Link href="/" passHref>
          <Navbar.Brand className="p-3">Home</Navbar.Brand>
        </Link>
        <Link href="/jobs" passHref className="p-3">
          Jobs
        </Link>
      </div>
    </Navbar>
  );
};

export default CustomNavbar;
