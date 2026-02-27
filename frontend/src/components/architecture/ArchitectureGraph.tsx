"use client";

import React from "react";
// import ReactFlow, {
//   Background,
//   Controls,
//   Node,
//   Edge,
// } from "reactflow";

import { ReactFlow, Background, Controls, Node, Edge } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

interface Layer {
  id: string;
  label: string;
  type: string;
}

interface Connection {
  source: string;
  target: string;
}

interface Props {
  layers: Layer[];
  connections: Connection[];
}

export default function ArchitectureGraph({ layers, connections }: Props) {
  const nodes: Node[] = layers.map((layer, index) => ({
    id: layer.id,
    position: { x: 400, y: 100 + index * 150 },
    data: { label: layer.label },
    style: getStyle(layer.type),
  }));

  const edges: Edge[] = connections.map((conn, index) => ({
    id: `e-${index}`,
    source: conn.source,
    target: conn.target,
    animated: true,
  }));

  return (
    <div className="h-[70vh] bg-black rounded-2xl border border-slate-800">
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Background color="#1e293b" />
        <Controls />
      </ReactFlow>
    </div>
  );
}

function getStyle(type: string) {
  const colorMap: Record<string, string> = {
    layer: "#22d3ee",
    database: "#f59e0b",
    cache: "#ef4444",
  };

  const color = colorMap[type] || "#64748b";

  return {
    borderRadius: "12px",
    padding: "12px",
    border: `1px solid ${color}`,
    background: "#0f172a",
    color: "#fff",
    fontSize: "13px",
    boxShadow: `0 0 12px ${color}33`,
  };
}
