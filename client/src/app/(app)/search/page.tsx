'use client';

import SongCard from '@/components/music/SongCard';
import AlbumCard from '@/components/ui/AlbumCard';
import ArtistCard from '@/components/ui/ArtistCard';
import { Song } from '@/types/global';

const songResult: Song[] = [
  {
    id: 1,
    songName: 'Adele 21',
    description: 'The debut album by Adele',
    totalListeningHours: 500,
    musicUrl: 'https://via.placeholder.com/200',
    musicPublicId: 'adele-21',
    lyricUrl: null,
  },
  {
    id: 2,
    songName: 'Scorpion',
    description: 'Drake’s iconic album',
    totalListeningHours: 800,
    musicUrl: 'https://via.placeholder.com/200',
    musicPublicId: 'scorpion',
    lyricUrl: null,
  },
  {
    id: 1,
    songName: 'Adele 21',
    description: 'The debut album by Adele',
    totalListeningHours: 500,
    musicUrl: 'https://via.placeholder.com/200',
    musicPublicId: 'adele-21',
    lyricUrl: null,
  },
  {
    id: 2,
    songName: 'Scorpion',
    description: 'Drake’s iconic album',
    totalListeningHours: 800,
    musicUrl: 'https://via.placeholder.com/200',
    musicPublicId: 'scorpion',
    lyricUrl: null,
  },
  {
    id: 1,
    songName: 'Adele 21',
    description: 'The debut album by Adele',
    totalListeningHours: 500,
    musicUrl: 'https://via.placeholder.com/200',
    musicPublicId: 'adele-21',
    lyricUrl: null,
  },
  {
    id: 2,
    songName: 'Scorpion',
    description: 'Drake’s iconic album',
    totalListeningHours: 800,
    musicUrl: 'https://via.placeholder.com/200',
    musicPublicId: 'scorpion',
    lyricUrl: null,
  },
  {
    id: 1,
    songName: 'Adele 21',
    description: 'The debut album by Adele',
    totalListeningHours: 500,
    musicUrl: 'https://via.placeholder.com/200',
    musicPublicId: 'adele-21',
    lyricUrl: null,
  },
  {
    id: 2,
    songName: 'Scorpion',
    description: 'Drake’s iconic album',
    totalListeningHours: 800,
    musicUrl: 'https://via.placeholder.com/200',
    musicPublicId: 'scorpion',
    lyricUrl: null,
  },
];

const artistResults = [
  { id: 1, image: 'https://via.placeholder.com/200', name: 'Adele' },
  { id: 2, image: 'https://via.placeholder.com/200', name: 'Drake' },
  { id: 3, image: 'https://via.placeholder.com/200', name: 'Harry Styles' },
  { id: 4, image: 'https://via.placeholder.com/200', name: 'Lana Del Rey' },
  { id: 5, image: 'https://via.placeholder.com/200', name: 'The Weeknd' },
  { id: 6, image: 'https://via.placeholder.com/200', name: 'The Weeknd' },
];

const albumsResults = [
  {
    id: 1,
    image: 'https://via.placeholder.com/200',
    title: 'Adele 21',
    artist: 'Adele',
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/200',
    title: 'Scorpion',
    artist: 'Drake',
  },
  {
    id: 1,
    image: 'https://via.placeholder.com/200',
    title: 'Adele 21',
    artist: 'Adele',
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/200',
    title: 'Scorpion',
    artist: 'Drake',
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/200',
    title: 'Scorpion',
    artist: 'Drake',
  },
];

export default function AlbumsPage() {
  return (
    <div className="flex min-h-screen w-full overflow-hidden">
      <div className="flex flex-col w-full overflow-hidden">
        <div className="bg-[#181818] min-h-screen text-white overflow-y-auto">
          <div className="max-w-6xl mx-auto py-8 px-4">
            <div className="mb-24">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  <span className="text-white">Song</span>{' '}
                  <span className="text-[#EE10B0]">Results</span>
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                {songResult.map((song) => (
                  <SongCard key={song.id} song={song} />
                ))}
              </div>
            </div>
            <div className="mb-24">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  <span className="text-white">Artist</span>{' '}
                  <span className="text-[#EE10B0]">Results</span>
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                {artistResults.map((artist) => (
                  <ArtistCard
                    key={artist.id}
                    imageUrl={artist.image}
                    name={artist.name}
                  />
                ))}
              </div>
            </div>
            <div className="mb-24">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  <span className="text-white">Top</span>{' '}
                  <span className="text-[#EE10B0]">Albums</span>
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                {albumsResults.map((album) => (
                  <AlbumCard
                    key={album.id}
                    image={album.image}
                    title={album.title}
                    artist={album.artist}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
