"use client";

import SideBar from "@/components/SideBar";
import Headers from "@/components/Headers";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen bg-gray-800">
      <Headers />

      <div className="flex flex-1 overflow-hidden">
        <SideBar />

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}