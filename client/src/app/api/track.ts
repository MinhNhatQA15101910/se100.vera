import { NextApiRequest, NextApiResponse } from 'next';

interface Track {
  id: number;
  title: string;
  artist: string;
  url: string;
  cover: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const tracks: Track[] = [
    {
      id: 1,
      title: "Track One",
      artist: "Artist A",
      url: "/music/track1.mp3", // Make sure these files exist in `public/music`
      cover: "/images/cover1.jpg",
    },
    {
      id: 2,
      title: "Track Two",
      artist: "Artist B",
      url: "/music/track2.mp3",
      cover: "/images/cover2.jpg",
    },
    // Add more tracks...
  ];

  res.status(200).json(tracks);
}