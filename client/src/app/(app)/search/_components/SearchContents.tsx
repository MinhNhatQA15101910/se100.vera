'use client';

import React from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Search from './Search';
import SongList from './SongList';
import AlbumList from './AlbumList';

const SearchContents = () => {
  const [keyword, setKeywords] = React.useState<string>('');

  return (
    <div className="flex flex-col w-[90%]">
      <Search setKeyword={setKeywords} />

      <Tabs defaultValue="songs" className="w-full">
        <TabsList className="flex space-x-8 text-gray-400 border-b border-gray-700 pb-2 mb-5 bg-transparent items-start justify-start rounded-none">
          <TabsTrigger
            value="songs"
            className="data-[state=active]:text-pink-500 data-[state=active]:font-semibold hover:text-pink-500 transition duration-200"
          >
            Songs
          </TabsTrigger>
          <TabsTrigger
            value="albums"
            className="data-[state=active]:text-pink-500 data-[state=active]:font-semibold hover:text-pink-500 transition duration-200"
          >
            Albums
          </TabsTrigger>
        </TabsList>

        <TabsContent value="songs">
          <SongList keyword={keyword} />
        </TabsContent>

        <TabsContent value="albums">
          <AlbumList keyword={keyword} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SearchContents;
