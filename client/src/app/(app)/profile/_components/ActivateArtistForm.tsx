'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Textarea } from '@/components/ui/textarea';

import { useActivateArtistAccountMutation } from '@/hooks/useUserMutation';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function ActivateArtistForm() {
  const router = useRouter();
  const activateArtistAccountMutation = useActivateArtistAccountMutation();

  const [formData, setFormData] = useState({
    artistName: '',
    description: '',
  });
  const [errors, setErrors] = useState({
    artistName: '',
    description: '',
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      artistName: '',
      description: '',
    };

    if (!formData.artistName.trim()) {
      newErrors.artistName = 'Artist name is required';
      isValid = false;
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
      isValid = false;
    } else if (formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      activateArtistAccountMutation.mutate(
        {
          artistName: formData.artistName,
          description: formData.description,
        },
        {
          onSuccess: () => {
            toast.success(
              'Congrats, You are now available to contribute your Songs and Albums!'
            );
            router.refresh();
          },
          onError: () => {
            toast.error('Failed to Compile, Building in Progress.');
          },
        }
      );
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="flex flex-col bg-transparent p-2">
      <div className="flex flex-col w-full mx-auto space-y-8">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="artistName" className="text-white">
              Artist name
            </Label>
            <Input
              id="artistName"
              placeholder="Artist name"
              className="bg-white text-black"
              value={formData.artistName}
              onChange={handleChange}
            />
            {errors.artistName && (
              <p className="text-red-500 text-sm mt-1">{errors.artistName}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-white">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Description"
              className="bg-white text-black min-h-[120px]"
              value={formData.description}
              onChange={handleChange}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-[#E325B6] hover:bg-[#C920A0] text-white rounded-full py-6 text-lg font-medium"
          >
            ACTIVATE
          </Button>
        </form>
      </div>
    </div>
  );
}
