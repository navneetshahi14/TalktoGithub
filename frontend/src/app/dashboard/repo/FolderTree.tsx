"use client";

import React, { useMemo, useRef } from "react";

import {
  ReactFlow,
  Background,
  Controls,
  Node,
  Edge,
  MiniMap,
  useNodesState,
  useEdgesState,
  Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { toPng } from "html-to-image";

interface TreeNode {
  id: string;
  label: string;
  type?: string;
  children?: TreeNode[];
}

interface FolderGraphProps {
  data: TreeNode;
}

const nodeWidth = 90;
const nodeHeight = 50;

function getCircleStyle(type: string = "") {
  return {
    borderRadius: "16px",
    width: nodeWidth,
    height: nodeHeight,
    border: `1px solid ${type === "folder" ? "#22d3ee" : "#475569"}`,
    background: "#0f172a",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    transition: "all 0.3s ease",
    boxShadow:
      type === "folder"
        ? "0 0 10px rgba(34,211,238,0.3)"
        : "0 0 6px rgba(148,163,184,0.2)",
  };
}

export default function FolderGraph({ data }: FolderGraphProps) {
  const flowRef = useRef<HTMLDivElement>(null);

  // 🔥 Convert Tree → Graph
  const { nodes: initialNodes, edges: initialEdges } = useMemo(() => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    const traverse = (
      node: TreeNode,
      x: number,
      y: number,
      level: number,
      parent?: TreeNode,
    ) => {
      nodes.push({
        id: node.id,
        data: { label: node.label },
        position: { x, y },
        sourcePosition: Position.Bottom,
        targetPosition: Position.Top,
        style: getCircleStyle(node.type),
      });

      if (parent) {
        edges.push({
          id: `${parent.id}-${node.id}`,
          source: parent.id,
          target: node.id,
          animated: false,
        });
      }

      if (node.children) {
        const gap = 1000 / (level + 1);
        node.children.forEach((child, index) => {
          const childX = x + (index - (node.children!.length - 1) / 2) * gap;
          const childY = y + 180;

          traverse(child, childX, childY, level + 1, node);
        });
      }
    };

    traverse(data, 500, 50, 0);

    return { nodes, edges };
  }, [data]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  const handleExport = async () => {
    if (!flowRef.current) return;
    const dataUrl = await toPng(flowRef.current);
    const link = document.createElement("a");
    link.download = "repository-graph.png";
    link.href = dataUrl;
    link.click();
  };

  return (
    <div>
      <button
        onClick={handleExport}
        className="mb-3 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-xl text-sm text-white transition"
      >
        Export as PNG
      </button>

      <div
        ref={flowRef}
        className="h-[70vh] bg-black rounded-2xl border border-slate-800"
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeMouseEnter={(_, node) => {
            setNodes((nds) =>
              nds.map((n) =>
                n.id === node.id
                  ? {
                      ...n,
                      style: {
                        ...n.style,
                        boxShadow: "0 0 20px rgba(34,211,238,0.6)",
                        transform: "scale(1.05)",
                      },
                    }
                  : n,
              ),
            );
          }}
          onNodeMouseLeave={(_, node) => {
            setNodes((nds) =>
              nds.map((n) =>
                n.id === node.id
                  ? {
                      ...n,
                      style: getCircleStyle(
                        (n?.data?.label as any).includes(".") ? "file" : "folder",
                      ),
                    }
                  : n,
              ),
            );
          }}
        >
          <Background color="red" />
          <MiniMap />
          <Controls style={{color:"black"}} />
        </ReactFlow>
      </div>
    </div>
  );
  // 1e293b
}
