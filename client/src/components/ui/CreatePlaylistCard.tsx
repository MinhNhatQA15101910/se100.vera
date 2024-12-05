import React, { useState } from "react";
import { IoClose, IoSearchSharp } from "react-icons/io5";

interface Song {
  id: number;
  title: string;
  artist: string;
  duration: string;
  date: string;
}

const sampleSongs: Song[] = [
  {
    id: 1,
    title: "Skyfall Beats",
    artist: "Nightmares",
    duration: "2:45",
    date: "Oct 26, 2023",
  },
  {
    id: 2,
    title: "Greedy",
    artist: "Tove Styrke",
    duration: "2:45",
    date: "Nov 30, 2023",
  },
  {
    id: 3,
    title: "Lovin On Me",
    artist: "Jack Harlow",
    duration: "2:45",
    date: "Dec 15, 2023",
  },
  {
    id: 3,
    title: "Lovin On Me",
    artist: "Jack Harlow",
    duration: "2:45",
    date: "Dec 15, 2023",
  },
  {
    id: 3,
    title: "Lovin On Me",
    artist: "Jack Harlow",
    duration: "2:45",
    date: "Dec 15, 2023",
  },
];

interface CreatePlaylistCardProps {
  onClose: () => void;
}

const CreatePlaylistCard: React.FC<CreatePlaylistCardProps> = ({ onClose }) => {
  const [playlistTitle, setPlaylistTitle] = useState<string>("");
  const [selectedSongs, setSelectedSongs] = useState<number[]>([]);

  const toggleSongSelection = (id: number) => {
    if (selectedSongs.includes(id)) {
      setSelectedSongs(selectedSongs.filter((songId) => songId !== id));
    } else {
      setSelectedSongs([...selectedSongs, id]);
    }
  };

  const handleConfirm = () => {
    console.log("Playlist Title:", playlistTitle);
    console.log("Selected Songs:", selectedSongs);
    onClose(); // Đóng modal sau khi xác nhận
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-[#181818] text-white rounded-lg shadow-lg border border-[#EE10B0]">
      <div className="flex items-center justify-between border-b border-[#EE10B0]">
        <h2 className="text-1xl font-bold text-center flex-grow p-1">
          <span className="text-white">ADD A </span>
          <span className="text-[#EE10B0]">PLAYLIST</span>
        </h2>
        <IoClose
          className="text-3xl mr-2 cursor-pointer"
          onClick={onClose} // Gọi hàm onClose khi nhấn nút Close
        />
      </div>

      <div className="p-6 h-96 overflow-y-auto scrollbar scrollbar-thumb-[#EE10B0] scrollbar-track-[#1F1F1F]">
        <label className="block text-md font-medium mb-2">
          Playlist Title *
        </label>
        <input
          type="text"
          placeholder="Enter playlist title"
          value={playlistTitle}
          onChange={(e) => setPlaylistTitle(e.target.value)}
          className="w-full px-4 py-2 mb-4 rounded-md bg-[#181818] text-white border border-white"
        />

        <label className="block text-md font-medium mb-2">Search Song</label>
        <div className="relative w-full mb-4">
          <IoSearchSharp className="text-2xl absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search for songs, artists, ..."
            className="w-full pl-12 pr-4 py-2 rounded-md bg-[#181818] text-white border border-[#EE10B0] focus:outline-none focus:ring-1 focus:ring-[#EE10B0]"
          />
        </div>

        <div className="mt-4">
          {sampleSongs.map((song) => (
            <div
              key={song.id}
              className={`flex justify-between items-center px-4 py-2 mb-2 rounded ${
                selectedSongs.includes(song.id) ? "bg-[#EE10B0]" : "bg-gray-700"
              } cursor-pointer`}
              onClick={() => toggleSongSelection(song.id)}
            >
              <div>
                <h4 className="font-semibold">{song.title}</h4>
                <p className="text-sm text-gray-400">{song.artist}</p>
              </div>
              <div className="text-right">
                <p className="text-sm">{song.date}</p>
                <p className="text-sm">{song.duration}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full flex justify-center">
          <button
            onClick={handleConfirm}
            className="w-36 mt-6 py-2 rounded-full bg-[#EE10B0] hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-[#EE10B0] text-white font-semibold"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePlaylistCard;
