import Headers from "@/components/Headers";
import RepoDashboard from "@/components/RepoDashBoard/RepoDashboard";
import ChartCard from "@/components/Repos/ChartCard";
import GrowthChart from "@/components/Repos/GrowthChart";
import IssueChart from "@/components/Repos/IssueChart";
import RepoHeader from "@/components/Repos/RepoHeader";
import SummaryCard from "@/components/Repos/SummaryCard";
import SWOTCard from "@/components/Repos/SWOTCard";
import SideBar from "@/components/SideBar";
import React from "react";

const page = () => {
  const growthData = [
    { month: "Jan", stars: 1200 },
    { month: "Feb", stars: 1500 },
    { month: "Mar", stars: 1700 },
    { month: "Apr", stars: 2100 },
  ];

  const issueData = [
    { month: "Jan", issues: 30 },
    { month: "Feb", issues: 50 },
    { month: "Mar", issues: 40 },
    { month: "Apr", issues: 70 },
  ];

  return (
    <>
      <div className="bg-gray-900 rounded p-6 space-y-6 flex-1 transition-all duration-300 m-2 min-h-[92.5vh] ">
        <RepoHeader
          name="facebook/react"
          description="A JavaScript library for building user interfaces"
          stars="210k"
          forks="45k"
          language="JavaScript"
          visibility="public"
          healthScore={82}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SummaryCard
            summary="This repository contains a React-based UI library designed for building scalable and interactive web applications. It leverages a component-driven architecture and supports server-side rendering."
            technologies={["React", "TypeScript", "Node.js"]}
            architecture="Component-Based Architecture"
            lastUpdated="2 hours ago"
          />
          <SWOTCard
            strengths={["Large active community", "Well-documented codebase"]}
            weaknesses={[
              "Complex setup for beginners",
              "High dependency count",
            ]}
            opportunities={[
              "Expand plugin ecosystem",
              "Improve performance optimization",
            ]}
            threats={[
              "Competing frameworks gaining popularity",
              "Security vulnerabilities in dependencies",
            ]}
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <ChartCard title="Star Growth">
            <GrowthChart data={growthData} />
          </ChartCard>

          <ChartCard title="Issue Activity">
            <IssueChart data={issueData} />
          </ChartCard>
        </div>
      </div>
    </>
  );
};

export default page;
