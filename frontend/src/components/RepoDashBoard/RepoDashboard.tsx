"use client";
import React, { useState } from "react";
import Topsection from "./Topsection";
import SearchBar from "./SearchBar";
import Repos from "./Repos";

export type sortOptionType = "name" | "stars" | "recent";

const RepoDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "All" | "Analyzed" | "Pending" | "Failed"
  >("All");

  const [sortOption, setSortOption] = useState<sortOptionType>("recent");

  return (
    <div className="bg-gray-900 rounded p-6 space-y-6 flex-1 transition-all duration-300 m-2 min-h-[92.5vh] ">
      <Topsection />
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        setSortOption={setSortOption}
        sortOption={sortOption}
      />
      <Repos
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        sortOption={sortOption}
      />
    </div>
  );
};

export default RepoDashboard;
