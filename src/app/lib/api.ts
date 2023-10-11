import axios, { AxiosResponse } from "axios";

const jobSearchApi = axios.create({
  baseURL: "http://localhost:3000",
});

export default jobSearchApi;
