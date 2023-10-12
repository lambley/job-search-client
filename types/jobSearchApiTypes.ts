interface GetJobsParams {
  results_per_page: number;
  what: string;
  where: string;
}

interface JobLocation {
  area: string[];
  display_name: string;
}

interface JobCategory {
  label: string;
  tag: string;
}

interface JobCompany {
  display_name: string;
}

interface JobDbResponse {
  id: number;
  adzuna_id: string;
  title: string;
  // area[] array of JobResponse.location.area
  location: string[];
  description: string;
  created: string;
  // display_name string of JobResponse.company.display_name
  company: string;
  salary_min: number;
  salary_max: number;
  contract_type?: string;
  // label string of JobResponse.category.label
  category: string;
  message?: string;
  processed_keywords?: string[];
}

// see https://developer.adzuna.com/docs/search for an example response

export type { GetJobsParams, JobDbResponse };
