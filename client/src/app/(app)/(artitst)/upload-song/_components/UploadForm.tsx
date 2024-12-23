'use client';

import { Button } from '@/components/ui/button';
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

import { Song } from '@/types/global';
import FormContainer from '@/components/FormContainer';
import { Form } from '@/components/ui/form';
import zod from 'zod';

export default function UploadForm() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col w-full">
      <div className="flex flex-col w-full mx-auto p-4  space-y-4">
        {/* Header */}
        <div className=" rounded-lg overflow-hidden">
          <div className="flex from-purple-600 via-pink-500 to-yellow-500 p-4 justify-center items-center bg-[url('/music-landing-bg.webp')] bg-cover bg-center">
            <h1 className="text-2xl font-bold">
              UPLOAD A <span className="text-pink-500">SONG</span>
            </h1>
          </div>
        </div>

        {/* Upload Form */}
        <div className="flex flex-col space-y-4">
          {/* Audio Upload */}
          <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Music className="w-8 h-8" />
              <span>Drag and drop audio files to get started.</span>
            </div>
            <Button
              variant="secondary"
              className="bg-general-pink hover:bg-general-pink-hover text-white"
            >
              Choose file
            </Button>
          </div>

          {/* Lyrics Upload */}
          <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <FileText className="w-8 h-8" />
              <span>Drag and drop lyric files (Optional)</span>
            </div>
            <Button
              variant="secondary"
              className="bg-general-pink hover:bg-general-pink-hover text-white"
            >
              Choose file
            </Button>
          </div>

          <div className="grid md:grid-cols-[300px,1fr] gap-6">
            {/* Artwork Upload */}
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 flex flex-col items-center justify-center text-center aspect-square">
              <ImagePlus className="w-12 h-12 mb-2" />
              <span>Add new artwork</span>
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
              {/* Song Title */}
              <div className="space-y-2">
                <label className="block">
                  Song title <span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder="Enter song title"
                  className="bg-gray-800 border-gray-700"
                />
              </div>

              {/* Genre */}
              <div className="space-y-2">
                <label className="block">
                  Genre <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  <Badge
                    variant="secondary"
                    className="pl-2 pr-1 py-1 flex items-center gap-1"
                  >
                    Pop
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 hover:bg-transparent"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="pl-2 pr-1 py-1 flex items-center gap-1"
                  >
                    Classical
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 hover:bg-transparent"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                </div>
                <Select>
                  <SelectTrigger className="bg-gray-800 border-gray-700">
                    <SelectValue placeholder="Choose song genre" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pop">Pop</SelectItem>
                    <SelectItem value="classical">Classical</SelectItem>
                    <SelectItem value="rock">Rock</SelectItem>
                    <SelectItem value="jazz">Jazz</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Co-artists */}
              <div className="space-y-2">
                <label className="block">Co-artists (Optional)</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  <Badge
                    variant="secondary"
                    className="pl-2 pr-1 py-1 flex items-center gap-1"
                  >
                    DuyVip
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 hover:bg-transparent"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="pl-2 pr-1 py-1 flex items-center gap-1"
                  >
                    DuyVipVaiCaL
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 hover:bg-transparent"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search co-artists"
                    className="bg-gray-800 border-gray-700 pl-9"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="block">Description</label>
            <Textarea
              placeholder="Type something here"
              className="min-h-[150px] bg-gray-800 border-gray-700"
            />
          </div>

          {/* Upload Button */}
          <div className="flex justify-center">
            <Button className="bg-blue-500 hover:bg-blue-600 px-8">
              Upload
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
