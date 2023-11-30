import React from "react";
import Link from "next/link";
import Card from "src/components/job/card";
import { getJobs } from "@lib/api";
import type { GetJobsParams, JobDbResponse } from "types/jobSearchApiTypes";
import { emptyJobsResponse } from "@lib/emptyResponses";
import { repeatElements } from "@lib/utils/arrayMethods";

type JobsProps = {
  jobs: JobDbResponse[];
};

export default function Jobs({ jobs }: JobsProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <h1 className="text-3xl font-bold text-center py-4">Jobs Page</h1>

      <div className="flex-1 flex justify-center items-center">
        {/* Left Column */}
        <div className="w-1/2 p-4 m-10 rounded border shadow-md min-h-[20rem]">
          <h2 className="text-2xl">Recent jobs</h2>
          <ul>
            {jobs.map((job: JobDbResponse) => (
              <Link key={job.id} href={`jobs/${job.adzuna_id}`}>
                <Card {...job} />
              </Link>
            ))}
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

export async function getStaticProps() {
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
}
