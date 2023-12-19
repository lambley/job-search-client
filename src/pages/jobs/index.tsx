import React from "react";
import Link from "next/link";
import { GetStaticProps } from "next";
import Card from "@components/job/card";
import TopKeywords from "@components/job/topKeywords";
import { getJobs, refreshJobs } from "@lib/api";
import type { JobDbResponse } from "types/jobSearchApiTypes";
import { emptyJobsResponse } from "@lib/emptyResponses";
import { repeatElements } from "@lib/utils/arrayMethods";

type JobsProps = {
  jobs: JobDbResponse[];
};

export default function Jobs({ jobs }: JobsProps) {
  const handleRefreshJobs = async () => {
    try {
      const res = await refreshJobs({
        results_per_page: 3,
        what: "javascript",
        where: "london",
      });
      const { data } = res.data;
      console.log(data);
    } catch (error) {}
  };

  return (
    <div className="min-h-screen flex flex-col">
      <h1 className="text-3xl font-bold text-center py-4">Jobs Page</h1>

      <button
        onClick={handleRefreshJobs}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Refresh Jobs
      </button>

      <div className="flex-1 flex justify-center items-center">
        {/* Left Column */}
        <div className="w-1/2 p-4 m-10 rounded border shadow-md min-h-[20rem]">
          <h2 className="text-2xl">Recent jobs</h2>
          {jobs.map((job: JobDbResponse) => (
            <div key={job.id} className="my-4">
              <Link href={`jobs/${job.adzuna_id}`}>
                <Card {...job} />
              </Link>
            </div>
          ))}
        </div>

        {/* Right Column */}
        <div className="w-1/2 p-4 m-10 rounded border shadow-md min-h-[20rem]">
          <TopKeywords/>
        </div>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps<JobsProps> = async () => {
  try {
    const res = await getJobs({
      results_per_page: 3,
      what: "javascript",
      where: "london",
    });
    const { data } = res.data;

    return {
      props: {
        jobs: data,
      },
    };
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return {
      props: {
        jobs: repeatElements(emptyJobsResponse, 3),
      },
    };
  }
};
