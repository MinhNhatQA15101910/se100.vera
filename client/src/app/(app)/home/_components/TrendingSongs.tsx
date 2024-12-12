import LikeButton from '@/components/music/LikeButton';
import { AppButton } from '@/components/ui/AppButton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {  Plus } from 'lucide-react';
import Image from 'next/image';

export default function TrendingSongs() {
  const trendingSongs = [
    {
      rank: 1,
      title: 'Sorfcore',
      artist: 'The neighberhood',
      releaseDate: 'Nov 4, 2023',
      album: 'Hard to Imagine the Neighbourhood Ever Changing',
      duration: '3:26',
      image: 'https://picsum.photos/400/400?random=1',
    },
    {
      rank: 2,
      title: 'Skyfall Beats',
      artist: 'nightmares',
      releaseDate: 'Oct 26, 2023',
      album: 'nightmares',
      duration: '2:45',
      image: 'https://picsum.photos/400/400?random=2',
    },
    {
      rank: 3,
      title: 'Greedy',
      artist: 'tate mcrae',
      releaseDate: 'Dec 30, 2023',
      album: 'Greedy',
      duration: '2:11',
      image: 'https://picsum.photos/400/400?random=3',
    },
    {
      rank: 4,
      title: 'Lovin On me',
      artist: 'jack harlow',
      releaseDate: 'Dec 30, 2023',
      album: 'Lovin On me',
      duration: '2:18',
      image: 'https://picsum.photos/400/400?random=4',
    },
    {
      rank: 5,
      title: 'pain the town red',
      artist: 'Doja Cat',
      releaseDate: 'Dec 29, 2023',
      album: 'Paint The Town Red',
      duration: '3:51',
      image: 'https://picsum.photos/400/400?random=5',
    },
    {
      rank: 6,
      title: 'Dancin On Night',
      artist: 'Dualipa',
      releaseDate: 'may 27, 2023',
      album: 'Dance The Night(From Barbie Movie)',
      duration: '2:56',
      image: 'https://picsum.photos/400/400?random=6',
    },
    {
      rank: 7,
      title: 'Water',
      artist: 'Tyla',
      releaseDate: 'Dec 10, 2023',
      album: 'Water',
      duration: '3:20',
      image: 'https://picsum.photos/400/400?random=7',
    },
  ];

  return (
    <div className="w-[90%] flex flex-col bg-transparent text-general-white items-center custom1-table">
      <Table>
        <TableHeader>
          <TableRow className="border-none pointer-events-none">
            <TableHead className="w-[100px] text-white" colSpan={2}>
              <h2 className="text-2xl font-bold mb-4">
                Trending <span className="text-pink-500">Songs</span>
              </h2>
            </TableHead>
            <TableHead className="hidden md:table-cell text-white">
              Release Date
            </TableHead>
            <TableHead className="hidden lg:table-cell text-white">
              Album
            </TableHead>
            <TableHead className="text-right text-white">Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {trendingSongs.map((song) => (
            <TableRow
              key={song.rank}
              className="border-none cursor-pointer hover:bg-transparent group"
            >
              <TableCell className="font-medium">#{song.rank}</TableCell>
              <TableCell className="bg-[#2E2E2E] group-hover:bg-[#595959] p-0">
                <div className="flex items-center space-x-4">
                  <Image
                    src={song.image}
                    alt={song.title}
                    width={55}
                    height={55}
                    className=" object-cover"
                  />
                  <div>
                    <div className="font-semibold">{song.title}</div>
                    <div className="text-sm text-gray-400">{song.artist}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell text-gray-400 bg-[#2E2E2E] group-hover:bg-[#595959]">
                {song.releaseDate}
              </TableCell>
              <TableCell className="hidden lg:table-cell text-gray-400 bg-[#2E2E2E] group-hover:bg-[#595959] max-w-[200px] truncate">
                {song.album}
              </TableCell>
              <TableCell className="text-right bg-[#2E2E2E] group-hover:bg-[#595959]">
                <div className="flex items-center justify-end space-x-4">
                  <LikeButton songId={"KEKEKEEKE"}/>
                  <span className="text-gray-400 mx-auto">{song.duration}</span>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <AppButton
        className={`flex flex-row w-fit space-x-1 items-center general-grayscale-hover py-1 px-3 rounded-sm`}
      >
        <Plus className="text-general-white h-5 w-5" />
        <span>View</span>
      </AppButton>
    </div>
  );
}
