'use client';

import React, { useState } from 'react';
import { AppButton } from './ui/AppButton';
import Modal from './Modal';
import UpdateUserForm from './UpdateUserForm';
import { UserDto } from '@/types/auth';

const EditProfileButton = ({ user }: { user: UserDto | null }) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  if (user === null) {
    return;
  }

  return (
    <>
      <AppButton
        onClick={() => {
          setIsDialogOpen(true);
        }}
        className="w-full bg-[#FF1493] hover:bg-[#FF1493]/90 text-white h-12 rounded-xl"
      >
        Edit Profile
      </AppButton>
      <Modal
        isOpen={isDialogOpen}
        onChange={closeDialog}
        title="Edit User Information"
      >
        <UpdateUserForm
          closeModal={() => {
            setIsDialogOpen(false);
          }}
        />
      </Modal>
    </>
  );
};

export default EditProfileButton;
