import React, { useState, useEffect } from "react";
import Link from "next/link";
import { GetStaticProps } from "next";
import Card from "@components/job/card";
import TopKeywords from "@components/job/topKeywords";
import { refreshJobs, recentJobs } from "@lib/api";
import type { JobDbResponse } from "types/jobSearchApiTypes";
import { emptyJobsResponse } from "@lib/emptyResponses";
import { repeatElements } from "@lib/utils/arrayMethods";

type JobsProps = {
  jobs: JobDbResponse[];
};

export default function Jobs({ jobs }: JobsProps) {
  const [reload, setReload] = useState(false);
  const [clientSideJobsList, setClientSideJobsList] =
    useState<JobDbResponse[]>(jobs);

  useEffect(() => {
    if (reload) {
      handleReload();
    }
  }, [reload]);

  // get new jobs for cards - client-side
  const updateJobs = async () => {
    try {
      const res = await recentJobs(3);
      const { data } = res.data;
      setClientSideJobsList(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  // fetch new jobs from API, rather than re-fetch recent jobs
  const clientSideRefreshJobs = async () => {
    try {
      const res = await refreshJobs({
        results_per_page: 3,
        what: "javascript",
        where: "london",
      });
    } catch (error) {
      console.error("Error refreshing jobs:", error);
    }

    setReload(true);
  };

  const handleReload = () => {
    updateJobs();
    renderJobCards();
    setReload(false);
  };

  const renderJobCards = () => {
    const renderList = clientSideJobsList || jobs;
    return renderList.map((job: JobDbResponse) => (
      <div key={job.id} className="my-4">
        <Link href={`jobs/${job.adzuna_id}`}>
          <Card {...job} />
        </Link>
      </div>
    ));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <h1 className="text-3xl font-bold text-center py-4">Jobs Page</h1>

      <button
        onClick={clientSideRefreshJobs}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Refresh Jobs
      </button>

      <div className="flex-1 flex justify-center items-center">
        {/* Left Column */}
        <div className="w-1/2 p-4 m-10 rounded border shadow-md min-h-[20rem]">
          <h2 className="text-2xl">Recent jobs</h2>
          {renderJobCards()}
        </div>

        {/* Right Column */}
        <div className="w-1/2 p-4 m-10 rounded border shadow-md min-h-[20rem]">
          <TopKeywords />
        </div>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps<JobsProps> = async () => {
  try {
    const res = await recentJobs(3);
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
