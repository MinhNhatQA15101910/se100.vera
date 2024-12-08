'use client';

import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';
import SongCard from '@/components/music/SongCard';

import { weeklyTopSongs, newReleaseSongs } from '@/actions/song-actions';

const ViewAllCard = () => {
  return (
    <Card className="bg-zinc-900/50 border-zinc-800 hover:bg-zinc-900/90 transition-colors">
      <CardContent className="p-4 h-full flex flex-col justify-center items-center cursor-pointer">
        <ChevronRight className="h-8 w-8 text-pink-500 mb-2" />
        <p className="text-sm font-semibold text-pink-500">View All</p>
      </CardContent>
    </Card>
  );
};

const MusicCards = () => {
  return (
    <div className="w-[90%] flex flex-col bg-transparent text-general-white">
      <div className="flex flex-col w-full space-y-4">
        {/* Weekly Top Songs */}
        <section>
          <h2 className="text-2xl font-bold mb-4">
            Weekly Top <span className="text-pink-500">Songs</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {weeklyTopSongs.slice(0, 5).map((song, index) => (
              <SongCard key={index} song={song} />
            ))}
            <ViewAllCard />
          </div>
        </section>

        {/* New Release Songs */}
        <section>
          <h2 className="text-2xl font-bold mb-4">
            New Release <span className="text-pink-500">Songs</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {newReleaseSongs.slice(0, 5).map((song, index) => (
              <SongCard key={index} song={song} />
            ))}
            <ViewAllCard />
          </div>
        </section>
      </div>
    </div>
  );
};

export default MusicCards;
