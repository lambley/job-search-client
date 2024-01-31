import React from "react";

export default function Home() {
  return (
    <div className="window-body">
      <h4>Job Search App Home Page</h4>
      <p>A playground app built with NestJS and NextJS</p>
      <ul>
        <li>Retrieves job adverts from Adzuna&apos;s API</li>
        <li>Stores and processes the adverts to generate a list of advert keywords</li>
        <li>Queues processing jobs using BullMQ and Redis</li>
      </ul>
    </div>
  );
}
