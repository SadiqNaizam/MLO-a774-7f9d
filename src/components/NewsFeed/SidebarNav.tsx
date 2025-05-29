import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Newspaper,
  MessageCircle,
  PlaySquare,
  Store,
  Gamepad2,
  CalendarDays,
  Flag,
  Users,
  ListChecks,
  HeartHandshake,
  ChevronDown,
  PlusCircle,
  Settings,
  User
} from 'lucide-react';

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  href?: string;
  isActive?: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, href = '#', isActive, onClick }) => (
  <Button
    variant="ghost"
    className={cn(
      'w-full justify-start text-sm font-medium px-2 py-2 h-auto',
      isActive ? 'bg-primary/10 text-primary hover:bg-primary/15' : 'hover:bg-secondary/80 text-sidebar-foreground'
    )}
    onClick={onClick}
    asChild={!onClick}
  >
    {onClick ? (
      <>
        <Icon className="mr-3 h-5 w-5" />
        {label}
      </>
    ) : (
      <a href={href}>
        <Icon className="mr-3 h-5 w-5" />
        {label}
      </a>
    )}
  </Button>
);

interface SidebarNavProps {
  className?: string;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ className }) => {
  const [showMoreExplore, setShowMoreExplore] = React.useState(false);

  const mainNavItems = [
    { icon: User, label: 'Olenna Mason', isProfile: true, avatarSrc: 'https://i.pravatar.cc/150?u=olenna' },
    { icon: Newspaper, label: 'News Feed', isActive: true },
    { icon: MessageCircle, label: 'Messenger' },
    { icon: PlaySquare, label: 'Watch' },
    { icon: Store, label: 'Marketplace' },
  ];

  const shortcuts = [{ icon: Gamepad2, label: 'FarmVille 2' }];

  const exploreItems = [
    { icon: CalendarDays, label: 'Events' },
    { icon: Flag, label: 'Pages' },
    { icon: Users, label: 'Groups' },
    { icon: ListChecks, label: 'Friend Lists' },
    { icon: HeartHandshake, label: 'Fundraisers' },
  ];

  const createItems = [
    { icon: PlusCircle, label: 'Ad' },
    { icon: PlusCircle, label: 'Page' }, // Reusing icon as per image context (generic create)
    { icon: PlusCircle, label: 'Group' },
    { icon: PlusCircle, label: 'Event' },
    { icon: PlusCircle, label: 'Fundraiser' },
  ];

  return (
    <nav className={cn('flex flex-col h-full bg-sidebar text-sidebar-foreground p-3 space-y-2 overflow-y-auto w-56 fixed top-[70px] left-0', className)}>
      {mainNavItems.map((item) => (
        item.isProfile ? (
          <Button key={item.label} variant="ghost" className="w-full justify-start text-sm font-medium px-2 py-2 h-auto hover:bg-secondary/80">
            <Avatar className="mr-3 h-7 w-7">
              <AvatarImage src={item.avatarSrc} alt={item.label} />
              <AvatarFallback>{item.label.substring(0, 1)}</AvatarFallback>
            </Avatar>
            {item.label}
          </Button>
        ) : (
          <NavItem key={item.label} icon={item.icon} label={item.label} isActive={item.isActive} />
        )
      ))}
      
      <Separator className="my-2" />

      <div>
        <h3 className="text-xs font-semibold text-muted-foreground uppercase px-2 mb-1">Shortcuts</h3>
        {shortcuts.map((item) => (
          <NavItem key={item.label} icon={item.icon} label={item.label} />
        ))}
      </div>

      <Separator className="my-2" />
      
      <div>
        <h3 className="text-xs font-semibold text-muted-foreground uppercase px-2 mb-1">Explore</h3>
        {exploreItems.slice(0, showMoreExplore ? exploreItems.length : 3).map((item) => (
          <NavItem key={item.label} icon={item.icon} label={item.label} />
        ))}
        <Button
          variant="ghost"
          className="w-full justify-start text-sm font-medium px-2 py-2 h-auto hover:bg-secondary/80 text-sidebar-foreground"
          onClick={() => setShowMoreExplore(!showMoreExplore)}
        >
          <ChevronDown className={cn("mr-3 h-5 w-5 transition-transform", showMoreExplore && "rotate-180")} />
          {showMoreExplore ? 'See Less' : 'See More...'}
        </Button>
      </div>

      <Separator className="my-2" />

      <div>
        <h3 className="text-xs font-semibold text-muted-foreground uppercase px-2 mb-1">Create</h3>
        {createItems.map((item) => (
          <NavItem key={item.label} icon={item.icon} label={item.label} />
        ))}
      </div>
      <div className="mt-auto p-2">
        <Button variant="ghost" className="w-full justify-start text-sm text-muted-foreground">
          <Settings className="mr-3 h-5 w-5" /> Privacy · Terms · Advertising
        </Button>
      </div>
    </nav>
  );
};

export default SidebarNav;
