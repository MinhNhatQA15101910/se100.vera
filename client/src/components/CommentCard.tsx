import React, { useState } from 'react';
import Image from 'next/image';
import { IoMdMore } from 'react-icons/io';

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setIsMenuOpen(false);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleDelete = () => {
    setIsDialogOpen(true);
    setIsMenuOpen(false);
  };

  const confirmDelete = () => {
    setIsDialogOpen(false);
  };

  const cancelDelete = () => {
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
        <div className="flex justify-start items-center">
          <h4 className="text-lg font-bold">{username}</h4>
          <h4 className="text-sm text-gray-400 ml-4">{time}</h4>
        </div>
        {isEditing ? (
          <div className="flex-col mt-2 items-end">
            <textarea
              className="w-full bg-zinc-700 text-white rounded-md p-2"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <button
              className="mt-2 px-4 py-1 bg-blue-600 text-white text-md font-medium rounded-lg hover:bg-blue-700 "
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        ) : (
          <p className="text-md mt-2">{editedContent}</p>
        )}
      </div>

      {/* More options */}
      <div className="ml-3 text-gray-400 cursor-pointer hover:text-gray-200 relative">
        <IoMdMore size={32} onClick={toggleMenu} />
        {isMenuOpen && (
          <div className="absolute right-0 mt-2 bg-zinc-800 text-white shadow-lg rounded-md p-2 w-40">
            <button
              className="w-full text-left px-2 py-1 hover:bg-zinc-700 rounded-md"
              onClick={handleEdit}
            >
              Edit Comment
            </button>
            <button
              className="w-full text-left px-2 py-1 hover:bg-zinc-700 rounded-md mt-1"
              onClick={handleDelete}
            >
              Delete Comment
            </button>
          </div>
        )}
      </div>

      {/* Delete confirmation dialog */}
      {isDialogOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-[#181818] text-white p-6 rounded-lg shadow-lg">
            <p>Do you want to delete this comment?</p>
            <div className="flex justify-end mt-4">
              <button
                className="mr-4 px-4 py-2 bg-pink-500 rounded-lg hover:bg-pink-600"
                onClick={cancelDelete}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-pink-500 rounded-lg hover:bg-pink-600"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentCard;
