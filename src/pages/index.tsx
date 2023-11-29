import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <h1 className="text-3xl font-bold text-center py-4">Job Search App Home Page</h1>
      <Link href='/jobs'>
        <h3>Link to Jobs Page</h3>
      </Link>
    </div>
  );
}
