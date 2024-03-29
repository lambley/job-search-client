import React from "react";
import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next";
import { getJob, getAllJobs } from "@lib/api";
import type { JobDbResponse } from "types/jobSearchApiTypes";
import { emptyJobsResponse } from "@lib/emptyResponses";
import { repeatElements } from "@lib/utils/arrayMethods";
import Card from "@components/job/card";

type JobProps = {
  job: JobDbResponse;
};

export default function Job({ job }: JobProps) {
  const router = useRouter();
  const { jobAdzunaId } = router.query;

  return (
    <div className="window-body">
      <h4>Job Page</h4>
      <div>
        <div>
          <Card {...job} />
        </div>
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  let paths = [];

  try {
    const res = await getAllJobs();
    const { data } = res.data;

    paths = data.map((job: JobDbResponse) => ({
      params: { jobAdzunaId: job.adzuna_id.toString() },
    }));

    return { paths, fallback: true };
  } catch (error) {
    console.error("Error fetching blog paths:", error);

    paths = repeatElements(
      { params: { jobAdzunaId: "0" } },
      100
    ) as unknown as [];
  }

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps<JobProps> = async (
  context: any
) => {
  const jobAdzunaId = context.params?.jobAdzunaId as string;

  try {
    const res = await getJob(jobAdzunaId);
    const job = res.data;

    if (job) {
      return {
        props: {
          job,
        },
      };
    } else {
      return {
        props: {
          job: emptyJobsResponse,
        },
      };
    }
  } catch (error) {
    console.error(error);
    return {
      props: {
        job: emptyJobsResponse,
      },
    };
  }
};
