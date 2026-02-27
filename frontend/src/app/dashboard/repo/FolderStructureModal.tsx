"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import FolderTree from "./FolderTree";
import { motion } from "framer-motion";
import GraphExplorer from "@/components/graph/GraphExplorer";
import { folderData } from "@/utils/treeData";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface FolderStructureModalProps {
  treeData: any[];
}

export default function FolderStructureModal({
  treeData,
}: FolderStructureModalProps) {
  const [viewMode, setViewMode] = useState<"tree" | "graph">("graph");
  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-xl text-sm transition">
          View Folder Structure
        </button> */}
        <Button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-xl text-sm transition">
          View Folder Structure
        </Button>
      </DialogTrigger>

      <DialogContent className="lg:min-w-4xl bg-slate-900 border-slate-800 overflow-hidden text-white ">
        <DialogHeader>
          <DialogTitle className="text-white flex justify-between">
            Repository Folder Structure
            <div className="flex gap-2 mb-1 mr-2">
              <button
                onClick={() => setViewMode("graph")}
                className={`px-4 py-2 rounded-xl text-sm ${
                  viewMode === "graph"
                    ? "bg-cyan-500 text-white"
                    : "bg-slate-800 text-slate-400"
                }`}
              >
                Graph View
              </button>

              <button
                onClick={() => setViewMode("tree")}
                className={`px-4 py-2 rounded-xl text-sm ${
                  viewMode === "tree"
                    ? "bg-cyan-500 text-white"
                    : "bg-slate-800 text-slate-400"
                }`}
              >
                Tree View
              </button>
            </div>
          </DialogTitle>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4 max-h-[80vh] overflow-y-auto mac-scroll "
        >
          {viewMode === "graph" ? (
            <GraphExplorer data={folderData} />
          ) : (
            <FolderTree data={folderData} />
          )}
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
