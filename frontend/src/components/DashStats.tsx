import React from "react";
import StatsCard from "./cards/StatsCard";
import { statsData } from "@/utils/statsCardItem";

const DashStats = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((item,index) => (
          <StatsCard
            key={index}
            title={item.title}
            value={item.value}
            icon={item.icon}
            trend={item.trend}
            subtitle={item.subtitle}
          />
        ))}
      </div>
    </>
  );
};

export default DashStats;
