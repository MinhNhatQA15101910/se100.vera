"use client"

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRouter } from 'next/navigation';

const TabsLayout = () => {
  const router = useRouter();

  return (
    <div className="flex w-full p-10 text-white">
      <Tabs defaultValue="trending" className="w-full">
        <TabsList className="flex space-x-8 text-gray-400 border-b border-gray-700 pb-2 mb-5 bg-transparent items-start justify-start rounded-none">
          <TabsTrigger
            value="trending"
            className="data-[state=active]:text-pink-500 data-[state=active]:font-semibold hover:text-pink-500 transition duration-200"
            onClick={() => {
                router.push('/discover/trending-songs')
            }}
          >
            Trending Songs
          </TabsTrigger>
          <TabsTrigger
            value="albums"
            className="data-[state=active]:text-pink-500 data-[state=active]:font-semibold hover:text-pink-500 transition duration-200"
            onClick={() => {
                router.push('/discover/top-albums')
            }}
          >
            Top Albums
          </TabsTrigger>
          <TabsTrigger
            value="artists"
            className="data-[state=active]:text-pink-500 data-[state=active]:font-semibold hover:text-pink-500 transition duration-200"
            onClick={() => {
                router.push('/discover/popular-artists')
            }}
          >
            Popular Artists
          </TabsTrigger>
          <TabsTrigger
            value="mood"
            className="data-[state=active]:text-pink-500 data-[state=active]:font-semibold hover:text-pink-500 transition duration-200"
            onClick={() => {
                router.push('/discover/mood-playlists')
            }}
          >
            Mood Playlist
          </TabsTrigger>
        </TabsList>

        <TabsContent value="trending"></TabsContent>

        <TabsContent value="albums"></TabsContent>

        <TabsContent value="artists"></TabsContent>

        <TabsContent value="mood"></TabsContent>
      </Tabs>
    </div>
  );
};

export default TabsLayout;
