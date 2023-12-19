import axios, { AxiosResponse } from "axios";

// NOTE: NextJS in docker containers needs to reference the service name in server-side code OR use localhost for client-side code

const baseURL =
  process.env.NEXT_SERVER_API_URL || process.env.NEXT_PUBLIC_API_URL;

const jobSearchApi = axios.create({
  baseURL,
});
4;
interface IGetJobsParams {
  results_per_page: number;
  what: string;
  where: string;
}

const refreshJobs = async (params: IGetJobsParams): Promise<AxiosResponse> => {
  const encodedWhat = encodeURIComponent(params.what);
  const encodedWhere = encodeURIComponent(params.where);

  const encodedParams = `results_per_page=${params.results_per_page}&what=${encodedWhat}&where=${encodedWhere}`;

  try {
    const res = await jobSearchApi.get(`api/v1/jobs/refresh?${encodedParams}`);
    return res;
  } catch (error) {
    throw error;
  }
};

const getAllJobs = async (): Promise<AxiosResponse> => {
  try {
    const res = await jobSearchApi.get(`jobs`);
    return res;
  } catch (error) {
    throw error;
  }
};

const getJobs = async (params: IGetJobsParams): Promise<AxiosResponse> => {
  const { what, where, results_per_page } = params;

  const query = `?results_per_page=${results_per_page}&what=${what}&where=${where}`;

  try {
    const res = await jobSearchApi.get(`api/v1/jobs${query}`);
    return res;
  } catch (error) {
    throw error;
  }
};

const getJob = async (adzuna_id: string): Promise<AxiosResponse> => {
  try {
    const res = await jobSearchApi.get(`api/v1/jobs/${adzuna_id}`);
    return res;
  } catch (error) {
    throw error;
  }
};

const getTopKeywords = async (
  limit?: number,
  force_update?: string
): Promise<AxiosResponse> => {
  let urlBuilder = `api/v1/jobs/top-keywords`;

  if (limit) {
    urlBuilder += `?limit=${limit}`;
  }

  if (force_update) {
    urlBuilder += `?force_update=${force_update}`;
  }

  try {
    const res = await jobSearchApi.get(urlBuilder);
    return res;
  } catch (error) {
    console.log(error);
    const res = {
      data: {
        keywords: ["failed", "to", "fetch"],
      },
    };
    return res as AxiosResponse;
  }
};

export default jobSearchApi;
export { refreshJobs, getJobs, getAllJobs, getJob, getTopKeywords };
