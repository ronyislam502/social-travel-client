/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

const page = ({ searchParams }: any) => {
  const params = new URLSearchParams(searchParams);

  const queryParams = {
    sort: params.get("sort") || "",
    searchTerm: params.get("searchTerm") || "",
    category: params.get("category") || "",
    tag: params.get("tag") || "",
  };

  return (
    <div>
      <div className="flex lg:flex-row flex-col gap-10">
        <h2>Common layout page</h2>
      </div>
    </div>
  );
};

export default page;
