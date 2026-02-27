export const treeData = [
  {
    name: "src",
    type: "folder",
    children: [
      {
        name: "components",
        type: "folder",
        children: [
          { name: "RepoHeader.tsx", type: "file" },
          { name: "SummaryCard.tsx", type: "file" },
        ],
      },
      { name: "index.tsx", type: "file" },
    ],
  },
];

export const folderData = {
  id: "root",
  label: "project",
  type: "folder",
  children: [
    {
      id: "src",
      label: "src",
      type: "folder",
      children: [
        {
          id: "components",
          label: "components",
          type: "folder",
          children: [
            { id: "repoHeader", label: "RepoHeader.tsx", type: "file" },
            { id: "summary", label: "SummaryCard.tsx", type: "file" },
            { id: "swot", label: "SWOTCard.tsx", type: "file" },
          ],
        },
        {
          id: "chat",
          label: "chat",
          type: "folder",
          children: [
            { id: "chatWindow", label: "ChatWindow.tsx", type: "file" },
            { id: "message", label: "MessageBubble.tsx", type: "file" },
          ],
        },
        {
          id: "api",
          label: "api",
          type: "folder",
          children: [{ id: "route", label: "route.ts", type: "file" }],
        },
      ],
    },
    {
      id: "config",
      label: "config",
      type: "folder",
      children: [
        { id: "env", label: ".env", type: "file" },
        { id: "nextConfig", label: "next.config.js", type: "file" },
      ],
    },
    {
      id: "package",
      label: "package.json",
      type: "file",
    },
  ],
};


export const dummyArchitectureInsight = {
  summary: `
This repository follows a modern full-stack architecture using Next.js for the frontend 
and NestJS for the backend API layer. The system uses PostgreSQL as the primary database 
with Redis caching for performance optimization. Authentication is handled via Clerk, 
and the application integrates external services such as OpenAI and GitHub API. 
The backend follows a modular service-based architecture.
  `,
  layers: [
    { id: "frontend", label: "Frontend (Next.js)", type: "layer" },
    { id: "api", label: "Backend API (NestJS)", type: "layer" },
    { id: "auth", label: "Auth Service (Clerk)", type: "service" },
    { id: "openai", label: "OpenAI API", type: "external" },
    { id: "github", label: "GitHub API", type: "external" },
    { id: "db", label: "PostgreSQL Database", type: "database" },
    { id: "cache", label: "Redis Cache", type: "cache" },
  ],
  connections: [
    { source: "frontend", target: "api" },
    { source: "frontend", target: "auth" },
    { source: "api", target: "db" },
    { source: "api", target: "cache" },
    { source: "api", target: "openai" },
    { source: "api", target: "github" },
  ],
};

export const advancedDummy = {
  summary: "This system uses a modular microservice-based architecture...",
  layers: [
    { id: "frontend", label: "Frontend (Next.js)", type: "layer" },
    { id: "gateway", label: "API Gateway", type: "layer" },
    { id: "analysis", label: "Analysis Service", type: "service" },
    { id: "chat", label: "Chat Service", type: "service" },
    { id: "db", label: "PostgreSQL", type: "database" },
    { id: "redis", label: "Redis", type: "cache" },
    { id: "openai", label: "OpenAI", type: "external" },
  ],
  connections: [
    { source: "frontend", target: "gateway" },
    { source: "gateway", target: "analysis" },
    { source: "gateway", target: "chat" },
    { source: "analysis", target: "db" },
    { source: "analysis", target: "redis" },
    { source: "chat", target: "openai" },
  ],
};