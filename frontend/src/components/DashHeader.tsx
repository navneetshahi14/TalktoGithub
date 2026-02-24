"use client";
import { useUser } from "@clerk/nextjs";
import React from "react";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

const DashHeader = () => {
  const { user } = useUser();
  return (
    <div className="w-full  p-2 text-sm text-white font-poppins flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-white">
          Welcome back, {user?.firstName} 👋
        </h1>
        <p className="text-slate-400 text-sm">
          Here's what's happening with your repositories.
        </p>
      </div>

      <Button className="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-xl text-sm font-medium transition cursor-pointer">
        <Plus />
        <span>Analyze Repository</span>
      </Button>
    </div>
  );
};

export default DashHeader;
