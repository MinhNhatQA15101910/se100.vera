'use client';

import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';

const SongCard = ({
  title,
  artist,
  image,
}: {
  title: string;
  artist: string;
  image: string;
}) => {
  return (
    <Card className="bg-zinc-900/50 border-zinc-800 hover:bg-zinc-900/90 transition-colors">
      <CardContent className="p-4">
        <div className="aspect-square relative mb-3 rounded-md overflow-hidden">
          <Image
            src={image}
            alt={`${title} by ${artist}`}
            fill
            width={0}
            height={0}
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="space-y-1">
          <h3 className="font-semibold text-sm text-white truncate">{title}</h3>
          <p className="text-xs text-gray-400 truncate">{artist}</p>
        </div>
      </CardContent>
    </Card>
  );
};

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

const weeklyTopSongs = [
  {
    title: 'Whatever It Takes',
    artist: 'Imagine Dragons',
    image: 'https://picsum.photos/400/400?random=1',
  },
  {
    title: 'Skyfall',
    artist: 'Adele',
    image: 'https://picsum.photos/400/400?random=2',
  },
  {
    title: 'Superman',
    artist: 'Eminem',
    image: 'https://picsum.photos/400/400?random=13',
  },
  {
    title: 'Softcore',
    artist: 'The Neighborhood',
    image: 'https://picsum.photos/400/400?random=34',
  },
  {
    title: 'Softcore',
    artist: 'The Neighborhood',
    image: 'https://picsum.photos/400/400?random=45',
  },
  {
    title: 'Softcore',
    artist: 'The Neighborhood',
    image: 'https://picsum.photos/400/400?random=6',
  },
  {
    title: 'Softcore',
    artist: 'The Neighborhood',
    image: 'https://picsum.photos/400/400?random=8',
  },
  {
    title: 'Softcore',
    artist: 'The Neighborhood',
    image: 'https://picsum.photos/400/400?random=9',
  },
  {
    title: 'Softcore',
    artist: 'The Neighborhood',
    image: 'https://picsum.photos/400/400?random=42',
  },
];

const newReleaseSongs = [
  {
    title: 'Time',
    artist: 'Luciano',
    image: 'https://picsum.photos/400/400?random=5',
  },
  {
    title: '112',
    artist: 'jazzek',
    image: 'https://picsum.photos/400/400?random=6',
  },
];

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
              <SongCard
                key={index}
                title={song.title}
                artist={song.artist}
                image={song.image}
              />
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
              <SongCard
                key={index}
                title={song.title}
                artist={song.artist}
                image={song.image}
              />
            ))}
            <ViewAllCard />
          </div>
        </section>
      </div>
    </div>
  );
};

export default MusicCards;
