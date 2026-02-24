  export const sidebarItems = [
    {
      section: "Overview",
      items: [
        {
          title: "Dashboard",
          icon: "LayoutDashboard",
          href: "/dashboard",
        },
        {
          title: "My Repositories",
          icon: "Github",
          href: "/dashboard/repos",
        },
        {
          title: "Recent Analysis",
          icon: "History",
          href: "/dashboard/recent",
        },
      ],
    },
    {
      section: "AI Analysis",
      repoRequired: true,
      items: [
        {
          title: "AI Chat",
          icon: "MessageSquare",
          href: "/dashboard/repo/[owner]/[repo]/chat",
        },
        {
          title: "Repository Summary",
          icon: "FileText",
          href: "/dashboard/repo/[owner]/[repo]",
        },
        {
          title: "SWOT Analysis",
          icon: "Brain",
          href: "/dashboard/repo/[owner]/[repo]/swot",
        },
        {
          title: "Architecture Insight",
          icon: "Network",
          href: "/dashboard/repo/[owner]/[repo]/architecture",
        },
      ],
    },
    {
      section: "Metrics",
      repoRequired: true,
      items: [
        {
          title: "Analytics",
          icon: "BarChart3",
          href: "/dashboard/repos/analytics",
        },
        {
          title: "Stars & Forks",
          icon: "Star",
          href: "/dashboard/repos/stars",
        },
        {
          title: "Issues & PRs",
          icon: "GitPullRequest",
          href: "/dashboard/repos/issues",
        },
      ],
    },
    {
      section: "Tools",
      repoRequired: true,
      items: [
        {
          title: "Compare Repository",
          icon: "GitCompare",
          href: "/dashboard/compare",
        },
        {
          title: "Contribute Guide",
          icon: "UserPlus",
          href: "/dashboard/repo/contribute",
        },
        {
          title: "Export Report",
          icon: "Download",
          href: "/dashboard/repo/export",
        },
      ],
    },
    {
      section: "Account",
      items: [
        {
          title: "Settings",
          icon: "Settings",
          href: "/dashboard/settings",
        },
      ],
    },
  ];