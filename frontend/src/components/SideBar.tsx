"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import SidebarSection from "./SidebarSection";
import { sidebarItems } from "@/utils/sidebarItems";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";

const SideBar = () => {
  const [open, setOpen] = useState<boolean | null>(null);
  const params = useParams()
  const repoSelected = Boolean(params?.repo)

  useEffect(() => {
    const stored = localStorage.getItem("sidebar-open");
    if (stored !== null) {
      setOpen(stored === "true");
    } else {
      setOpen(true);
    }
  }, []);

  useEffect(() => {
    if (open !== null) {
      localStorage.setItem("sidebar-open", String(open));
    }
  }, [open]);

  if (open === null) {
    return <div className="w-64 h-[95vh]" />;
  }
  return (
    <>
      <motion.nav
        animate={{ width: open ? 256 : 64 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="h-[95vh] bg-gray-900 border-t-[1.5px] border-t-gray-800 rounded-r-2xl text-white overflow-hidden"
      >
        <div className="flex justify-end px-2 py-3">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: open ? 0 : 180 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronLeft
              className="cursor-pointer"
              onClick={() => setOpen((prev) => !prev)}
            />
          </motion.div>
        </div>

        <div className="w-full p-2 ">
          {sidebarItems.map((section) => (
            <SidebarSection
              key={section.section}
              section={section.section}
              items={section.items}
              collapsed={!open}
              repoSelected={repoSelected}
              repoRequired={section.repoRequired}
            />
          ))}
        </div>
      </motion.nav>
    </>
  );
};

export default SideBar;
