import React from "react";
import type { JobDbResponse } from "types/jobSearchApiTypes";

export default function Card(props: JobDbResponse) {
  const {
    id,
    adzuna_id,
    title,
    location,
    description,
    created,
    company,
    salary_min,
    salary_max,
    contract_type,
    category,
    processed_keywords,
  } = props;

  const toTitleCase = (str: string) => {
    return str
      .split(" ")
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(" ");
  };

  const numberToCurrency = (num: number) => {
    return Math.trunc(num).toLocaleString("en-GB", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  return (
    <div key={id}>
      <p>{toTitleCase(title)}</p>
      <div>
        <div>
          <p>
            {numberToCurrency(salary_min)} / {contract_type || "Not Specified"}
          </p>
          <p>{company}</p>
        </div>
        <div>
          {created && (
            <p>
              {new Date(created).toLocaleDateString("en-GB", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
              || {adzuna_id}
            </p>
          )}
        </div>
        <p>{description}</p>
      </div>
    </div>
  );
}
