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
    <div>
      <h1 className="text-3xl font-bold text-center py-4">Job Page</h1>
      <div className="flex-1 flex justify-center items-center">
        <div className="w-1/2 p-4 m-10 rounded border shadow-md min-h-[20rem]">
          <h2 className="text-2xl">Job Details</h2>
          <Card {...job} />
        </div>
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const res = await getAllJobs();
    const jobs: JobDbResponse[] = res.data.data;

    const paths = jobs.map((job: JobDbResponse) => ({
      params: { jobAdzunaId: job.adzuna_id.toString() },
    }));

    return { paths, fallback: false };
  } catch (error) {
    console.error("Error fetching blog paths:", error);

    return { paths: [{ params: { jobAdzunaId: "0" } }], fallback: false };
  }
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
