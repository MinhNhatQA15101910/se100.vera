import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from './ui/Input';

interface AddUpdateGenresCardProps {
  onConfirm: (genreName: string) => void;
  defaultValue?: string; // Optional default value for editing
}

const AddUpdateGenresCard: React.FC<AddUpdateGenresCardProps> = ({
  onConfirm,
  defaultValue = '',
}) => {
  const [genreName, setGenreName] = useState(defaultValue);

  const handleConfirm = () => {
    if (genreName.trim()) {
      onConfirm(genreName.trim());
      setGenreName(''); // Clear the input after confirmation
    } else {
      alert('Please enter a valid genre name.');
    }
  };

  return (
    <Card className="w-full max-w-md bg-[#2E2E2E] text-white shadow-lg">
      <CardHeader>
        <h2 className="text-lg font-bold">
          {defaultValue ? 'Update Genre' : 'Add Genre'}
        </h2>
      </CardHeader>
      <CardContent>
        <Input
          type="text"
          value={genreName}
          onChange={(e) => setGenreName(e.target.value)}
          placeholder="Enter genre name"
          className="w-full p-2 border border-gray-500 rounded bg-[#3A3A3A] text-white"
        />
      </CardContent>
      <CardFooter>
        <Button
          className="w-full mt-2 bg-blue-600 hover:bg-blue-700"
          onClick={handleConfirm}
        >
          Confirm
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AddUpdateGenresCard;
