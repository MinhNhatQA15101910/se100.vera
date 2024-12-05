import React from "react";
import { IoClose, IoAddOutline } from "react-icons/io5";
import PlaylistCard from "./PlaylistCard";

const allPlaylists = [
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
  {
    id: 3,
    image: "https://via.placeholder.com/200",
    title: "Workout Beats",
    songCount: 25,
    totalDuration: "2h 10m",
  },
  {
    id: 4,
    image: "https://via.placeholder.com/200",
    title: "Throwback Jams",
    songCount: 18,
    totalDuration: "1h 30m",
  },
];

export default function ChoosePlaylistCard() {
  return (
    <div className="w-full max-w-4xl mx-auto bg-[#181818] text-white rounded-lg shadow-lg border border-[#EE10B0]">
      <div className="flex items-center justify-between border-b border-[#EE10B0]">
        <h2 className="text-1xl font-bold text-center flex-grow p-1">
          <span className="text-white">CHOOSE YOUR </span>
          <span className="text-[#EE10B0]">PLAYLIST</span>
        </h2>
        <IoClose className="text-3xl mr-2 cursor-pointer" />
      </div>

      <div className="p-6 h-96 overflow-y-auto scrollbar scrollbar-thumb-[#EE10B0] scrollbar-track-[#1F1F1F]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Special "Create a Playlist" card */}
          <div className="p-4 bg-[#1F1F1F] rounded-lg cursor-pointer hover:bg-gray-700 transition flex flex-col justify-center items-center">
            <div className="w-16 h-16 bg-[#EE10B0] text-white rounded-full flex justify-center items-center text-4xl font-bold">
              <IoAddOutline />
            </div>
            <h3 className="text-white text-md font-lg mt-4">
              Create a Playlist
            </h3>
          </div>

          {/* Existing playlists */}
          {allPlaylists.map((playlist) => (
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
  );
}
