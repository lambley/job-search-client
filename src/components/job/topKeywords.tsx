import React, { use, useEffect, useState } from "react";
import { getTopKeywords } from "@lib/api";

export default function TopKeywords() {
  const [topKeywords, setTopKeywords] = useState<string[]>(["keyword1", "keyword2", "keyword3"]);

  useEffect(() => {
    const fetchTopKeywords = async () => {
      try {
        const res = await getTopKeywords(3);
        const { data } = res.data;

        setTopKeywords(data);
      } catch (error) {
        console.error("Error fetching top keywords:", error);
      }
    };

    fetchTopKeywords();
  }, []);

  const renderTopKeywordList = () => {
    return topKeywords.map((keyword) => (
      <li className="mt-4" key={keyword}>
        {keyword}
      </li>
    ));
  };

  return (
    <>
      <h2 className="text-2xl">Hot Keywords</h2>
      <ul>{renderTopKeywordList()}</ul>
    </>
  );
}
