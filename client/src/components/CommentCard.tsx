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


interface ICommentCardProps {
  avatar: string;
  username: string;
  time: string;
  content: string;
}


const CommentCard: React.FC<ICommentCardProps> = ({
  avatar,
  username,
  time,
  content,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const [isDialogOpen, setIsDialogOpen] = useState(false);


  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleDelete = () => {
    console.log('Delete comment clicked');
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    console.log('Confirm delete');
    // Add your delete logic here
    setIsDialogOpen(false);
  };

  const handleCancelDelete = () => {
    console.log('Cancel delete');
    setIsDialogOpen(false);
  };
  return (
    <div className="flex items-start text-white p-4 w-full mt-4 relative">
      <div className="mr-3">
        <Image
          src={avatar}
          alt={`${username}'s avatar`}
          width={48}
          height={48}
          className="rounded-full"
        />
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="flex flex-row justify-start items-baseline">
          <h4 className="text-lg font-bold">{username}</h4>
          <h4 className="text-sm text-gray-400 ml-4">{time}</h4>
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
              onClick={handleSave}
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
              onClick={handleEdit}
            >
              Edit comment
            </DropdownMenuItem>
            <DropdownMenuItem
              className="focus:bg-general-blue-hover text-md"
              onClick={handleDelete}
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
