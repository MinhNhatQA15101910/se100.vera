import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from './ui/Input';
import {
  useAddGenreMutation,
  useUpdateGenreMutation,
} from '@/hooks/useGenreMutation';
import { toast } from 'react-toastify';

interface AddUpdateGenresCardProps {
  defaultGenreName?: string;
  defaultGenreId?: number;
}

const AddUpdateGenresCard: React.FC<AddUpdateGenresCardProps> = ({
  defaultGenreName: defaultGenreName = '',
  defaultGenreId: defaultGenreId = -1,
}) => {
  const [genreName, setGenreName] = useState(defaultGenreName);
  const addGenreMutation = useAddGenreMutation();
  const updateGenreMutation = useUpdateGenreMutation();

  const onSubmit = () => {
    if (genreName.trim() === '') {
      toast.error('Genre name cannot be empty!');
      return;
    }
    if (defaultGenreId == -1) {
      addGenreMutation.mutate(
        {
          genreName: genreName.trim(),
        },
        {
          onSuccess: () => {
            toast.success('Genre added successfully!');
            setGenreName(''); // Reset input after success
          },
          onError: (error) => {
            toast.error(error.message || 'Failed to add genre.');
          },
        }
      );
    } else
      updateGenreMutation.mutate(
        {
          id: defaultGenreId,
          data: {
            genreName: genreName.trim(),
          },
        },
        {
          onSuccess: () => {
            toast.success('Genre updated successfully!');
            setGenreName('');
          },
          onError: (error) => {
            toast.error(error.message || 'Failed to update genre.');
          },
        }
      );
  };

  return (
    <div className="w-[300px]">
      <Input
        type="text"
        value={genreName}
        onChange={(e) => setGenreName(e.target.value)}
        placeholder="Enter genre name"
        className="w-full p-2 border border-gray-500 rounded bg-[#3A3A3A] text-white"
      />
      <Button
        className="w-full mt-2 bg-blue-600 hover:bg-blue-700"
        onClick={onSubmit} // Execute the function
      >
        Confirm
      </Button>
    </div>
  );
};

export default AddUpdateGenresCard;
