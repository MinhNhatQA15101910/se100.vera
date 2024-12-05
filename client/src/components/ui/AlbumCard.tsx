"use client";

import Link from "next/link";

type AlbumCardProps = {
  image: string;
  title: string;
  artist: string;
};

const AlbumCard: React.FC<AlbumCardProps> = ({ image, title, artist }) => {
  return (
    <Link href="/album-detail">
      <div className="p-4 bg-[#1F1F1F] rounded-lg cursor-pointer hover:bg-gray-700 transition">
        <img src={image} alt={title} className="w-full rounded-md" />
        <h3 className="text-white text-lg font-bold mt-3">{title}</h3>
        <p className="text-gray-400 text-sm">{artist}</p>
      </div>
    </Link>
  );
};

export default AlbumCard;
