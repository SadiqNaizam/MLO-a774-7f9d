import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, ThumbsUp, MessageSquare, Share2, Globe, Users, Bookmark, BellOff, XCircle } from 'lucide-react';

export interface PostData {
  id: string;
  userName: string;
  userAvatarUrl: string;
  timeAgo: string;
  privacy: 'public' | 'friends';
  content: string;
  imageUrl?: string;
  videoUrl?: string; // For potential video posts
  likes: number;
  comments: number;
  shares: number;
}

interface PostCardProps {
  post: PostData;
  className?: string;
}

const PostCard: React.FC<PostCardProps> = ({ post, className }) => {
  const [isLiked, setIsLiked] = React.useState(false);
  const [likesCount, setLikesCount] = React.useState(post.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev -1 : prev + 1);
  };

  const PrivacyIcon = post.privacy === 'public' ? Globe : Users;

  return (
    <Card className={cn('w-full shadow-md', className)}>
      <CardHeader className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={post.userAvatarUrl} alt={post.userName} />
              <AvatarFallback>{post.userName.substring(0, 1).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-sm text-card-foreground">{post.userName}</p>
              <div className="flex items-center text-xs text-muted-foreground">
                <span>{post.timeAgo}</span>
                <span className="mx-1">·</span>
                <PrivacyIcon className="h-3 w-3" />
              </div>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem><Bookmark className="mr-2 h-4 w-4"/> Save post</DropdownMenuItem>
              <DropdownMenuItem><BellOff className="mr-2 h-4 w-4"/> Turn off notifications</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
                <XCircle className="mr-2 h-4 w-4"/> Hide post
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-2 pt-0">
        <p className="text-sm text-card-foreground mb-3 whitespace-pre-wrap">{post.content}</p>
        {post.imageUrl && (
          <div className="rounded-lg overflow-hidden border max-h-[500px]">
            <img src={post.imageUrl} alt="Post content" className="w-full h-full object-cover" />
          </div>
        )}
        {/* Placeholder for video if needed */}
        {/* {post.videoUrl && <video src={post.videoUrl} controls className="w-full rounded-lg" />} */}
      </CardContent>
      <CardFooter className="p-4 pt-2 flex flex-col items-stretch gap-2">
        {(likesCount > 0 || post.comments > 0 || post.shares > 0) && (
        <div className="flex justify-between items-center text-xs text-muted-foreground mb-2">
            <div>{likesCount > 0 && `${likesCount} Likes`}</div>
            <div className="flex gap-2">
              {post.comments > 0 && `${post.comments} Comments`}
              {post.shares > 0 && `${post.shares} Shares`}
            </div>
          </div>
        )}
        <div className="grid grid-cols-3 gap-1 border-t pt-2">
          <Button variant="ghost" className={cn('text-muted-foreground hover:bg-secondary/50', isLiked && 'text-primary')} onClick={handleLike}>
            <ThumbsUp className={cn('mr-2 h-5 w-5', isLiked && 'fill-primary')} /> Like
          </Button>
          <Button variant="ghost" className="text-muted-foreground hover:bg-secondary/50">
            <MessageSquare className="mr-2 h-5 w-5" /> Comment
          </Button>
          <Button variant="ghost" className="text-muted-foreground hover:bg-secondary/50">
            <Share2 className="mr-2 h-5 w-5" /> Share
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
