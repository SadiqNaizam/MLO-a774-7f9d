import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Edit3, Filter, Settings2, Circle, Search, MessageSquarePlus } from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  avatarUrl: string;
  isOnline: boolean;
  lastMessage?: string;
  unreadCount?: number;
}

interface ChatSidebarProps {
  className?: string;
}

const contactsData: Contact[] = [
  {
    id: 'c1',
    name: 'Alice Wonderland',
    avatarUrl: 'https://i.pravatar.cc/150?u=alice_chat',
    isOnline: true,
    lastMessage: 'See you soon!',
    unreadCount: 2
  },
  {
    id: 'c2',
    name: 'Bob The Builder',
    avatarUrl: 'https://i.pravatar.cc/150?u=bob_chat',
    isOnline: false,
    lastMessage: 'Can we fix it?'
  },
  {
    id: 'c3',
    name: 'Charlie Chaplin',
    avatarUrl: 'https://i.pravatar.cc/150?u=charlie_chat',
    isOnline: true,
    lastMessage: 'A day without laughter is a day wasted.',
  },
  {
    id: 'c4',
    name: 'Diana Prince',
    avatarUrl: 'https://i.pravatar.cc/150?u=diana_chat',
    isOnline: true,
    unreadCount: 1
  },
  {
    id: 'c5',
    name: 'Edward Scissorhands',
    avatarUrl: 'https://i.pravatar.cc/150?u=edward_chat',
    isOnline: false,
    lastMessage: 'Hold me.'
  },
];

const ChatSidebar: React.FC<ChatSidebarProps> = ({ className }) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredContacts = contactsData.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // This component would typically be part of a larger layout, potentially fixed to bottom right or within a right sidebar column.
  // For this implementation, it's a self-contained card-like structure.
  return (
    <div className={cn('w-full bg-card shadow-md rounded-lg flex flex-col h-[calc(100vh-80px-1rem)] max-h-[500px] fixed bottom-4 right-4 w-80', className)}>
      <header className="p-3 border-b">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-card-foreground">Chat</h2>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:bg-secondary/50">
              <MessageSquarePlus className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:bg-secondary/50">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:bg-secondary/50">
              <Settings2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Search contacts..." 
            className="pl-8 pr-3 py-2 h-9 rounded-md bg-background focus-visible:ring-primary text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>
      
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {filteredContacts.length > 0 ? (
            filteredContacts.map((contact) => (
            <Button
              key={contact.id}
              variant="ghost"
              className="w-full h-auto justify-start p-2 hover:bg-secondary/50 rounded-md"
            >
              <div className="relative mr-3">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={contact.avatarUrl} alt={contact.name} />
                  <AvatarFallback>{contact.name.substring(0, 1).toUpperCase()}</AvatarFallback>
                </Avatar>
                {contact.isOnline && (
                  <Circle className="absolute bottom-0 right-0 h-3 w-3 fill-green-500 stroke-green-500 border-2 border-card rounded-full" />
                )}
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p className="text-sm font-medium text-card-foreground truncate">{contact.name}</p>
                {contact.lastMessage && <p className="text-xs text-muted-foreground truncate">{contact.lastMessage}</p>}
              </div>
              {contact.unreadCount && contact.unreadCount > 0 && (
                <span className="ml-auto text-xs bg-primary text-primary-foreground rounded-full px-1.5 py-0.5 font-medium">
                  {contact.unreadCount}
                </span>
              )}
            </Button>
          )))
          : (
            <p className="text-sm text-muted-foreground text-center py-4">No contacts found.</p>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ChatSidebar;
