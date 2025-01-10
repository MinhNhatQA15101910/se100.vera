'use client';

import { useEffect } from 'react';
import { GoPlay } from 'react-icons/go';
import { IoArrowBack } from 'react-icons/io5';
import { FiMoreHorizontal } from 'react-icons/fi';
import Image from 'next/image';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/tableV2';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import LikeButton from '@/components/music/LikeButton';

import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useLoading } from '@/contexts/LoadingContext';
import usePlayerStore from '@/stores/player-store';
import DynamicImage from '@/components/custom/DynamicImage';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Delete, Edit } from 'lucide-react';
import { useDeleteAlbumMutation } from '../../(artitst)/upload-album/_hooks/useAlbumMutation';
import { toast } from 'react-toastify';
import { useUser } from '@/contexts/UserContext';
import { getArtistSongsByArtistId, getSongById } from '@/actions/song-actions';
import CustomCommentInput from '@/components/CustumCommentInput';
import CommentCard from '@/components/CommentCard';

const Page: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  const { userDetails } = useUser();
  const { setActiveTrack, setPlaylist } = usePlayerStore();
  const { setLoadingState } = useLoading();
  const { data: songDetailData, isLoading: isSongDetailLoading } = useQuery({
    queryKey: ['songdetail'],
    queryFn: async () => {
      const song = await getSongById(Number(id));
      return song;
    },
  });

  const { data: artistSongData, isLoading: isArtistSongLoading } = useQuery({
    queryKey: ['artistSong'],
    queryFn: async () => {
      const song = await getArtistSongsByArtistId(
        songDetailData?.artists[0].id || 0
      );
      return song;
    },
    enabled: !!songDetailData,
  });

  const isLoading = isSongDetailLoading || isArtistSongLoading;

  const deleteAlbumMutation = useDeleteAlbumMutation();

  const handleDeleteAlbum = () => {
    const confirmValue = confirm('Do you really want to delete this album?');

    if (!confirmValue) return;

    deleteAlbumMutation.mutate(songDetailData?.id || -1, {
      onSuccess: () => {
        toast.success('Delete Album Successfully!');
        router.push('/albums');
      },
      onError: () => {
        toast.error('Server went wrong, delete is not working!');
      },
    });
  };

  useEffect(() => {
    setLoadingState(isLoading);
  }, [isLoading]);

  return (
    <div className="flex min-h-screen w-full overflow-hidden">
      <div className="flex flex-col w-full overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6">
          <div className="bg-dark-blue-gradient rounded-lg">
            <div className="w-full bg-blue-gradient rounded-lg">
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <button
                      onClick={() => router.back()}
                      className="focus:outline-none"
                      aria-label="Go back"
                    >
                      <IoArrowBack className="text-4xl text-white" />
                    </button>
                  </div>
                  {userDetails?.roles[0] === 'Artist' && (
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <FiMoreHorizontal className="text-4xl text-white hover:text-general-pink-hover" />
                      </DropdownMenuTrigger>

                      <DropdownMenuContent
                        align="end"
                        className="w-56 bg-general-pink border-general-pink-border"
                      >
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-general-pink-border" />
                        <DropdownMenuItem
                          className="hover:bg-general-pink-hover"
                          onClick={() => {}}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-general-pink-border" />
                        <DropdownMenuItem onClick={handleDeleteAlbum}>
                          <Delete className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </div>

              <div className="p-4">
                <div className="grid grid-cols-12 items-start gap-12 mb-8">
                  <Image
                    src={
                      songDetailData?.songPhotoUrl ||
                      'https://picsum.photos/400/400?random=4'
                    }
                    alt={songDetailData?.songName || 'X'}
                    width={268}
                    height={268}
                    className="col-span-3 rounded-md object-cover shadow-2xl"
                  />
                  <div className="flex flex-col col-span-6 text-white">
                    <h1 className="text-3xl font-bold mb-4">
                      {songDetailData?.songName}
                    </h1>
                    <div className="flex items-center space-x-4 mb-2">
                      <DynamicImage
                        alt="Artist Image"
                        src={
                          songDetailData?.publisherImageUrl ||
                          'https://picsum.photos/400/400?random=42'
                        }
                        className="w-14 h-14 flex items-center rounded-full"
                      />
                      <div>
                        <p className="font-bold text-white text-nowrap truncate">
                          {songDetailData?.publisherName}
                        </p>
                      </div>
                    </div>
                    <p className="text-muted-foreground mt-2 line-clamp-4 text-white mb-4">
                      {songDetailData?.description}
                    </p>
                    <div className="flex items-center space-x-2 mt-auto">
                      <p className="text-lg font-bold">
                        {'Duration: ' + songDetailData?.duration.slice(3, 8)}
                      </p>
                    </div>
                  </div>
                  <div className="flex h-60 col-span-3 justify-end items-end mr-6">
                    <button className="flex justify-center items-center space-x-2 focus:outline-none">
                      <span className="text-lg font-medium text-[#EE10B0]">
                        Play
                      </span>
                      <GoPlay className="text-6xl text-[#EE10B0]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col bg-transparent text-general-white items-start custom1-table p-4">
              <h1 className="text-3xl font-bold mb-4 mt-4">
                Songs with same artist
              </h1>

              <Table>
                <TableHeader>
                  <TableHead
                    className=" text-white text-lg font-bold"
                    style={{ width: '5%' }}
                  >
                    #
                  </TableHead>
                  <TableHead style={{ width: '35%' }}>
                    <Button
                      variant="ghost"
                      className="flex items-center space-x-1 text-white text-lg font-bold hover:text-white hover:bg-black hover:bg-opacity-30"
                    >
                      <span>Title</span>
                    </Button>
                  </TableHead>
                  <TableHead style={{ width: '15%' }}>
                    <Button
                      variant="ghost"
                      className="flex items-center space-x-1 text-white text-lg font-bold hover:text-white hover:bg-black hover:bg-opacity-30"
                    >
                      <span>Release</span>
                    </Button>
                  </TableHead>
                  <TableHead style={{ width: '15%' }}>
                    <Button
                      variant="ghost"
                      className="flex items-center space-x-1 text-white text-lg font-bold hover:text-white hover:bg-black hover:bg-opacity-30"
                    >
                      <span>Genre</span>
                    </Button>
                  </TableHead>
                  <TableHead style={{ width: '15%' }}>
                    <Button
                      variant="ghost"
                      className="flex items-center space-x-1 text-white text-lg font-bold hover:text-white hover:bg-black hover:bg-opacity-30"
                    >
                      <span>Total Listening Hours</span>
                    </Button>
                  </TableHead>
                  <TableHead style={{ width: '15%' }}>
                    <Button
                      variant="ghost"
                      className="flex items-center space-x-1 text-white text-lg font-bold hover:text-white hover:bg-black hover:bg-opacity-30"
                    >
                      <span>Time</span>
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      className="flex items-center space-x-1 text-white text-lg font-bold hover:text-white hover:bg-black hover:bg-opacity-30"
                    >
                      <span>Actions</span>
                    </Button>
                  </TableHead>
                </TableHeader>
                <TableBody>
                  {artistSongData?.songs.map((song, index) => (
                    <TableRow
                      key={index}
                      className="border-none cursor-pointer hover:bg-transparent group"
                      onClick={() => {
                        setActiveTrack(song);
                      }}
                    >
                      <TableCell className="font-bold text-lg">
                        {index + 1}
                      </TableCell>
                      <TableCell className="bg-[#2E2E2E] group-hover:bg-[#595959] p-0">
                        <div className="flex items-center space-x-4">
                          <DynamicImage
                            alt="Artist Image"
                            src={
                              song.songPhotoUrl ||
                              'https://picsum.photos/400/400?random=42'
                            }
                            className="w-14 h-14 flex items-center"
                          />
                          <div>
                            <p className="font-bold text-white text-nowrap truncate">
                              {song.songName}
                            </p>
                            <p className="text-muted-foreground text-sm text-white">
                              {song.publisherName || ''}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-gray-400 bg-[#2E2E2E] group-hover:bg-[#595959]">
                        {song.createdAt.slice(0, 10)}
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-gray-400 bg-[#2E2E2E] group-hover:bg-[#595959]">
                        {song.genres}
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-gray-400 bg-[#2E2E2E] group-hover:bg-[#595959]">
                        {song.totalListeningHours}
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-gray-400 bg-[#2E2E2E] group-hover:bg-[#595959]">
                        <div className="flex items-center">
                          <span>{song.duration.slice(-5)}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-gray-400 bg-[#2E2E2E] md:flex-row group-hover:bg-[#595959]">
                        <div className="flex flex-row h-full items-center justify-around">
                          <LikeButton songId={3} />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <h1 className="text-3xl font-bold mb-4 mt-12">Comment</h1>
              <div className="w-full">
                <CustomCommentInput />
                <CommentCard
                  avatar="https://picsum.photos/200"
                  username="Duy vip"
                  time="4 weeks ago"
                  content="Ambessa's commitment to the warrior identity literally dragging Mel into danger before she was even born illustrates their dynamic more succinctly than any line of expository dialogue could have."
                />
                <CommentCard
                  avatar="https://picsum.photos/200"
                  username="Duy vip"
                  time="4 weeks ago"
                  content="Ambessa's commitment to the warrior identity literally dragging Mel into danger before she was even born illustrates their dynamic more succinctly than any line of expository dialogue could have."
                />
                <CommentCard
                  avatar="https://picsum.photos/200"
                  username="Duy vip"
                  time="4 weeks ago"
                  content="Ambessa's commitment to the warrior identity literally dragging Mel into danger before she was even born illustrates their dynamic more succinctly than any line of expository dialogue could have."
                />
                <CommentCard
                  avatar="https://picsum.photos/200"
                  username="Duy vip"
                  time="4 weeks ago"
                  content="Ambessa's commitment to the warrior identity literally dragging Mel into danger before she was even born illustrates their dynamic more succinctly than any line of expository dialogue could have."
                />
                <CommentCard
                  avatar="https://picsum.photos/200"
                  username="Duy vip"
                  time="4 weeks ago"
                  content="Ambessa's commitment to the warrior identity literally dragging Mel into danger before she was even born illustrates their dynamic more succinctly than any line of expository dialogue could have."
                />
                <CommentCard
                  avatar="https://picsum.photos/200"
                  username="Duy vip"
                  time="4 weeks ago"
                  content="Ambessa's commitment to the warrior identity literally dragging Mel into danger before she was even born illustrates their dynamic more succinctly than any line of expository dialogue could have."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
