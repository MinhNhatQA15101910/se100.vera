'use client';

import { AppButton } from '@/components/ui/AppButton';
import { Input } from '@/components/ui/Input';
import { Search } from 'lucide-react';
import Link from 'next/link';
import UserDropDown from '@/components/UserDropDown';

const Links = [
  { title: 'About us' },
  { title: 'Contact' },
  { title: 'Premium' },
];

export default function MusicLanding() {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div
        className="flex p-4 flex-col w-[90%] h-[90%] text-white rounded-[25px] bg-[linear-gradient(91deg,rgba(0,0,0,0)_13.23%,rgba(0,0,0,0.8)_64.01%),linear-gradient(90deg,rgba(0,0,0,0)_50%,rgba(0,0,0,0.8)_101.37%),url('/music-landing-bg.webp')] bg-[50%] bg-cover bg-no-repeat"
        style={{ backgroundImage: `url('/music-landing-bg.webp')` }}
      >
        {/* Navigation */}
        <nav className="container mx-auto p-4 flex items-center justify-between">
          <div className="relative w-[300px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              className="pl-10 bg-zinc-900 border-none text-white placeholder:text-muted-foreground"
              placeholder="Search For Musics, Artists, ..."
            />
          </div>

          <div className="flex items-center gap-8">
            {Links.map((item) => {
              return (
                <Link
                  key={item.title}
                  href="#"
                  className="text-sm font-bold hover:text-general-pink-hover"
                >
                  {item.title}
                </Link>
              );
            })}
          </div>

          <UserDropDown />
        </nav>

        {/* Hero Section */}
        <div className="container mx-auto px-4 mt-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                All the <span className="text-pink-600">Best Songs</span>
                <br />
                in One Place
              </h1>
              <p className="text-lg text-muted-foreground max-w-[500px] text-justify">
                On our website, you can access an amazing collection of popular
                and new songs. Stream your favorite tracks in high quality and
                enjoy without interruptions. Whatever your taste in music, we
                have it all for you!
              </p>
              <div className="flex gap-4">
                <AppButton className="flex h-10 items-center justify-center rounded px-6 bg-[#EE10B0] hover:bg-pink-700 text-white gap-5">
                  Discover Now
                </AppButton>
                <AppButton className="flex h-10 items-center justify-center rounded px-6 border border-[#0E9EEF] text-[#0E9EEF] hover:bg-[#0E9EEF] hover:text-white">
                  Create Playlist
                </AppButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
