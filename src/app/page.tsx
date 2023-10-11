import React from "react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <h1 className="text-3xl font-bold text-center py-4">Home Page</h1>

      <div className="flex-1 flex justify-center items-center">
        {/* Left Column */}
        <div className="w-1/2 p-4 m-10 rounded border shadow-md min-h-[20rem]">
          <h2 className="text-2xl">Recent jobs</h2>
          <ul>
            <li>
              <h3 className="text-xl font-semibold">Job 1</h3>
              <p>Job description</p>
            </li>
            <li className="mt-4">
              <h3 className="text-xl font-semibold">Job 2</h3>
              <p>Job description</p>
            </li>
            <li className="mt-4">
              <h3 className="text-xl font-semibold">Job 3</h3>
              <p>Job description</p>
            </li>
          </ul>
        </div>

        {/* Right Column */}
        <div className="w-1/2 p-4 m-10 rounded border shadow-md min-h-[20rem]">
          <h2 className="text-2xl">Hot Keywords</h2>
          <ul>
            <li className="mt-4">Keyword 1</li>
            <li className="mt-4">Keyword 2</li>
            <li className="mt-4">Keyword 3</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
