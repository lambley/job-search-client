import React from "react";
import { getJobs } from "./lib/api";

export default function Home() {
  const getRecentJobs = async (results_per_page, what, where) => {
    try {
      const res = await getJobs({ results_per_page, what, where });
      console.log(res);
      return res.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const renderJobs = async () => {
    const jobs = await getRecentJobs(3, "javascript", "london");
    return jobs.map((job) => (
      <li key={job.id}>
        <h3 className="text-xl font-semibold">{job.title}</h3>
        <p>{job.description}</p>
      </li>
    ));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <h1 className="text-3xl font-bold text-center py-4">Home Page</h1>

      <div className="flex-1 flex justify-center items-center">
        {/* Left Column */}
        <div className="w-1/2 p-4 m-10 rounded border shadow-md min-h-[20rem]">
          <h2 className="text-2xl">Recent jobs</h2>
          {renderJobs()}
          {/* <ul>
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
          </ul> */}
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
