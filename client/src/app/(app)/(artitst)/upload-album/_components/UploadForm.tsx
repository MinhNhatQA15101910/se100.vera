'use client';

import { useDropzone } from 'react-dropzone';
import { useLoading } from '@/contexts/LoadingContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { FileText, X } from 'lucide-react';
import { AppButton } from '@/components/ui/AppButton';
import { useQuery } from '@tanstack/react-query';
import { getAllArtists } from '@/actions/user-actions';
import DynamicImage from '@/components/custom/DynamicImage';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useAddAlbumMutation } from '@/hooks/useAlbumMutation';
import ArtistSelect from './ArtistSelect';
import { toast } from 'react-toastify';

const formSchema = z.object({
  albumName: z.string().min(1, 'Song name is required'),
  description: z.string().optional(),
  photoFiles: z
    .instanceof(File, { message: 'Photo is required' })
    .refine(
      (file) => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
      'Only JPEG, PNG, and WEBP image files are allowed'
    )
    .refine(
      (file) => file.size <= 5 * 1024 * 1024, // 5MB limit
      'File size must be less than 5MB'
    ),
  artistIds: z.array(z.number()).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function UploadForm() {
  const router = useRouter();
  const { setLoadingState } = useLoading();

  const { data: artistsData, isLoading } = useQuery({
    queryKey: ['user_artist', 'upload_song'],
    queryFn: async () => {
      return await getAllArtists();
    },
  });

  const addAlbumMutation = useAddAlbumMutation();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: '',
      artistIds: [],
      albumName: '',
    },
  });

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
      photoFiles: {
        'image/*': ['.png', '.jpg', '.jpeg', '.webp'],
      },
    };

    return useDropzone({
      onDrop,
      accept: acceptMap[fieldName as keyof typeof acceptMap],
      maxFiles: 1,
    });
  };
  const photoDropzone = CreateDropzone('photoFiles');

  const onSubmit = (data: FormValues) => {
    addAlbumMutation.mutate(
      {
        albumName: data.albumName,
        description: data.description || '',
        photoFiles: [data.photoFiles],
        artistIds: data.artistIds || [],
      },
      {
        onSuccess: () => {
          toast.success('Successfully added the album!');
          router.push('/manage-albums');
        },
      }
    );
  };

  useEffect(() => {
    setLoadingState(isLoading);
  }, [isLoading]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col w-full">
      <div className="flex flex-col w-full mx-auto p-4 space-y-4">
        {/* Header */}
        <div className="rounded-lg overflow-hidden">
          <div className="flex from-purple-600 via-pink-500 to-yellow-500 p-4 justify-center items-center bg-[url('/music-landing-bg.webp')] bg-cover bg-center">
            <h1 className="text-2xl font-bold">
              ADD AN <span className="text-pink-500">ALBUM</span>
            </h1>
          </div>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-4"
          >
            <div className="flex flex-row space-x-4 w-[100%]">
              <FormField
                control={form.control}
                name="photoFiles"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div
                        {...photoDropzone.getRootProps()}
                        className={` h-[400px] w-[400px] border-2 border-dashed border-gray-600 rounded-lg p-6 flex items-center justify-center cursor-pointer ${
                          photoDropzone.isDragActive
                            ? 'border-general-pink'
                            : ''
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
                            <FileText className="w-8 h-8" />
                            <span className="text-nowrap">
                              Add New Album Artwork
                            </span>
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col justify-between space-y-4 text-foreground w-[100%]">
                <FormField
                  control={form.control}
                  name="albumName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">
                        Album title <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter album title"
                          {...field}
                          className="bg-background border-input"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                {/* Specify Added Genres */}

                <FormField
                  control={form.control}
                  name="artistIds"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">
                        Co-artists (Optional)
                      </FormLabel>
                      {/* Display selected artists */}
                      <div className="flex flex-wrap gap-2 mb-2">
                        {field.value?.map((artistId) => {
                          const artistName = artistsData?.artists?.find(
                            (artist) => artist.id === artistId
                          )?.artistName;
                          return (
                            <Badge
                              key={artistId}
                              variant="secondary"
                              className="gap-1"
                            >
                              {artistName}
                              <X
                                className="h-3 w-3 cursor-pointer"
                                onClick={() => {
                                  field.onChange(
                                    field.value?.filter(
                                      (id) => id !== artistId
                                    ) || []
                                  );
                                }}
                              />
                            </Badge>
                          );
                        })}
                      </div>
                      <ArtistSelect
                        artistsData={artistsData?.artists || []}
                        field={field}
                      />
                    </FormItem>
                  )}
                />
                {/*Description*/}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Make a good work of yours okay ?"
                          className="flex flex-col w-full min-h-[25vh] border-general-white rounded-lg text-general-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            {/*List of music needed to be add*/}

            {/* Add Album Button */}
            <div className="flex justify-center">
              <AppButton
                type="submit"
                className="bg-general-pink hover:bg-blue-600 transition-colors duration-200 px-8"
              >
                Add
              </AppButton>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
