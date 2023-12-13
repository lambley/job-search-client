import React from "react";
import type { JobDbResponse } from "types/jobSearchApiTypes";

export default function Card(props: JobDbResponse) {
  const { id, title, description } = props;

  const toTitleCase = (str: string) => {
    return str
      .split(" ")
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div key={id}>
      <h3 className="text-xl my-1 font-semibold">{toTitleCase(title)}</h3>
      <p className="ms-1">{description}</p>
    </div>
  );
}
