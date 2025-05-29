import React from 'react';
import MainAppLayout from '../components/layout/MainAppLayout';
import PostInputCard from '../components/NewsFeed/PostInputCard';
import PostCard, { type PostData } from '../components/NewsFeed/PostCard';
import StoriesWidget from '../components/StoriesWidget/StoriesWidget';
import SuggestedGroupsWidget from '../components/SuggestedGroupsWidget/SuggestedGroupsWidget';
import ChatSidebar from '../components/ChatWidget/ChatSidebar';

const postsData: PostData[] = [
  {
    id: 'post1',
    userName: 'Julia Fillory',
    userAvatarUrl: 'https://i.pravatar.cc/150?u=julia',
    timeAgo: '2 hrs ago',
    privacy: 'friends' as const,
    content: 'Checking out some new stores downtown! Raleigh is buzzing today. Found a great coffee shop, highly recommend "The Daily Grind".',
    imageUrl: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=600&auto=format&fit=crop',
    likes: 152,
    comments: 34,
    shares: 12
  },
  {
    id: 'post2',
    userName: 'Alex Chen',
    userAvatarUrl: 'https://i.pravatar.cc/150?u=alex',
    timeAgo: '5 hrs ago',
    privacy: 'public' as const,
    content: "Just finished a marathon of \"The Expanse\"! What an incredible show. The character development, the plot, the visuals - all top-notch. Highly recommend it if you're into epic sci-fi. 🚀🌌 Who's your favorite character? #TheExpanse #SciFi #TVShows",
    likes: 98,
    comments: 22,
    shares: 5
  },
  {
    id: 'post3',
    userName: 'Olenna Mason',
    userAvatarUrl: 'https://i.pravatar.cc/150?u=olenna',
    timeAgo: '1 day ago',
    privacy: 'public' as const,
    content: 'Had a wonderful time at the park today. Perfect weather for a long walk and some thinking. Sometimes, the simplest things are the most enjoyable. Feeling refreshed and ready for the week! ☀️\nWhat are your favorite ways to unwind?',
    imageUrl: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=600&auto=format&fit=crop',
    likes: 230,
    comments: 45,
    shares: 18
  },
  {
    id: 'post4',
    userName: 'Tech Weekly Digest',
    userAvatarUrl: 'https://i.pravatar.cc/150?u=techdigestpage',
    timeAgo: '3 days ago',
    privacy: 'public' as const,
    content: 'Exciting news in the world of AI! A new language model has been released that shows groundbreaking capabilities in creative text generation and problem-solving. Read more on our blog. #AI #TechNews #Innovation',
    likes: 540,
    comments: 112,
    shares: 67
  }
];

const NewsFeedPage: React.FC = () => {
  const rightSidebarContent = (
    <>
      <StoriesWidget />
      <SuggestedGroupsWidget />
      {/* ChatSidebar is rendered separately due to its fixed positioning relative to viewport */}
    </>
  );

  const mainContent = (
    <>
      <PostInputCard userName="Olenna" userAvatarUrl="https://i.pravatar.cc/150?u=olenna" />
      {postsData.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </>
  );

  return (
    <>
      <MainAppLayout rightSidebarContent={rightSidebarContent}>
        {mainContent}
      </MainAppLayout>
      {/* ChatSidebar is rendered here so it's part of the page, 
          but its internal fixed styling will position it correctly on the viewport. */}
      <ChatSidebar /> 
    </>
  );
};

export default NewsFeedPage;