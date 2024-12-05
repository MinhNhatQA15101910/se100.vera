"use client";

import Link from "next/link";

type PlaylistCardProps = {
  image: string;
  title: string;
  songCount: number;
  totalDuration: string; // Format: e.g., "1h 20m"
};

const PlaylistCard: React.FC<PlaylistCardProps> = ({
  image,
  title,
  songCount,
  totalDuration,
}) => {
  return (
    <Link href="/playlist_detail">
      <div className="p-4 bg-[#1F1F1F] rounded-lg cursor-pointer hover:bg-gray-700 transition">
        <img src={image} alt={title} className="w-full rounded-md" />
        <h3 className="text-white text-lg font-bold mt-3">{title}</h3>
        <p className="text-gray-400 text-sm">
          {songCount} songs • {totalDuration}
        </p>
      </div>
    </Link>
  );
};

export default PlaylistCard;
