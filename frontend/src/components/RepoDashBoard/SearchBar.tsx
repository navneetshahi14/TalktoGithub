import React from "react";
import { Input } from "../ui/input";
import { sortOptionType } from "./RepoDashboard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

type statusfiltertype = "All" | "Analyzed" | "Pending" | "Failed";

interface searchBarProp {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  statusFilter: statusfiltertype;
  setStatusFilter: (statusFilter: statusfiltertype) => void;
  sortOption: sortOptionType;
  setSortOption: (sortOption: sortOptionType) => void;
}

const SearchBar: React.FC<searchBarProp> = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  sortOption,
  setSortOption,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-6">
      <Input
        type="text"
        placeholder="Search repositories..."
        className="w-full md:w-1/2 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
      />
      <div className="flex gap-3">
        <div className="flex gap-2 mt-4 md:mt-0">
          {["All", "Analyzed", "Pending", "Failed"].map((status) => (
            <button
              key={status}
              onClick={() =>
                setStatusFilter(
                  status as "All" | "Analyzed" | "Pending" | "Failed",
                )
              }
              className={`px-3 py-1.5 text-sm rounded-xl transition ${
                statusFilter === status
                  ? "bg-cyan-500 text-white"
                  : "bg-slate-900 border border-slate-800 text-slate-400 hover:bg-slate-800"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
        <Select
          value={sortOption}
          onValueChange={(value) =>
            setSortOption(value as "recent" | "name" | "stars")
          }
        >
          <SelectTrigger className="w-50 bg-slate-900 border-slate-800 text-slate-300 focus:ring-cyan-500">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>

          <SelectContent className="bg-slate-900 border-slate-800 text-slate-300">
            <SelectItem value="recent">Recently Analyzed</SelectItem>
            <SelectItem value="name">Name (A-Z)</SelectItem>
            <SelectItem value="stars">Most Stars</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SearchBar;
