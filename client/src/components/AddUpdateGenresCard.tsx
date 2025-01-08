import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from './ui/Input';
import { useAddGenreMutation } from '@/app/(app)/(artitst)/upload-song/_hooks/useGenreMutation';
import { toast } from 'react-toastify';

interface AddUpdateGenresCardProps {
  defaultValue?: string; // Optional default value for editing
}

const AddUpdateGenresCard: React.FC<AddUpdateGenresCardProps> = ({
  defaultValue = '',
}) => {
  const [genreName, setGenreName] = useState(defaultValue);
  const addGenreMutation = useAddGenreMutation();

  const onSubmit = () => {
    if (genreName.trim() === '') {
      toast.error('Genre name cannot be empty!');
      return;
    }

    addGenreMutation.mutate(
      {
        genreName: genreName.trim(), // Ensure no trailing spaces
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
