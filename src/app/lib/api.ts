import axios, { AxiosResponse } from "axios";

const jobSearchApi = axios.create({
  baseURL: "http://localhost:3000",
});

interface IGetJobsParams {
  results_per_page: number;
  what: string;
  where: string;
}

const refreshJobs = async (params: IGetJobsParams): Promise<AxiosResponse> => {
  const encodedWhat = encodeURIComponent(params.what);
  const encodedWhere = encodeURIComponent(params.where);

  const encodedParams = `refresh?results_per_page=${params.results_per_page}&what=${encodedWhat}&where=${encodedWhere}`;

  try {
    const res = await jobSearchApi.get(`api/v1/jobs/refresh${encodedParams}`);
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

export default jobSearchApi;
export { refreshJobs, getJobs };
