'use client';

import { useEffect, useState } from 'react';
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
import { ArrowLeftIcon, Delete, DownloadIcon, Edit, PlayIcon } from 'lucide-react';
import { useDeleteAlbumMutation } from '@/hooks/useAlbumMutation';
import { toast } from 'react-toastify';
import { useUser } from '@/contexts/UserContext';
import { downloadSongById, getArtistSongsByArtistId, getSongById } from '@/actions/song-actions';
import * as commentActions from '@/actions/comment-actions';
import CustomCommentInput from '@/components/CustomCommentInput';
import CommentCard from '@/components/CommentCard';
import { Comment } from '@/types/global';
import { useAddCommentMutation, useDeleteCommentMutation, useUpdateCommentMutation } from '../../../../hooks/useCommentMutation';
import ConfirmDialog from '@/components/custom/ConfirmDialog';

const Page: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  const { userDetails } = useUser();
  const [comments, setComments] = useState<Comment[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { setActiveTrack } = usePlayerStore();
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

  useQuery({
    queryKey: ['comments', id],
    queryFn: async () => {
      const comments = await commentActions.getComments(Number(id));
      setComments(comments);
      return comments;
    },
  });

  const isLoading = isSongDetailLoading || isArtistSongLoading;

  const addCommentMutation = useAddCommentMutation();
  const deleteCommentMutation = useDeleteCommentMutation();
  const updateCommentMutation = useUpdateCommentMutation();

  const handleAddComment = async (content: string) => {
    addCommentMutation.mutate({
      songId: Number(id),
      content,
    });
  };

  const handleDeleteComment = (commentId: number) => {
    deleteCommentMutation.mutate(commentId);
  };

  const handleUpdateComment = (commentId: number, content: string) => {
    console.log('commentId', commentId, 'content', content);
    updateCommentMutation.mutate(
      {
        commentId: commentId,
        content: content,
      },
      {
        onSuccess: () => {
          toast.success('Update Comment Successfully!');
        },
        onError: () => {
          toast.error('Server went wrong, update is not working!');
        },
      }
    );
  };

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

  const handleDownloadConfirm = () => {
    if (songDetailData?.musicUrl && songDetailData?.songName) {
      downloadSongById(songDetailData.id, songDetailData?.musicUrl, "[VERA]-" + songDetailData?.songName + "-" + songDetailData?.artists[0].artistName);
    } else {
      toast.error('Song URL or name is missing');
    }
  }

  useEffect(() => {
    setLoadingState(isLoading);
  }, [isLoading]);

  return (
    <div className="flex min-h-screen w-full overflow-hidden">
      <div className="flex flex-col w-full overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6">
          <div className="bg-dark-blue-gradient rounded-lg">
            <div className="w-full bg-blue-gradient rounded-lg">
              <div className="flex justify-between items-center p-4">
                <Button
                  onClick={() => router.back()}
                  variant="ghost"
                  size="icon"
                  className="hover:bg-transparent rounded-full w-fit [&_svg]:size-[40px]"
                  aria-label="Go back"
                >
                  <ArrowLeftIcon className="text-white stroke-[3px]" />
                </Button>

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

              <div className="grid grid-cols-12 items-start gap-12 mb-8 p-4">
                <Image
                  src={
                    songDetailData?.photoUrl ||
                    'https://picsum.photos/400/400?random=4'
                  }
                  alt={songDetailData?.songName || 'X'}
                  width={268}
                  height={268}
                  className="col-span-3 rounded-lg object-cover shadow-2xl"
                />
                <div className="flex flex-col col-span-6 text-white space-y-4">
                  <div className="flex flex-row items-center">
                    <h1 className="text-3xl font-bold">
                      {songDetailData?.songName}
                    </h1>
                    <Button
                      variant="default"
                      size="icon"
                      className='rounded-full size-auto shadow-none p-3 bg-transparent hover:bg-transparent [&_svg]:size-[30px]'
                      onClick={() => {
                        setIsDialogOpen(true);
                      }}
                    >
                      <DownloadIcon className="text-general-white" />
                    </Button>
                    <ConfirmDialog
                      isOpen={isDialogOpen}
                      onOpenChange={setIsDialogOpen}
                      onConfirm={handleDownloadConfirm}
                      title="Download song!"
                      description="This action will download the song audio file to your computer."
                    />
                  </div>
                  <div className="flex items-center space-x-4">
                    <DynamicImage
                      alt="Artist Image"
                      src={
                        songDetailData?.publisherImageUrl ||
                        'https://picsum.photos/400/400?random=42'
                      }
                      className="w-14 h-14 flex items-center rounded-full"
                    />
                    <p className="font-bold text-white text-nowrap truncate">
                      {songDetailData?.publisherName}
                    </p>
                  </div>

                  <p className="text-muted-foreground mt-2 line-clamp-4 text-white mb-4">
                    {songDetailData?.description}
                  </p>

                  <p className="text-lg font-bold">
                    {'Duration: ' + songDetailData?.duration.slice(3, 8)}
                  </p>
                </div>

                <div className="flex h-60 col-span-3 justify-end items-end mr-6">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full w-auto h-auto p-4 [&_svg]:size-[30px]
                        bg-blue-600 hover:bg-blue-700"
                  >
                    <PlayIcon fill="#fff" className="text-general-white" />
                  </Button>
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
                      className="flex items-center text-white text-lg font-bold hover:text-white hover:bg-black hover:bg-opacity-30"
                    >
                      Title
                    </Button>
                  </TableHead>
                  <TableHead style={{ width: '15%' }}>
                    <Button
                      variant="ghost"
                      className="flex items-center justify-self-center text-white text-lg font-bold hover:text-white hover:bg-black hover:bg-opacity-30"
                    >
                      Release
                    </Button>
                  </TableHead>
                  <TableHead style={{ width: '15%' }}>
                    <Button
                      variant="ghost"
                      className="flex justify-self-center text-white text-lg font-bold hover:text-white hover:bg-black hover:bg-opacity-30"
                    >
                      Genre
                    </Button>
                  </TableHead>
                  <TableHead style={{ width: '15%' }}>
                    <Button
                      variant="ghost"
                      className="flex justify-self-center text-white text-lg font-bold hover:text-white hover:bg-black hover:bg-opacity-30"
                    >
                      Total Listening Hours
                    </Button>
                  </TableHead>
                  <TableHead style={{ width: '15%' }}>
                    <Button
                      variant="ghost"
                      className="flex justify-self-center text-white text-lg font-bold hover:text-white hover:bg-black hover:bg-opacity-30"
                    >
                      Time
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      className="flex justify-self-center text-white text-lg font-bold hover:text-white hover:bg-black hover:bg-opacity-30"
                    >
                      Actions
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
                      <TableCell className="font-bold text-lg w-1/20">
                        {index + 1}
                      </TableCell>
                      <TableCell className="bg-[#2E2E2E] group-hover:bg-[#595959] p-0">
                        <div className="flex items-center space-x-4">
                          <DynamicImage
                            alt="Artist Image"
                            src={
                              song.photoUrl ||
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
                      <TableCell className="hidden md:table-cell text-center text-gray-400 bg-[#2E2E2E] group-hover:bg-[#595959]">
                        {song.createdAt.slice(0, 10)}
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-center text-gray-400 bg-[#2E2E2E] group-hover:bg-[#595959]">
                        {song.genres}
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-center text-gray-400 bg-[#2E2E2E] group-hover:bg-[#595959]">
                        {song.totalListeningHours}
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-center text-gray-400 bg-[#2E2E2E] group-hover:bg-[#595959]">
                        {song.duration.slice(-5)}
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-center text-gray-400 bg-[#2E2E2E] md:flex-row group-hover:bg-[#595959]">
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
                <CustomCommentInput onCommentSubmit={handleAddComment} />
                {comments?.map((comment) => (
                  <CommentCard
                    key={comment.id}
                    comment={comment}
                    handleDelete={() => handleDeleteComment(comment.id)}
                    handleEdit={(content) =>
                      handleUpdateComment(comment.id, content)
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
