'use client';

import React from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, User } from 'lucide-react';
import { Button } from './ui/button';
import { useUser } from '@/contexts/UserContext';
import { useRouter } from 'next/navigation';

const UserDropDown = () => {
  const router = useRouter();
  const { userDetails, logout } = useUser();

  return (
    <div className="flex py-1">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="flex overflow-hidden rounded-full bg-general-pink hover:bg-general-pink-hover">
            <div className="relative flex items-center gap-2">
              <Avatar className="w-6 h-6">
                <AvatarImage src="https://picsum.photos/400/400?random=1" />
                <AvatarFallback>AV</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-slate-900">
                {userDetails?.firstName}
              </span>
            </div>
          </Button>
        </DropdownMenuTrigger>

        {/* Dropdown Content */}
        <DropdownMenuContent
          align="end"
          className="w-56 bg-general-pink border-general-pink-border"
        >
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-general-pink-border" />
          <DropdownMenuItem
            className="hover:bg-general-pink-hover"
            onClick={() => {
              router.push('/profile');
            }}
          >
            <User className="mr-2 h-4 w-4" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-general-pink-border" />
          <DropdownMenuItem
            onClick={() => {
              logout();
            }}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserDropDown;
