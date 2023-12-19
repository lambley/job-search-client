import React, { use, useEffect, useState } from "react";
import { getTopKeywords } from "@lib/api";

export default function TopKeywords() {
  const [topKeywords, setTopKeywords] = useState([]);

  useEffect(() => {
    const fetchTopKeywords = async () => {
      const res = await getTopKeywords(3);
      const { data } = res.data;

      setTopKeywords(data);
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
