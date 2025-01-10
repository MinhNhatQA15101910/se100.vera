'use client';

import React from 'react';
import { useForm } from 'react-hook-form';

import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FileText } from 'lucide-react';
import DynamicImage from './custom/DynamicImage';
import { useDropzone } from 'react-dropzone';
import { useUploadUserPhotoMutation } from '@/hooks/useUserMutation';
import { toast } from 'react-toastify';
import { AppButton } from './ui/AppButton';

const formSchema = z.object({
  photoFile: z
    .instanceof(File, { message: 'Photo is required' })
    .refine(
      (file) => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
      'Only JPEG, PNG, and WEBP image files are allowed'
    )
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      'File size must be less than 5MB'
    ),
});

type FormValues = z.infer<typeof formSchema>;

const UpdateUserForm = ({ closeModal }: { closeModal: () => void }) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const uploadPhotoMutation = useUploadUserPhotoMutation();

  const CreateDropzone = (fieldName: keyof FormValues) => {
    const onDrop = (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        form.setValue(fieldName, acceptedFiles[0], {
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true,
        });
      }
    };

    const acceptMap = {
      photoFile: {
        'image/*': ['.png', '.jpg', '.jpeg', '.webp'],
      },
    };

    return useDropzone({
      onDrop,
      accept: acceptMap[fieldName as keyof typeof acceptMap],
      maxFiles: 1,
    });
  };
  const photoDropzone = CreateDropzone('photoFile');
  const onFormSubmit = (data: FormValues) => {
    // TODO: add user's photo
    uploadPhotoMutation.mutate(
      {
        photoFile: data.photoFile,
      },
      {
        onSuccess: () => {
          toast.success('User Updated Successfully!');
          closeModal();
        },
      }
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onFormSubmit)}
        className="space-y-4 p-2"
      >
        <FormField
          control={form.control}
          name="photoFile"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div
                  {...photoDropzone.getRootProps()}
                  className={`h-[400px] w-[400px] aspect-square border-2 border-dashed border-gray-600 rounded-lg p-6 flex items-center justify-center cursor-pointer ${
                    photoDropzone.isDragActive ? 'border-general-pink' : ''
                  }`}
                >
                  <input {...photoDropzone.getInputProps()} />
                  {field.value ? (
                    <DynamicImage
                      alt={field.value.name}
                      src={URL.createObjectURL(field.value)}
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-4">
                      <FileText className="w-8 h-8 text-general-blue" />
                      <span className="text-nowrap text-general-blue">
                        Add User Photo
                      </span>
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-center">
          <AppButton
            type="submit"
            className="bg-blue-500 hover:bg-general-pink-hover transition-colors duration-200 px-8"
          >
            Save
          </AppButton>
        </div>
      </form>
    </Form>
  );
};

export default UpdateUserForm;
