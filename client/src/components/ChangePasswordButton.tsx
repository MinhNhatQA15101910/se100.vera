'use client';

import React, { useState } from 'react';
import { AppButton } from './ui/AppButton';
import Modal from './Modal';
import ChangePasswordForm from './ChangePasswordForm';

const ChangePasswordButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  return (
    <>
      <AppButton
        className="w-full bg-[#FF1493] hover:bg-[#FF1493]/90 text-white h-12 rounded-xl"
        onClick={() => {
          setIsDialogOpen(true);
        }}
      >
        Change Password
      </AppButton>

      <Modal
        isOpen={isDialogOpen}
        onChange={setIsDialogOpen}
        title="Change Your Password For Security"
      >
        <ChangePasswordForm
          closeModal={() => {
            setIsDialogOpen(false);
          }}
        />
      </Modal>
    </>
  );
};

export default ChangePasswordButton;
