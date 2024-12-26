'use client';

import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Music, FileText, ImagePlus, X, Search } from 'lucide-react';
import { AppButton } from '@/components/ui/AppButton';

const formSchema = z.object({
  songName: z.string().min(1, 'Song name is required'),
  description: z.string().optional(),
  lyricFile: z
    .instanceof(File, { message: 'Lyric file is required' })
    .refine(
      (file) =>
        file.type === 'text/plain' || file.name.toLowerCase().endsWith('.lrc'),
      'Only .lrc lyric files are allowed'
    )
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      'File size must be less than 5MB'
    ),
  musicFile: z
    .instanceof(File, { message: 'Music file is required' })
    .refine(
      (file) => ['audio/mpeg', 'audio/mp4', 'video/mp4'].includes(file.type),
      'Only MP3 and MP4 audio files are allowed'
    )
    .refine(
      (file) => file.size <= 20 * 1024 * 1024,
      'File size must be less than 20MB'
    ),
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
  genreIds: z.array(z.number()).min(1, 'At least one genre is required'),
});

type FormValues = z.infer<typeof formSchema>;

export default function UploadForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      songName: '',
      description: '',
      genreIds: [],
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
      musicFile: {
        'audio/mpeg': ['.mp3'],
        'audio/mp4': ['.mp4', '.m4a'],
      },
      lyricFile: {
        'text/plain': ['.lrc'],
      },
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

  const musicDropzone = CreateDropzone('musicFile');
  const lyricDropzone = CreateDropzone('lyricFile');
  const photoDropzone = CreateDropzone('photoFiles');

  const onSubmit = (data: FormValues) => {
    console.log('Form submitted:', data);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col w-full">
      <div className="flex flex-col w-full mx-auto p-4 space-y-4">
        {/* Header */}
        <div className="rounded-lg overflow-hidden">
          <div className="flex from-purple-600 via-pink-500 to-yellow-500 p-4 justify-center items-center bg-[url('/music-landing-bg.webp')] bg-cover bg-center">
            <h1 className="text-2xl font-bold">
              UPLOAD A <span className="text-pink-500">SONG</span>
            </h1>
          </div>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-4"
          >
            {/* Audio Upload */}
            <FormField
              control={form.control}
              name="musicFile"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div
                      {...musicDropzone.getRootProps()}
                      className={`border-2 border-dashed border-gray-600 rounded-lg p-6 flex items-center justify-between cursor-pointer ${
                        musicDropzone.isDragActive ? 'border-general-pink' : ''
                      }`}
                    >
                      <input {...musicDropzone.getInputProps()} />
                      <div className="flex items-center gap-4">
                        <Music className="w-8 h-8" />
                        <span>
                          {field.value
                            ? `Selected: ${field.value.name}`
                            : 'Drag and drop audio file in ".mp3" or ".mp4" extension to get started.'}
                        </span>
                      </div>
                      <Button
                        type="button"
                        variant="secondary"
                        className="bg-general-pink hover:bg-general-pink-hover text-white"
                      >
                        Choose file
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Lyrics file Upload */}
            <FormField
              control={form.control}
              name="lyricFile"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div
                      {...lyricDropzone.getRootProps()}
                      className={`border-2 border-dashed border-gray-600 rounded-lg p-6 flex items-center justify-between cursor-pointer ${
                        lyricDropzone.isDragActive ? 'border-general-pink' : ''
                      }`}
                    >
                      <input {...lyricDropzone.getInputProps()} />
                      <div className="flex items-center gap-4">
                        <FileText className="w-8 h-8" />
                        <span>
                          {field.value
                            ? `Selected: ${field.value.name}`
                            : 'Drag and drop lyric file in ".lrc" extension.'}
                        </span>
                      </div>
                      <Button
                        type="button"
                        variant="secondary"
                        className="bg-general-pink hover:bg-general-pink-hover text-white"
                      >
                        Choose file
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Song's Artwork and Side datas */}
            <div className="flex flex-row w-full">
              <FormField
                control={form.control}
                name="photoFiles"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div
                        {...photoDropzone.getRootProps()}
                        className={`border-2 border-dashed border-gray-600 rounded-lg p-6 flex items-center justify-between cursor-pointer ${
                          photoDropzone.isDragActive
                            ? 'border-general-pink'
                            : ''
                        }`}
                      >
                        <input {...photoDropzone.getInputProps()} />
                        {field.value ? (
                          <></>
                        ) : (
                          <div className="flex flex-col items-center gap-4">
                            <FileText className="w-8 h-8" />
                            <span>Add New Artwork</span>
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col space-y-6 p-4 bg-background text-foreground">
                <FormField
                  control={form.control}
                  name="songName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">
                        Song title <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter song title"
                          {...field}
                          className="bg-background border-input"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="genreIds"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">
                        Genre <span className="text-destructive">*</span>
                      </FormLabel>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <Badge variant="secondary" className="gap-1">
                          Pop
                          <X className="h-3 w-3 cursor-pointer" />
                        </Badge>
                        <Badge variant="secondary" className="gap-1">
                          Classical
                          <X className="h-3 w-3 cursor-pointer" />
                        </Badge>
                      </div>
                      <FormControl>
                        <Select>
                          <SelectTrigger className="bg-background border-input">
                            <SelectValue placeholder="Choose song genre" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pop">Pop</SelectItem>
                            <SelectItem value="classical">Classical</SelectItem>
                            <SelectItem value="rock">Rock</SelectItem>
                            <SelectItem value="jazz">Jazz</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lyricFile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">
                        Co-artists (Optional)
                      </FormLabel>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <Badge variant="secondary" className="gap-1">
                          DuyVip
                          <X className="h-3 w-3 cursor-pointer" />
                        </Badge>
                        <Badge variant="secondary" className="gap-1">
                          DuyVipVaiCaL
                          <X className="h-3 w-3 cursor-pointer" />
                        </Badge>
                      </div>
                      <FormControl>
                        <div className="relative">
                          <svg
                            className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
                            fill="none"
                            height="24"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            width="24"
                          >
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.3-4.3" />
                          </svg>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Upload Button */}
            <div className="flex justify-center">
              <AppButton
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 px-8"
              >
                Upload
              </AppButton>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
