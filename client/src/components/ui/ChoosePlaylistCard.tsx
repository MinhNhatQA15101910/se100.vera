import React, { useState } from 'react';
import { IoAddOutline } from 'react-icons/io5';
import PlaylistCard from './PlaylistCard';
import CreatePlaylistCard from './CreatePlaylistCard';
import Modal from '../Modal';

const allPlaylists = [
  {
    id: 1,
    image: 'https://via.placeholder.com/200',
    title: 'Top Hits 2024',
    songCount: 15,
    totalDuration: '1h 20m',
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/200',
    title: 'Chill Vibes',
    songCount: 20,
    totalDuration: '1h 45m',
  },
  {
    id: 3,
    image: 'https://via.placeholder.com/200',
    title: 'Workout Beats',
    songCount: 25,
    totalDuration: '2h 10m',
  },
  {
    id: 4,
    image: 'https://via.placeholder.com/200',
    title: 'Throwback Jams',
    songCount: 18,
    totalDuration: '1h 30m',
  },
];

export default function ChoosePlaylistCard() {
  const [isModalOpen, setModalOpen] = useState(false); // Trạng thái mở modal

  return (
    <div>
      <div className="p-6 h-96 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Special "Create a Playlist" card */}
          <div
            className="p-4 bg-[#1F1F1F] rounded-lg cursor-pointer hover:bg-gray-700 transition flex flex-col justify-center items-center"
            onClick={() => setModalOpen(true)} // Mở modal khi nhấn
          >
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

      <Modal
        isOpen={isModalOpen}
        onChange={setModalOpen}
        title="CREATE A PLAYLIST"
      >
        <CreatePlaylistCard onClose={() => setModalOpen(false)} />
      </Modal>
    </div>
  );
}
