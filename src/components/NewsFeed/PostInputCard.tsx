import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Edit3, ImagePlus, Video, UserTag, Smile, ListOrdered, MoreHorizontal } from 'lucide-react';

interface PostInputCardProps {
  userName?: string;
  userAvatarUrl?: string;
  className?: string;
}

const PostInputCard: React.FC<PostInputCardProps> = ({
  userName = 'Olenna',
  userAvatarUrl = 'https://i.pravatar.cc/150?u=olenna',
  className,
}) => {
  const [activeTab, setActiveTab] = React.useState<'post' | 'album' | 'live'>('post');

  const topActionButtons = [
    { id: 'post' as const, label: 'Make Post', icon: Edit3 },
    { id: 'album' as const, label: 'Photo/Video Album', icon: ImagePlus },
    { id: 'live' as const, label: 'Live Video', icon: Video },
  ];

  const bottomActionButtons = [
    { label: 'List', icon: ListOrdered, color: 'text-blue-500' },
    { label: 'Photo/Video', icon: ImagePlus, color: 'text-green-500' },
    { label: 'Tag Friends', icon: UserTag, color: 'text-yellow-500' },
    // { label: 'Feeling/Activity', icon: Smile, color: 'text-orange-500' }, // As per design variation
  ];

  return (
    <Card className={cn('w-full shadow-md', className)}>
      <div className="flex border-b">
        {topActionButtons.map((action) => (
          <Button
            key={action.id}
            variant="ghost"
            onClick={() => setActiveTab(action.id)}
            className={cn(
              'flex-1 rounded-none py-3 text-sm font-medium',
              activeTab === action.id
                ? 'text-primary border-b-2 border-primary'
                : 'text-muted-foreground hover:bg-secondary/50'
            )}
          >
            <action.icon className={cn('mr-2 h-5 w-5', activeTab === action.id ? 'text-primary' : 'text-muted-foreground')} />
            {action.label}
          </Button>
        ))}
      </div>
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={userAvatarUrl} alt={userName} />
            <AvatarFallback>{userName.substring(0, 1).toUpperCase()}</AvatarFallback>
          </Avatar>
          <Input
            placeholder={`What's on your mind, ${userName}?`}
            className="flex-1 h-10 bg-background rounded-full border-none focus-visible:ring-1 focus-visible:ring-primary px-4 text-base"
          />
        </div>
        <Separator className="my-3" /> 
        <div className="flex justify-around items-center">
          {bottomActionButtons.map((action) => (
            <Button key={action.label} variant="ghost" className="text-muted-foreground hover:bg-secondary/50 flex-1">
              <action.icon className={cn('mr-2 h-5 w-5', action.color)} />
              <span className="text-sm font-medium">{action.label}</span>
            </Button>
          ))}
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:bg-secondary/50">
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostInputCard;
