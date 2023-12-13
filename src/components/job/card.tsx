import React from "react";
import type { JobDbResponse } from "types/jobSearchApiTypes";

export default function Card(props: JobDbResponse) {
  const {
    id,
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
      <h3 className="text-xl my-1 font-semibold">{toTitleCase(title)}</h3>
      <div className="ms-1">
        <div>
          <h4 className="my-1">
            {numberToCurrency(salary_min)} / {contract_type || "Not Specified"}
          </h4>
          <h4 className="my-1">{company}</h4>
        </div>
        <div>
          {created && (
            <h4 className="my-1">
              {new Date(created).toLocaleDateString("en-GB", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </h4>
          )}
        </div>
        <p>{description}</p>
      </div>
    </div>
  );
}
