'use client';
import ArtistCard from '@/components/ui/ArtistCard';

const topArtists = [
  { id: 1, image: 'https://via.placeholder.com/200', name: 'Adele' },
  { id: 2, image: 'https://via.placeholder.com/200', name: 'Drake' },
  { id: 3, image: 'https://via.placeholder.com/200', name: 'Harry Styles' },
  { id: 4, image: 'https://via.placeholder.com/200', name: 'Lana Del Rey' },
  { id: 5, image: 'https://via.placeholder.com/200', name: 'The Weeknd' },
  { id: 6, image: 'https://via.placeholder.com/200', name: 'The Weeknd' },
];

const newReleaseArtists = [
  { id: 6, image: 'https://via.placeholder.com/200', name: 'Michael Jackson' },
  { id: 7, image: 'https://via.placeholder.com/200', name: 'Beyoncé' },
  { id: 8, image: 'https://via.placeholder.com/200', name: 'Taylor Swift' },
  { id: 9, image: 'https://via.placeholder.com/200', name: 'Ed Sheeran' },
  { id: 10, image: 'https://via.placeholder.com/200', name: 'Justin Bieber' },
];

const allArtists = [
  { id: 11, image: 'https://via.placeholder.com/200', name: 'Bruno Mars' },
  { id: 12, image: 'https://via.placeholder.com/200', name: 'Eminem' },
  { id: 13, image: 'https://via.placeholder.com/200', name: 'Rihanna' },
  { id: 14, image: 'https://via.placeholder.com/200', name: 'Lady Gaga' },
  { id: 10, image: 'https://via.placeholder.com/200', name: 'Justin Bieber' },
  { id: 15, image: 'https://via.placeholder.com/200', name: 'Shawn Mendes' },
  { id: 11, image: 'https://via.placeholder.com/200', name: 'Bruno Mars' },
  { id: 12, image: 'https://via.placeholder.com/200', name: 'Eminem' },
  { id: 13, image: 'https://via.placeholder.com/200', name: 'Rihanna' },
  { id: 14, image: 'https://via.placeholder.com/200', name: 'Lady Gaga' },
  { id: 10, image: 'https://via.placeholder.com/200', name: 'Justin Bieber' },
  { id: 15, image: 'https://via.placeholder.com/200', name: 'Shawn Mendes' },
  { id: 11, image: 'https://via.placeholder.com/200', name: 'Bruno Mars' },
  { id: 12, image: 'https://via.placeholder.com/200', name: 'Eminem' },
  { id: 13, image: 'https://via.placeholder.com/200', name: 'Rihanna' },
  { id: 14, image: 'https://via.placeholder.com/200', name: 'Lady Gaga' },
  { id: 10, image: 'https://via.placeholder.com/200', name: 'Justin Bieber' },
  { id: 15, image: 'https://via.placeholder.com/200', name: 'Shawn Mendes' },
];

export default function ArtistsPage() {
  return (
    <div className="flex min-h-screen w-full overflow-hidden">
      <div className="flex flex-col w-full overflow-hidden">
        <div className="bg-[#181818] min-h-screen text-white overflow-y-auto">
          <div className="max-w-6xl mx-auto py-8 px-4">
            <div className="mb-24">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  <span className="text-white">Top</span>{' '}
                  <span className="text-[#EE10B0]">Artists</span>
                </h2>

                <button className="text-[#EE10B0] hover:underline">
                  View More
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                {topArtists.map((artist) => (
                  <ArtistCard
                    key={artist.id}
                    imageUrl={artist.image}
                    name={artist.name}
                  />
                ))}
              </div>
            </div>

            {/* New Release Artists Section */}
            <div className="mb-24">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  <span className="text-white">New Debut</span>{' '}
                  <span className="text-[#EE10B0]">Artists</span>
                </h2>
                <button className="text-[#EE10B0] hover:underline">
                  View More
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                {newReleaseArtists.map((artist) => (
                  <ArtistCard
                    key={artist.id}
                    imageUrl={artist.image}
                    name={artist.name}
                  />
                ))}
              </div>
            </div>

            {/* All Artists Section */}
            <div>
              <h2 className="text-2xl font-bold mb-6">
                <span className="text-white">All</span>{' '}
                <span className="text-[#EE10B0]">Artists</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                {allArtists.map((artist) => (
                  <ArtistCard
                    key={artist.id}
                    imageUrl={artist.image}
                    name={artist.name}
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
