import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Facebook,
  Search,
  Home,
  Users,
  Tv2, // Using Tv2 for 'Watch' as PlaySquare might be used elsewhere
  Store,
  Gamepad2,
  Plus,
  MessageCircle,
  Bell,
  ChevronDown,
  LogOut,
  UserCircle,
  Settings
} from 'lucide-react';

interface TopHeaderProps {
  className?: string;
}

const TopHeader: React.FC<TopHeaderProps> = ({ className }) => {
  const [activeNav, setActiveNav] = React.useState<'home' | 'friends' | 'watch' | 'market' | 'games'>('home');

  const navItems = [
    { id: 'home' as const, icon: Home, label: 'Home' },
    { id: 'friends' as const, icon: Users, label: 'Friends' },
    { id: 'watch' as const, icon: Tv2, label: 'Watch' },
    { id: 'market' as const, icon: Store, label: 'Marketplace' },
    { id: 'games' as const, icon: Gamepad2, label: 'Gaming' },
  ];

  return (
    <header className={cn('fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 h-[70px] bg-card shadow-sm border-b', className)}>
      {/* Left Section: Logo and Search */} 
      <div className="flex items-center gap-2">
        <Facebook className="h-10 w-10 text-primary" />
        <div className="relative ml-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Search Facebook" 
            className="pl-10 pr-3 py-2 h-10 w-60 rounded-full bg-background focus-visible:ring-primary"
          />
        </div>
      </div>

      {/* Center Section: Navigation Tabs */} 
      <nav className="hidden md:flex items-center gap-2">
        {navItems.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            onClick={() => setActiveNav(item.id)}
            className={cn(
              'h-14 w-24 rounded-none border-b-4 flex-col items-center justify-center',
              activeNav === item.id 
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:bg-secondary/80'
            )}
          >
            <item.icon className={cn('h-6 w-6', activeNav === item.id ? 'text-primary' : 'text-muted-foreground')} />
          </Button>
        ))}
      </nav>

      {/* Right Section: Actions and User Profile */} 
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="rounded-full bg-secondary/50 hover:bg-secondary/80 w-10 h-10">
          <Plus className="h-5 w-5 text-foreground" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full bg-secondary/50 hover:bg-secondary/80 w-10 h-10">
          <MessageCircle className="h-5 w-5 text-foreground" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full bg-secondary/50 hover:bg-secondary/80 w-10 h-10 relative">
          <Bell className="h-5 w-5 text-foreground" />
          <span className="absolute top-1 right-1 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
          </span>
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full w-10 h-10">
              <Avatar className="h-9 w-9">
                <AvatarImage src="https://i.pravatar.cc/150?u=olenna" alt="Olenna Mason" />
                <AvatarFallback>OM</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex items-center gap-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="https://i.pravatar.cc/150?u=olenna" alt="Olenna Mason" />
                  <AvatarFallback>OM</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">Olenna Mason</p>
                  <p className="text-xs text-muted-foreground">See your profile</p>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings & Privacy</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <UserCircle className="mr-2 h-4 w-4" />
              <span>Help & Support</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default TopHeader;
