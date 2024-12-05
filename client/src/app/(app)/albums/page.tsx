"use client";
import AlbumCard from "@/components/ui/AlbumCard";

const topAlbums = [
  {
    id: 1,
    image: "https://via.placeholder.com/200",
    title: "Adele 21",
    artist: "Adele",
  },
  {
    id: 2,
    image: "https://via.placeholder.com/200",
    title: "Scorpion",
    artist: "Drake",
  },
  {
    id: 1,
    image: "https://via.placeholder.com/200",
    title: "Adele 21",
    artist: "Adele",
  },
  {
    id: 2,
    image: "https://via.placeholder.com/200",
    title: "Scorpion",
    artist: "Drake",
  },
  {
    id: 2,
    image: "https://via.placeholder.com/200",
    title: "Scorpion",
    artist: "Drake",
  },
];

const newReleaseAlbums = [
  {
    id: 3,
    image: "https://via.placeholder.com/200",
    title: "Harry's House",
    artist: "Harry Styles",
  },
  {
    id: 4,
    image: "https://via.placeholder.com/200",
    title: "Born to Die",
    artist: "Lana Del Rey",
  },
  {
    id: 1,
    image: "https://via.placeholder.com/200",
    title: "Adele 21",
    artist: "Adele",
  },
  {
    id: 2,
    image: "https://via.placeholder.com/200",
    title: "Scorpion",
    artist: "Drake",
  },
  {
    id: 2,
    image: "https://via.placeholder.com/200",
    title: "Scorpion",
    artist: "Drake",
  },
];

const allAlbums = [
  {
    id: 5,
    image: "https://via.placeholder.com/200",
    title: "Beauty Behind",
    artist: "The Weeknd",
  },
  {
    id: 6,
    image: "https://via.placeholder.com/200",
    title: "Thriller",
    artist: "Michael Jackson",
  },
  {
    id: 1,
    image: "https://via.placeholder.com/200",
    title: "Adele 21",
    artist: "Adele",
  },
  {
    id: 2,
    image: "https://via.placeholder.com/200",
    title: "Scorpion",
    artist: "Drake",
  },
  {
    id: 1,
    image: "https://via.placeholder.com/200",
    title: "Adele 21",
    artist: "Adele",
  },
  {
    id: 2,
    image: "https://via.placeholder.com/200",
    title: "Scorpion",
    artist: "Drake",
  },
  {
    id: 1,
    image: "https://via.placeholder.com/200",
    title: "Adele 21",
    artist: "Adele",
  },
  {
    id: 2,
    image: "https://via.placeholder.com/200",
    title: "Scorpion",
    artist: "Drake",
  },
  {
    id: 1,
    image: "https://via.placeholder.com/200",
    title: "Adele 21",
    artist: "Adele",
  },
  {
    id: 2,
    image: "https://via.placeholder.com/200",
    title: "Scorpion",
    artist: "Drake",
  },
];

export default function AlbumsPage() {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <div className="flex flex-col w-full overflow-hidden">
        <div className="bg-[#181818] min-h-screen text-white overflow-y-auto">
          <div className="max-w-6xl mx-auto py-8 px-4">
            <div className="mb-24">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  <span className="text-white">Top</span>{" "}
                  <span className="text-[#EE10B0]">Albums</span>
                </h2>
                <button className="text-[#EE10B0] hover:underline">
                  View More
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                {topAlbums.map((album) => (
                  <AlbumCard
                    key={album.id}
                    image={album.image}
                    title={album.title}
                    artist={album.artist}
                  />
                ))}
              </div>
            </div>

            {/* New Release Albums Section */}
            <div className="mb-24">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  <span className="text-white">New Release</span>{" "}
                  <span className="text-[#EE10B0]">Albums</span>
                </h2>
                <button className="text-[#EE10B0] hover:underline">
                  View More
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                {newReleaseAlbums.map((album) => (
                  <AlbumCard
                    key={album.id}
                    image={album.image}
                    title={album.title}
                    artist={album.artist}
                  />
                ))}
              </div>
            </div>

            {/* All Albums Section */}
            <div>
              <h2 className="text-2xl font-bold mb-6">
                <span className="text-white">All</span>{" "}
                <span className="text-[#EE10B0]">Albums</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                {allAlbums.map((album) => (
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
