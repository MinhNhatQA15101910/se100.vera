'use client';

import React, { useState } from 'react';
import { useUser } from '@/contexts/UserContext';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AppButton } from '@/components/ui/AppButton';
import Modal from '@/components/Modal';
import ActivateArtistForm from './ActivateArtistForm';
import { formatDate } from '@/lib/utils';

export default function ListenerProfile() {
  const { userDetails } = useUser();
  const [isDialogOpen, setDialogOpen] = useState(false);

  const userDisplayDetails = [
    {
      title: 'Full name',
      detail: `${userDetails?.lastName || 'N/A'} ${userDetails?.firstName || ''}`,
    },
    {
      title: 'Email',
      detail: userDetails?.email || 'dummy@gmail.com',
    },
    {
      title: 'Gender',
      detail: userDetails?.gender || 'N/A',
    },
    {
      title: 'Date of birth',
      detail: formatDate(userDetails?.dateOfBirth || "N/A"),
    },
  ];

  const handleActivateArtistAccount = () => {
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center w-[70%] space-y-4">
      {/* Display for fun */}
      <div className="flex w-full bg-gradient-to-r from-[#FF1493] via-[#9400D3] to-[#0000FF] p-6 rounded-3xl">
        <div className="flex flex-col space-y-1.5 p-6">
          <div className="flex items-center gap-6">
            <Avatar className="w-[25%] h-auto border-4 border-white/10">
              <AvatarImage
                src={userDetails?.photoUrl || 'https://github.com/shadcn.png'}
                alt={userDetails?.lastName || 'User'}
              />
              <AvatarFallback>Not loaded</AvatarFallback>
            </Avatar>
            <div className="flex flex-col justify-center">
              <div className="text-white font-Inter text-2xl font-bold">
                Profile
              </div>
              <h1 className="text-4xl text-white font-Inter font-extrabold leading-tight">
                {userDetails?.lastName || 'N/A'}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Displaying User's details */}
      <div className="flex flex-col w-full space-y-4">
        {userDisplayDetails.map((userDetail, idx) => (
          <div
            key={idx}
            className="flex flex-row text-white h-12 rounded-xl bg-transparent border border-general-pink px-6 py-[15px] justify-between items-center"
          >
            <h2 className="font-bold text-[24px]">
              {userDetail.title.toUpperCase()}
            </h2>
            <h2 className="text-[24px] text-gray-200">{userDetail.detail}</h2>
          </div>
        ))}
      </div>

      {/* Displaying buttons */}
      <div className="flex flex-col w-full space-y-2">
        <AppButton
          onClick={handleActivateArtistAccount}
          className="w-full bg-[#FF1493] hover:bg-[#FF1493]/90 text-white h-12 rounded-xl"
        >
          Activate Artist Account
        </AppButton>
        <AppButton className="w-full bg-[#FF1493] hover:bg-[#FF1493]/90 text-white h-12 rounded-xl">
          Change Profile
        </AppButton>
        <AppButton className="w-full bg-[#FF1493] hover:bg-[#FF1493]/90 text-white h-12 rounded-xl">
          Change Password
        </AppButton>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isDialogOpen}
        onChange={closeDialog}
        title="ACTIVATE ARTIST ACCOUNT"
      >
        <ActivateArtistForm />
      </Modal>
    </div>
  );
}
