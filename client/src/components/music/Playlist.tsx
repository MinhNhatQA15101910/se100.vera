"use client"

import usePlayerStore from "@/stores/player-store";

const Playlist = () => {
  const { playlist, setActiveTrack } = usePlayerStore();

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Playlist</h2>
      <ul>
        {playlist.map((track) => (
          <li
            key={track.id}
            className="cursor-pointer p-2 hover:bg-gray-200"
            onClick={() => setActiveTrack(track.id)}
          >
            <p>{track.title}</p>
            <p className="text-sm text-gray-500">{track.artist}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Playlist;