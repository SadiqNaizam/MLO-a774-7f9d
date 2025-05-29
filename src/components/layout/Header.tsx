import React from 'react';
import { cn } from '@/lib/utils';
import TopHeader from '../NewsFeed/TopHeader'; // Using the existing organism component

interface HeaderProps {
  // No specific props required for this layout component as TopHeader is self-contained.
  // className could be added if customization from MainAppLayout is needed for the wrapper.
  className?: string;
}

const Header: React.FC<HeaderProps> = ({className}) => {
  // TopHeader is an existing component that defines the header's structure and appearance.
  // It's already styled with fixed positioning, height, etc.
  // This Header layout component ensures TopHeader is used, applying necessary overrides
  // to meet the exact Layout Requirements for the header slot.

  // Layout Requirements for Header specify:
  // - px-6 (TopHeader default is px-4)
  // - bg-surface (TopHeader default is bg-card; both map to white, but using 'secondary' for 'surface')
  // - z-10 (TopHeader default is z-50)
  // Other styles like h-[70px], shadow-sm, flex are consistent.

  return (
    // This outer 'header' tag is semantic for the page structure.
    // TopHeader component will be rendered within it.
    <header className={cn(className)}>
      <TopHeader
        className={cn(
          // Apply overrides to meet Layout Requirements for the Header slot.
          // Using '!important' Tailwind prefix to ensure these take precedence.
          '!px-6',         // Enforce px-6
          '!bg-secondary', // Enforce bg-surface (mapped to 'secondary' in tailwind.config.ts)
          '!z-10'          // Enforce z-10
          // TopHeader's other classes (h-[70px], fixed, shadow-sm, border-b, etc.) will still apply.
        )}
      />
    </header>
  );
};

export default Header;
