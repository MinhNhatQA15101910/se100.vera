"use client";

import { useState } from "react";
import PlaylistCard from "@/components/ui/PlaylistCard";
import CreatePlaylistCard from "@/components/ui/CreatePlaylistCard";
import { IoAddOutline } from "react-icons/io5";

const yourPlaylists = [
  {
    id: 1,
    image: "https://via.placeholder.com/200",
    title: "Top Hits 2024",
    songCount: 15,
    totalDuration: "1h 20m",
  },
  {
    id: 2,
    image: "https://via.placeholder.com/200",
    title: "Chill Vibes",
    songCount: 20,
    totalDuration: "1h 45m",
  },
];

export default function PlaylistsPage() {
  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <div className="flex flex-col w-full overflow-hidden">
        <div className="bg-[#181818] min-h-screen text-white overflow-y-auto">
          <div className="max-w-6xl mx-auto py-8 px-4">
            {/* Your Playlist Section */}
            <div className="mb-24">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  <span className="text-white">Your</span>{" "}
                  <span className="text-[#EE10B0]">Playlists</span>
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                {/* Special "Create Playlist" Card */}
                <div
                  onClick={() => setShowCreatePlaylist(true)}
                  className="p-4 bg-[#1F1F1F] rounded-lg cursor-pointer hover:bg-gray-700 transition flex flex-col justify-center items-center"
                >
                  <div className="w-16 h-16 bg-[#EE10B0] text-white rounded-full flex justify-center items-center text-4xl font-bold">
                    <IoAddOutline />
                  </div>
                  <h3 className="text-white text-md font-lg mt-4">
                    Create a Playlist
                  </h3>
                </div>

                {/* Existing Playlists */}
                {yourPlaylists.map((playlist) => (
                  <PlaylistCard
                    key={playlist.id}
                    image={playlist.image}
                    title={playlist.title}
                    songCount={playlist.songCount}
                    totalDuration={playlist.totalDuration}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Create Playlist */}
      {showCreatePlaylist && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative w-full max-w-md bg-[#1F1F1F] rounded-lg shadow-lg">
            <CreatePlaylistCard onClose={() => setShowCreatePlaylist(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
