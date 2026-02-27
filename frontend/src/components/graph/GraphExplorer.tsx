"use client";

import React, { useMemo, useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  Node,
  Edge,
  MiniMap,
  Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import dagre from "dagre";

interface TreeNode {
  id: string;
  label: string;
  type?: "folder" | "file" | string;
  children?: TreeNode[];
}

interface GraphExplorerProps {
  data: TreeNode;
}

const nodeWidth = 100;
const nodeHeight = 100;

export default function GraphExplorer({ data }: GraphExplorerProps) {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const { nodes, edges } = useMemo(() => {
    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));
    dagreGraph.setGraph({ rankdir: "TB" });

    const nodes: Node[] = [];
    const edges: Edge[] = [];

    const traverse = (node: TreeNode, parent?: TreeNode) => {
      if (parent) {
        edges.push({
          id: `${parent.id}-${node.id}`,
          source: parent.id,
          target: node.id,
          animated: true,
          style: { stroke: "#334155" },
        });
      }

      dagreGraph.setNode(node.id, {
        width: nodeWidth,
        height: nodeHeight,
      });

      nodes.push({
        id: node.id,
        data: { label: node.label },
        position: { x: 0, y: 0 },
        sourcePosition: Position.Bottom,
        targetPosition: Position.Top,
        style: {
          borderRadius: "50%",
          width: nodeWidth,
          height: nodeHeight,
          border: `1px solid ${node.type === "file" ? "#475569" : "#22d3ee"}`,
          background: "#0f172a",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "12px",
          transition: "all 0.3s ease",
          boxShadow:
            node.type === "folder"
              ? "0 0 10px rgba(34,211,238,0.3)"
              : "0 0 6px rgba(148,163,184,0.2)",
        },
      });

      if (!collapsed[node.id] && node.children) {
        node.children.forEach((child) => traverse(child, node));
      }
    };

    traverse(data);

    dagre.layout(dagreGraph);

    nodes.forEach((node) => {
      const nodeWithPosition = dagreGraph.node(node.id);
      node.position = {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      };
    });

    return { nodes, edges };
  }, [data, collapsed]);

  const handleNodeClick = (_: any, node: Node) => {
    setCollapsed((prev) => ({
      ...prev,
      [node.id]: !prev[node.id],
    }));
  };

  return (
    <div className="h-[75vh] bg-black rounded-2xl border border-slate-800">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        onNodeClick={handleNodeClick}
        onNodeMouseEnter={(_, node) => {
          node.style = {
            ...node.style,
            boxShadow: "0 0 20px rgba(34,211,238,0.6)",
            transform: "scale(1.05)",
          };
        }}
        onNodeMouseLeave={(_, node) => {
          node.style = {
            ...node.style,
            boxShadow:
              node.data.type === "folder"
                ? "0 0 10px rgba(34,211,238,0.3)"
                : "0 0 6px rgba(148,163,184,0.2)",
            transform: "scale(1)",
          };
        }}
      >
        <Background color="#1e293b" />
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  );
}
