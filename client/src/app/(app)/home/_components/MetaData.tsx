'use client';

import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AppButton } from '@/components/ui/AppButton';
import Image from 'next/image';
import { Plus } from 'lucide-react';

const artists = [
  { name: 'Eminem', image: 'https://picsum.photos/400/400?random=1' },
  { name: 'The Weekend', image: 'https://picsum.photos/400/400?random=2' },
  { name: 'Adele', image: 'https://picsum.photos/400/400?random=3' },
  { name: 'Lana Del Ray', image: 'https://picsum.photos/400/400?random=4' },
  { name: 'Harry Styles', image: 'https://picsum.photos/400/400?random=5' },
  { name: 'Billie Eilish', image: 'https://picsum.photos/400/400?random=6' },
];

const albums = [
  {
    title: 'Adele 21',
    artist: 'Adele',
    image: 'https://picsum.photos/400/400?random=7',
  },
  {
    title: 'Scorpion',
    artist: 'Drake',
    image: 'https://picsum.photos/400/400?random=8',
  },
  {
    title: "Harry's House",
    artist: 'Harry Styles',
    image: 'https://picsum.photos/400/400?random=9',
  },
  {
    title: 'Born To Die',
    artist: 'Lana Del Rey',
    image: 'https://picsum.photos/400/400?random=10',
  },
  {
    title: 'Beauty Behind the...',
    artist: 'The Weekend',
    image: 'https://picsum.photos/400/400?random=11',
  },
];

const playlist = [
  {
    title: 'My Favorites',
    image: 'https://picsum.photos/400/400?random=12',
  },
  {
    title: 'Workout Mix',
    image: 'https://picsum.photos/400/400?random=13',
  },
  {
    title: 'Chill Vibes',
    image: 'https://picsum.photos/400/400?random=14',
  },
  {
    title: 'Party Time',
    image: 'https://picsum.photos/400/400?random=15',
  },
  {
    title: 'Study Focus',
    image: 'https://picsum.photos/400/400?random=16',
  },
];

export default function MetaData() {
  return (
    <div className="text-white p-6 space-y-8 w-[90%] flex flex-col ">
      <section>
        <CardHeader>
          <CardTitle className="text-2xl">
            Popular <span className="text-pink-500">Artists</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center space-x-4 overflow-x-auto">
          {artists.map((artist) => (
            <div key={artist.name} className="flex flex-col items-center">
              <Image
                src={artist.image}
                alt={artist.name}
                width={77}
                height={77}
                className="object-cover rounded-full"
              />
              <span className="mt-2">{artist.name}</span>
            </div>
          ))}
          <AppButton className="flex-shrink-0">
            <Plus />
            View All
          </AppButton>
        </CardContent>
      </section>

      <section>
        <CardHeader>
          <CardTitle className="text-2xl">
            Top <span className="text-pink-500">Albums</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center space-x-4 overflow-x-auto">
          {albums.map((album) => (
            <div key={album.title} className="flex flex-col items-center">
              <Image
                src={album.image}
                alt={album.title}
                width={0}
                height={0}
                className="w-32 h-32 rounded-lg"
              />
              <span className="mt-2">{album.title}</span>
              <span className="text-sm text-gray-400">{album.artist}</span>
            </div>
          ))}
          <AppButton className="flex-shrink-0">
            <Plus />
            View All
          </AppButton>
        </CardContent>
      </section>

      <section>
        <CardHeader>
          <CardTitle className="text-2xl">
            Mood <span className="text-pink-500">Playlists</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center space-x-4 overflow-x-auto">
          {playlist.map((album) => (
            <div key={album.title} className="flex flex-col items-center">
              <Image
                src={album.image}
                alt={album.title}
                width={0}
                height={0}
                className="w-32 h-32 rounded-lg"
              />
              <span className="mt-2">{album.title}</span>
            </div>
          ))}
          <AppButton className="flex-shrink-0">
            <Plus />
            View All
          </AppButton>
        </CardContent>
      </section>
    </div>
  );
}
