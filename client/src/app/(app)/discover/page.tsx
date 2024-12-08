import ChoosePlaylistCard from "@/components/ui/ChoosePlaylistCard";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TrendingSongs from "./_components/TrendingSongs";


const MainContent = () => {
  return (
    <div className="bg-[#141414] flex w-full p-10 text-white">
      <Tabs defaultValue="trending" className="w-full">
        <TabsList className="flex space-x-8 text-gray-400 border-b border-gray-700 pb-2 mb-5 bg-transparent">
          <TabsTrigger 
            value="trending"
            className="data-[state=active]:text-pink-500 data-[state=active]:font-semibold hover:text-pink-500 transition"
          >
            Trending Songs
          </TabsTrigger>
          <TabsTrigger 
            value="albums"
            className="data-[state=active]:text-pink-500 data-[state=active]:font-semibold hover:text-pink-500 transition"
          >
            Top Albums
          </TabsTrigger>
          <TabsTrigger 
            value="artists"
            className="data-[state=active]:text-pink-500 data-[state=active]:font-semibold hover:text-pink-500 transition"
          >
            Popular Artists
          </TabsTrigger>
          <TabsTrigger 
            value="mood"
            className="data-[state=active]:text-pink-500 data-[state=active]:font-semibold hover:text-pink-500 transition"
          >
            Mood Playlist
          </TabsTrigger>
        </TabsList>

        <TabsContent value="trending">
          <TrendingSongs />
        </TabsContent>

        <TabsContent value="albums">
          <h2 className="text-3xl font-bold mb-5">Top Albums</h2>
        </TabsContent>

        <TabsContent value="artists">
          <h2 className="text-3xl font-bold mb-5">Popular Artists</h2>
        </TabsContent>

        <TabsContent value="mood">
          <h2 className="text-3xl font-bold mb-5">Mood Playlist</h2>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Main Page component
const Page = () => (
  <div className="flex h-screen w-full overflow-hidden">
    <div className="flex flex-col w-full overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <MainContent />
        <ChoosePlaylistCard />
      </div>
    </div>
  </div>
);

export default Page;
