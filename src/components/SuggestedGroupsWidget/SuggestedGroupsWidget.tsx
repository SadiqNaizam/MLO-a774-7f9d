import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Users } from 'lucide-react';

interface GroupSuggestion {
  id: string;
  name: string;
  memberCount: number;
  coverImageUrl: string;
  mutualFriends?: number;
}

interface SuggestedGroupsWidgetProps {
  className?: string;
}

const suggestedGroupsData: GroupSuggestion[] = [
  {
    id: 'g1',
    name: 'Mad Men (MADdicts)',
    memberCount: 6195,
    coverImageUrl: 'https://picsum.photos/seed/madmen/300/100',
    mutualFriends: 5,
  },
  {
    id: 'g2',
    name: 'Dexter Morgan Fans',
    memberCount: 6984,
    coverImageUrl: 'https://picsum.photos/seed/dexter/300/100',
  },
  {
    id: 'g3',
    name: 'React Developers Community',
    memberCount: 120300,
    coverImageUrl: 'https://picsum.photos/seed/reactdev/300/100',
    mutualFriends: 12,
  },
];

const SuggestedGroupsWidget: React.FC<SuggestedGroupsWidgetProps> = ({ className }) => {
  return (
    <Card className={cn('w-full shadow-md', className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
        <CardTitle className="text-lg font-semibold">Suggested Groups</CardTitle>
        <Button variant="link" size="sm" className="text-xs text-primary px-0 h-auto">
          See All
        </Button>
      </CardHeader>
      <CardContent className="p-4 pt-2 space-y-3">
        {suggestedGroupsData.map((group) => (
          <div key={group.id} className="flex items-center gap-3 p-1 rounded-md hover:bg-secondary/30 transition-colors">
            <Avatar className="h-16 w-24 rounded-md" variant="square"> {/* Using Avatar for rectangular image */}
              <AvatarImage src={group.coverImageUrl} alt={group.name} className="object-cover" />
              <AvatarFallback className="bg-muted rounded-md flex items-center justify-center">
                <Users className="h-8 w-8 text-muted-foreground" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate text-card-foreground">{group.name}</p>
              <p className="text-xs text-muted-foreground">
                {group.memberCount.toLocaleString()} members
                {group.mutualFriends && ` · ${group.mutualFriends} mutual friends`}
              </p>
            </div>
            <Button variant="outline" size="sm" className="shrink-0 h-8 text-primary border-primary hover:bg-primary/10 hover:text-primary">
              <Plus className="mr-1 h-4 w-4" /> Join
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default SuggestedGroupsWidget;
