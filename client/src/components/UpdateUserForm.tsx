'use client';

import React from 'react';
import { useForm } from 'react-hook-form';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from './ui/form';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FileText } from 'lucide-react';
import DynamicImage from './custom/DynamicImage';
import { useDropzone } from 'react-dropzone';
import { useUpdateUserMutation } from '@/hooks/useUserMutation';
import { toast } from 'react-toastify';
import { AppButton } from './ui/AppButton';
import { Input } from './ui/Input';
import { useUser } from '@/contexts/UserContext';
import { Gender, Role } from '@/types/global';
import GenderSelect from './GenderSelect';
import { Textarea } from './ui/textarea';

const formSchema = z.object({
  artistName: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  gender: z.enum(['male', 'female']),
  about: z.string(),
  dateOfBirth: z.date(),
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
  const { userDetails, setUserDetails } = useUser();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const updateUserMutation = useUpdateUserMutation();

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
    updateUserMutation.mutate(
      {
        firstName: data.firstName,
        lastName: data.lastName,
        artistName: data.artistName || '',
        photoFile: data.photoFile,
        about: '',
        gender: 'male',
        dateOfBirth: data.dateOfBirth,
      },
      {
        onSuccess: () => {
          toast.success('User Updated Successfully!');
          setUserDetails({
            ...userDetails!,
            photoUrl: URL.createObjectURL(data.photoFile),
          });
          closeModal();
        },
      }
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onFormSubmit)}
        className="flex space-y-4 p-2 flex-col"
      >
        <div className="flex flex-row w-full space-x-4">
          <FormField
            control={form.control}
            name="photoFile"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div
                    {...photoDropzone.getRootProps()}
                    className={`h-[400px] w-[350px] aspect-square border-2 border-dashed border-gray-600 rounded-lg p-6 flex items-center justify-center cursor-pointer ${
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

          <div className="flex flex-col space-y-4">
            {userDetails?.roles.includes(Role.Artist) && (
              <FormField
                control={form.control}
                name="artistName"
                defaultValue={userDetails?.artistName || ''}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">Artist name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your artist name"
                        {...field}
                        className="bg-background border-input"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            )}
            <div className="flex flex-row space-x-2">
              <FormField
                control={form.control}
                name="firstName"
                defaultValue={userDetails?.firstName}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">First name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter first name"
                        {...field}
                        className="bg-background border-input"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                defaultValue={userDetails?.lastName}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">Last name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter last name"
                        {...field}
                        className="bg-background border-input"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="gender"
              defaultValue={userDetails?.gender || Gender.male}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Gender</FormLabel>
                  <FormControl>
                    <GenderSelect field={field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex">
              <FormField
                control={form.control}
                name="dateOfBirth"
                defaultValue={
                  userDetails?.dateOfBirth
                    ? new Date(userDetails.dateOfBirth)
                    : undefined
                }
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">Date of birth</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        value={
                          field.value
                            ? new Date(field.value).toISOString().split('T')[0]
                            : ''
                        }
                        className="bg-background border-input"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <FormField
          control={form.control}
          name="about"
          defaultValue={userDetails?.about || ''}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm">Describe What is all about You</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className="bg-background border-input resize-none text-general-theme"
                  rows={3}
                  placeholder="Tell us about yourself..."
                />
              </FormControl>
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
