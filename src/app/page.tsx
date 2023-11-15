import React from "react";
import Card from "@components/job/card";
import { getJobs } from "./lib/api";
import type { GetJobsParams, JobDbResponse } from "types/jobSearchApiTypes";
import { emptyJobsResponse } from "./lib/emptyResponses";

export default function Home() {
  const getRecentJobs = async ({
    results_per_page,
    what,
    where,
  }: GetJobsParams): Promise<JobDbResponse[]> => {
    try {
      const res = await getJobs({ results_per_page, what, where });
      const { data } = res.data;
      return data;
    } catch (error) {
      console.log(error);
      return [emptyJobsResponse, emptyJobsResponse, emptyJobsResponse];
    }
  };

  const renderJobs = async () => {
    const jobs = await getRecentJobs({
      results_per_page: 3,
      what: "javascript",
      where: "london",
    });

    return jobs.map((job: JobDbResponse) => (
      <Card
        key={job.id}
        id={job.id}
        title={job.title}
        description={job.description}
      />
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
