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
import { getAlbumById } from '@/actions/album-actions';
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
import { useDeleteAlbumMutation } from '@/hooks/useAlbumMutation';
import { toast } from 'react-toastify';
import { useUser } from '@/contexts/UserContext';
import RemoveSongFromAlbum from '@/components/RemoveSongFromAlbum';

const Page: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  const { userDetails } = useUser();
  const { setActiveTrack, setPlaylist } = usePlayerStore();
  const { setLoadingState } = useLoading();
  const { data: albumDetailData, isLoading } = useQuery({
    queryKey: ['albums'],
    queryFn: async () => {
      const album = await getAlbumById({ albumId: Number(id) });
      return album;
    },
  });
  const deleteAlbumMutation = useDeleteAlbumMutation();

  const handleDeleteAlbum = () => {
    const confirmValue = confirm('Do you really want to delete this album?');

    if (!confirmValue) return;

    deleteAlbumMutation.mutate(albumDetailData?.id || -1, {
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

  useEffect(() => {
    if (albumDetailData?.songs) {
      const updatedPlaylist = albumDetailData.songs.map(({ song }) => song);
      setPlaylist(updatedPlaylist);
    }
  }, [albumDetailData]);

  return (
    <div className="flex min-h-screen w-full overflow-hidden">
      <div className="flex flex-col w-full overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6">
          <div className="bg-dark-blue-gradient rounded-lg">
            <div className="w-full bg-blue-gradient rounded-lg">
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <Link href="/albums">
                    <IoArrowBack className="text-4xl text-white" />
                  </Link>
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
                          onClick={() => {
                            router.push(`/edit-album/${albumDetailData?.id}`)
                          }}
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
                      albumDetailData?.photoUrl ||
                      'https://picsum.photos/400/400?random=4'
                    }
                    alt={albumDetailData?.albumName || 'X'}
                    width={268}
                    height={268}
                    className="col-span-3 rounded-md object-cover shadow-2xl"
                  />
                  <div className="flex flex-col col-span-6 h-56 text-white">
                    <h1 className="text-3xl font-bold mb-8">
                      {albumDetailData?.albumName}
                    </h1>
                    <p className="text-muted-foreground mt-2 line-clamp-3 text-white">
                      {albumDetailData?.description}
                    </p>
                    <div className="flex items-center space-x-2 mt-auto">
                      <p className="text-lg font-bold">
                        {albumDetailData?.totalSongs} songs
                      </p>
                      <span className="leading-none text-[#EE10B0]">●</span>
                      <p className="text-lg font-bold">1h 36m</p>
                    </div>
                  </div>
                  <div className="flex h-60 col-span-3 justify-end items-end mr-6">
                    <button className="flex justify-center items-center space-x-2 focus:outline-none">
                      <span className="text-lg font-medium text-[#EE10B0]">
                        Play all
                      </span>
                      <GoPlay className="text-6xl text-[#EE10B0]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col bg-transparent text-general-white items-center custom1-table p-4">
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
                  {albumDetailData && albumDetailData?.songs.map((song, index) => (
                    <TableRow
                      key={index}
                      className="border-none cursor-pointer hover:bg-transparent group"
                      onClick={() => {
                        setActiveTrack(song.song);
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
                              song.song.photoUrl ||
                              'https://picsum.photos/400/400?random=42'
                            }
                            className="w-14 h-14 flex items-center"
                          />
                          <div>
                            <p className="font-bold text-white text-nowrap truncate">
                              {song.song.songName}
                            </p>
                            <p className="text-muted-foreground text-sm text-white">
                              {song.song.publisherName || ''}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-gray-400 bg-[#2E2E2E] group-hover:bg-[#595959]">
                        {albumDetailData.createdAt.slice(0, 10)}
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-gray-400 bg-[#2E2E2E] group-hover:bg-[#595959]">
                        {song.song.genres}
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-gray-400 bg-[#2E2E2E] group-hover:bg-[#595959]">
                        {song.song.totalListeningHours}
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-gray-400 bg-[#2E2E2E] group-hover:bg-[#595959]">
                        <div className="flex items-center">
                          <span>{song.song.duration.slice(-5)}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-gray-400 bg-[#2E2E2E] md:flex-row group-hover:bg-[#595959]">
                        <div className="flex flex-row h-full items-center justify-around">
                          <LikeButton songId={song.song.id} />
                          <RemoveSongFromAlbum
                            albumId={albumDetailData.id}
                            songId={song.song.id}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
