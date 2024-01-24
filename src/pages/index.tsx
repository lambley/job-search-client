import React from "react";
import { Container } from "react-bootstrap";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="mx-auto text-center" style={{ width: 700 }}>
        <h1 className="text-3xl">Job Search App Home Page</h1>
        <p className="mx-auto">Some text here</p>
      </div>
    </div>
  );
}
