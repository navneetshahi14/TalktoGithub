import React, { useEffect, useMemo, useState } from "react";
import RepoCard, { RepoCardProps } from "./RepoCard";
import { repos } from "@/utils/reposItem";
import { motion } from "framer-motion";
import { useDebounce } from "@/hooks/useDebounce";
import { sortOptionType } from "./RepoDashboard";

interface ReposProps {
  searchTerm: string;
  statusFilter: "All" | "Analyzed" | "Pending" | "Failed";
  sortOption: sortOptionType;
}

const Repos: React.FC<ReposProps> = ({
  searchTerm,
  statusFilter,
  sortOption,
}) => {
  //   const [filteredRepos, setFilterRepo] = useState<RepoCardProps[]>([]);

  const debouncedSearch = useDebounce(searchTerm, 300);

  const filteredRepos = useMemo(() => {
    const parseStars = (stars?: string) => {
      if (!stars) return 0;
      if (stars.includes("k")) {
        return parseFloat(stars.replace("k", "")) * 1000;
      }
      return Number(stars);
    };

    return repos
      .filter((repo) => {
        const matchesSearch = repo.name
          .toLowerCase()
          .includes(debouncedSearch.toLowerCase());

        const matchesStatus =
          statusFilter === "All" || repo.status === statusFilter;

        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        if (sortOption === "name") {
          return a.name.localeCompare(b.name);
        }

        if (sortOption === "stars") {
          return parseStars(b.stars) - parseStars(a.stars);
        }

        if (sortOption === "recent") {
          return (
            new Date(b.lastAnalyzed || 0).getTime() -
            new Date(a.lastAnalyzed || 0).getTime()
          );
        }

        return 0;
      });
  }, [debouncedSearch, statusFilter, sortOption]);

  return (
    <motion.div
      layout
      transition={{ duration: 0.3 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {filteredRepos.length > 0 ? (
        filteredRepos.map((repo) => <RepoCard key={repo.id} {...repo} />)
      ) : (
        <div className="text-center py-20 text-slate-500">
          No repositories found.
        </div>
      )}
    </motion.div>
  );
};

export default Repos;
