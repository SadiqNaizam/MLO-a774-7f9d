import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { PlusCircle, Archive, Settings2 } from 'lucide-react';

interface Story {
  id: string;
  userName: string;
  userAvatarUrl: string;
  storyImageUrl: string; // URL of the story preview image
  viewed?: boolean;
}

interface StoriesWidgetProps {
  className?: string;
}

const storiesData: Story[] = [
  { id: 's1', userName: 'Jane Doe', userAvatarUrl: 'https://i.pravatar.cc/150?u=jane', storyImageUrl: 'https://picsum.photos/seed/story1/200/300', viewed: true },
  { id: 's2', userName: 'John Smith', userAvatarUrl: 'https://i.pravatar.cc/150?u=john', storyImageUrl: 'https://picsum.photos/seed/story2/200/300' },
  { id: 's3', userName: 'Alice Brown', userAvatarUrl: 'https://i.pravatar.cc/150?u=alice', storyImageUrl: 'https://picsum.photos/seed/story3/200/300' },
  { id: 's4', userName: 'Bob Green', userAvatarUrl: 'https://i.pravatar.cc/150?u=bob', storyImageUrl: 'https://picsum.photos/seed/story4/200/300', viewed: true },
  { id: 's5', userName: 'Carol White', userAvatarUrl: 'https://i.pravatar.cc/150?u=carol', storyImageUrl: 'https://picsum.photos/seed/story5/200/300' },
];

const StoriesWidget: React.FC<StoriesWidgetProps> = ({ className }) => {
  return (
    <Card className={cn('w-full shadow-md', className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
        <CardTitle className="text-lg font-semibold">Stories</CardTitle>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="text-xs text-primary hover:bg-primary/10 px-2">
            <Archive className="mr-1 h-4 w-4" /> Archive
          </Button>
          <Button variant="ghost" size="sm" className="text-xs text-primary hover:bg-primary/10 px-2">
            <Settings2 className="mr-1 h-4 w-4" /> Settings
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex space-x-3 pb-3">
            {/* Add to Your Story Card */}
            <div className="flex-shrink-0 w-[110px] h-[180px] rounded-lg overflow-hidden relative cursor-pointer group border border-dashed hover:border-primary">
              <img src="https://i.pravatar.cc/150?u=olenna_story_bg" alt="Add story background" className="w-full h-full object-cover opacity-50"/>
              <div className="absolute inset-0 flex flex-col items-center justify-end p-2 bg-black/10">
                <div className="absolute top-2 right-2 bg-primary rounded-full p-1">
                     <PlusCircle className="h-6 w-6 text-primary-foreground" />
                </div>
                <p className="text-xs font-medium text-center text-card-foreground mt-auto">Add to Your Story</p>
              </div>
            </div>

            {/* Friend Stories */}
            {storiesData.map((story) => (
              <div key={story.id} className="flex-shrink-0 w-[110px] h-[180px] rounded-lg overflow-hidden relative cursor-pointer group">
                <img src={story.storyImageUrl} alt={`${story.userName}'s story`} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                <div className={cn(
                  'absolute top-2 left-2 rounded-full p-0.5 bg-card',
                  story.viewed ? 'ring-2 ring-gray-300' : 'ring-2 ring-primary'
                )}>
                  <Avatar className="h-8 w-8 border-2 border-card">
                    <AvatarImage src={story.userAvatarUrl} alt={story.userName} />
                    <AvatarFallback>{story.userName.substring(0, 1).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
                  <p className="text-xs font-medium text-white truncate">{story.userName}</p>
                </div>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default StoriesWidget;
