import React from "react";
import type { JobDbResponse } from "types/jobSearchApiTypes";

export default function Card(props: JobDbResponse) {
  const { id, title, description } = props;

  return (
    <li key={id}>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p>{description}</p>
    </li>
  );
}
