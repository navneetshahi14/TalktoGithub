"use client";
import { useParams, usePathname } from "next/navigation";
import React, { useMemo } from "react";
import * as Icons from "lucide-react";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Url } from "next/dist/shared/lib/router/router";

export interface SidebarItemType {
  title: string;
  icon: string;
  href: string;
  badge?: string;
  disabled?: boolean;
}

interface SidebarItemProps {
  title: string;
  icon: string;
  href: string;
  collapsed: boolean;
  badge?: string;
  disabled?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  title,
  icon,
  href,
  collapsed,
  badge,
  disabled = false,
}) => {
  const pathname = usePathname();

  const params = useParams();

  const finalHref = useMemo(() => {
    if (!href.includes("[owner]") && !href.includes("[repo]")) {
      return href;
    }

    if (!params?.owner || !params?.repo) {
      return null; // block link
    }

    return href
      .replace("[owner]", String(params.owner))
      .replace("[repo]", String(params.repo));
  }, [href, params]);

  const isActive = useMemo(() => {
    if (!finalHref) return false;

    // Exact match for dashboard root
    if (finalHref === "/dashboard") {
      return pathname === "/dashboard";
    }

    // Exact match for repos list
    if (finalHref === "/dashboard/repos") {
      return pathname === "/dashboard/repos";
    }

    // For dynamic repo routes
    return pathname?.startsWith(finalHref);
  }, [pathname, finalHref]);

  const IconComponent =
    icon in Icons
      ? (Icons[icon as keyof typeof Icons] as LucideIcon)
      : Icons.Circle;

  const content = (
    <div
      className={cn(
        "group relative flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-all duration-200",
        isActive
          ? "bg-slate-800 text-white"
          : "text-slate-400 hover:bg-slate-800 hover:text-white",
        disabled && "opacity-50 cursor-not-allowed pointer-events-none",
        collapsed && "justify-center",
      )}
    >
      <IconComponent size={18} />

      <AnimatePresence>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="flex-1 whitespace-nowrap"
          >
            {title}
          </motion.span>
        )}
      </AnimatePresence>

      {/* {!collapsed && <span className="flex-1">{title}</span>} */}

      <AnimatePresence>
        {!collapsed && badge && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="text-xs bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded-2xl"
          >
            {badge}
          </motion.span>
        )}
      </AnimatePresence>

      {collapsed && (
        <span className=" fixed left-20 whitespace-nowrap rounded-md bg-slate-900 px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition pointer-events-none z-50 ">
          {title}
        </span>
      )}
    </div>
  );

  if (disabled || !finalHref) return content;

  return <Link href={finalHref}>{content}</Link>;
};

export default SidebarItem;
