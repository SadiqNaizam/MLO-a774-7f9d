import React from 'react';
import { cn } from '@/lib/utils';
import Header from './Header';
import Sidebar from './Sidebar';

interface MainAppLayoutProps {
  children: React.ReactNode; // Content for the main area
  rightSidebarContent?: React.ReactNode; // Optional content for the right sidebar
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({ children, rightSidebarContent }) => {
  // This layout implements the "HLSBRS" (Header, Left Sidebar, Body, Right Sidebar) structure.
  // It uses a CSS Grid definition as specified in Layout Requirements:
  // - Overall type: "Grid"
  // - Grid definition: "grid-cols-[auto_1fr_auto] grid-rows-[auto_1fr]"
  // - Header height: "h-[70px]"
  // - Left Sidebar width: "w-56"
  // - Right Sidebar width: "w-80"
  // - Main Content: "min-w-0 overflow-y-auto", padding "p-4"

  return (
    <div className="h-screen grid grid-rows-[auto_1fr] bg-background">
      {/* Row 1: Header Area */}
      {/* This div acts as the placeholder in the grid for the header's height. */}
      {/* The actual Header component is fixed and will overlay this space. */}
      {/* col-span-3 makes it span all columns. h-[70px] enforces the header height. */}
      <div className="col-span-3 h-[70px]">
        <Header /> {/* Renders the fixed Header UI */}
      </div>

      {/* Row 2: Main Content Area (Left Sidebar, Main Body, Right Sidebar) */}
      {/* This nested grid defines the three-column layout for content below the header. */}
      {/* flex-1 ensures it takes remaining vertical space. overflow-hidden clips content. */}
      <div className="grid grid-cols-[auto_1fr_auto] flex-1 overflow-hidden">
        {/* Column 1: Left Sidebar */}
        {/* This div reserves w-56 space for the left sidebar. */}
        {/* The Sidebar component renders SidebarNav, which is fixed top-[70px] left-0. */}
        {/* 'hidden md:block' makes it responsive. */}
        <div className="hidden md:block w-56">
          {/* SidebarNav component (via Sidebar.tsx) provides its own background and padding. */}
          <Sidebar />
        </div>

        {/* Column 2: Main Content Body */}
        {/* This is the primary scrollable content area. */}
        <main
          className={cn(
            'overflow-y-auto min-w-0', // Sizing and scroll behavior from Layout Requirements
            'p-4' // Padding from Layout Requirements
          )}
        >
          {/* Internal container for main content elements, e.g., feed items. */}
          {/* 'max-w-xl mx-auto' centers content in a typical feed width. */}
          {/* 'flex flex-col gap-6' from Layout Requirements for mainContent.container */}
          <div className="max-w-xl mx-auto flex flex-col gap-6">
            {children}
          </div>
        </main>

        {/* Column 3: Right Sidebar */}
        {/* This aside element is for right sidebar content. */}
        {/* 'w-80' for width, 'hidden lg:block' for responsiveness. */}
        {/* 'bg-card p-4' for styling based on Layout Requirements (bg-surface, px-4). */}
        {/* overflow-y-auto allows scrolling if content exceeds height. */}
        {rightSidebarContent && (
          <aside
            className={cn(
              'w-80 hidden lg:block overflow-y-auto',
              'bg-card p-4' // bg-surface is card/secondary, px-4 for horizontal, p-4 for all sides
            )}
          >
            {/* Container for right sidebar widgets */}
            <div className="flex flex-col gap-4 h-full">
              {rightSidebarContent}
            </div>
          </aside>
        )}
        {/* If no rightSidebarContent, this column will still occupy w-80 space if not conditionally rendered based on content, 
            or 'auto' might shrink. Ensure grid structure is maintained. 
            If rightSidebarContent is null/undefined, this column might not render if the parent 'aside' is conditional.
            The current structure correctly handles this by conditionally rendering the aside. 
            If no rightSidebarContent, grid-cols-[auto_1fr_auto] might behave like [auto_1fr] if the third item is missing.
            To ensure the grid structure is always 3 columns, a placeholder could be used, or ensure rightSidebarContent is always a node.
            For simplicity, if no content, the column won't render, which is acceptable for many layouts.
            Alternatively, to strictly maintain 3 columns always:
            <aside className="w-80 hidden lg:block ...">{rightSidebarContent || <DefaultRightSidebarPlaceholder />}</aside>
            For now, conditional rendering of the aside element itself is fine.
         */}
      </div>
    </div>
  );
};

export default MainAppLayout;
