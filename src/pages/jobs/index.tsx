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
      <ul
        key={job.id}
        className="tree-view"
        style={{ padding: "8px 16px", marginBottom: "8px" }}
      >
        <Link
          href={`jobs/${job.adzuna_id}`}
          style={{ color: "black", textDecoration: "none" }}
        >
          <Card {...job} />
        </Link>
      </ul>
    ));
  };

  return (
    <div className="window-body">
      <h4>Jobs Page</h4>

      <button onClick={clientSideRefreshJobs}>Refresh Jobs</button>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          width: "100%",
        }}
      >
        <div style={{ width: "50%", margin: "8px 16px" }}>
          <h4 className="text-2xl">Recent jobs</h4>
          {renderJobCards()}
        </div>

        <div style={{ width: "50%", margin: "8px 16px" }}>
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
