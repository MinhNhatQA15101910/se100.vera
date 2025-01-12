import React, { useState } from 'react';
import Image from 'next/image';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { EllipsisVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { AlertDialogTrigger } from '@radix-ui/react-alert-dialog';
import { Comment } from '@/types/global';

interface ICommentCardProps {
  comment: Comment;
  handleDelete?: () => void;
  handleEdit?: (content: string) => void;
}


const CommentCard: React.FC<ICommentCardProps> = ({
  comment,
  handleDelete,
  handleEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [isDialogOpen, setIsDialogOpen] = useState(false);


  const onEdit = () => {
    setIsEditing(true);
  };

  const onSave = () => {
    setIsEditing(false);
    if (handleEdit) {
      handleEdit(editedContent);
    }
  };

  const onDelete = () => {
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    setIsDialogOpen(false);
    if (handleDelete) {
      handleDelete();
    }
  };

  const handleCancelDelete = () => {
    setIsDialogOpen(false);
  };
  return (
    <div className="flex items-start rounded-xl bg-slate-900 text-white p-4 w-full mt-4">
      <div className="mr-3">
        <Image
          src={comment.publisherPhotoUrl}
          alt={`${comment.publisherName}'s avatar`}
          width={48}
          height={48}
          className="rounded-full"
        />
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="flex flex-row justify-start items-baseline">
          <h4 className="text-lg font-bold">{comment.publisherName}</h4>
          <h4 className="text-sm text-gray-400 ml-4">{comment.createdAt}</h4>
        </div>
        {isEditing ? (
          <div className="flex-col mt-2 items-end">
            <Textarea
              className="w-full bg-zinc-800 text-white text-md rounded-md p-2"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <Button
              className="mt-2 px-4 bg-blue-600 text-white text-md font-medium rounded-lg hover:bg-blue-700 "
              onClick={onSave}
            >
              Save
            </Button>
          </div>
        ) : (
          <p className="text-md mt-2">{editedContent}</p>
        )}
      </div>

      {/* More options */}
      <div className="ml-3 text-gray-400 cursor-pointer self-center hover:text-gray-200 relative ">

        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-auto w-auto p-0 rounded-full [&_svg]:size-[30px]
                  hover:text-general-blue-hover hover:bg-transparent"
            >
              <EllipsisVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="border-none bg-zinc-800 font-semibold text-general-blue p-2 rounded-lg shadow-lg">
            <DropdownMenuItem
              className="focus:bg-general-blue-hover text-md"
              onClick={onEdit}
            >
              Edit comment
            </DropdownMenuItem>
            <DropdownMenuItem
              className="focus:bg-general-blue-hover text-md"
              onClick={onDelete}
            >
              Delete comment
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogTrigger />
        <AlertDialogContent className="bg-general-theme border-none">
          <AlertDialogHeader>
            <AlertDialogTitle
              className='text-general-pink-hover'
            >
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. Do you really want to delete this comment?.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="mr-4 px-4 py-2 rounded-lg bg-transparent border-general-pink-border text-general-pink 
                  hover:text-general-white hover:border-transparent hover:bg-general-pink-hover"
              onClick={handleCancelDelete}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="px-4 py-2 bg-general-pink rounded-lg hover:bg-general-pink-hover"
              onClick={handleConfirmDelete}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CommentCard;
