import { RepoCardProps } from "@/components/RepoDashBoard/RepoCard";

export const repos:RepoCardProps[] = [
  {
    id: 1,
    name: "facebook/react",
    description: "A JavaScript library for building user interfaces",
    stars: "210k",
    forks: "45k",
    language: "JavaScript",
    status: "Analyzed",
    lastAnalyzed: "2 hours ago",
  },
  {
    id: 2,
    name: "vercel/next.js",
    description: "The React framework for production",
    stars: "120k",
    forks: "25k",
    language: "TypeScript",
    status: "Pending",
    lastAnalyzed: "Yesterday",
  },
];