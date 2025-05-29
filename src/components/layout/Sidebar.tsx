import React from 'react';
import { cn } from '@/lib/utils';
import SidebarNav from '../NewsFeed/SidebarNav';

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  // SidebarNav is the actual component with fixed positioning (top-[70px] left-0),
  // specific width (w-56), background (bg-sidebar), and padding (p-3).
  // This Sidebar layout component simply renders SidebarNav.
  // The parent grid cell in MainAppLayout will ensure space (w-56) is allocated for it.
  return (
    // className prop can be used by MainAppLayout if it needs to pass additional styles to this wrapper.
    <div className={cn(className)}>
      <SidebarNav /> {/* SidebarNav handles its own styling and positioning */} 
    </div>
  );
};

export default Sidebar;
