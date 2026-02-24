import React from "react";
import SidebarItem, { SidebarItemType } from "./SidebarItem";

interface SidebarSectionProps {
  section: string;
  items: SidebarItemType[];
  collapsed: boolean;
  repoSelected?: boolean;
  repoRequired?: boolean;
}

const SidebarSection: React.FC<SidebarSectionProps> = ({
  section,
  items,
  collapsed,
  repoRequired = false,
  repoSelected = false,
}) => {
  const shouldDisable = repoRequired && !repoSelected;

  return (
    <>
      <div className="">
        {!collapsed && (
          <p className="px-3 mb-2 text-xs uppercase tracking-wide text-slate-500">
            {section}
          </p>
        )}

        {/* Items */}
        <div className="flex flex-col gap-1">
          {items.map((item) => (
            <SidebarItem
              key={item.title}
              title={item.title}
              icon={item.icon}
              href={item.href}
              collapsed={collapsed}
              badge={item.badge}
              disabled={shouldDisable}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default SidebarSection;
