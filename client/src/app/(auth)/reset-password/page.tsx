

import React from 'react';

import ResetPasswordForm from './_components/ResetPasswordForm';

const ResetPassword = () => {
  return (
    <div
      className="flex flex-col w-screen h-screen items-center justify-center bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: `url('/auth-bg.png')` }}
    >
      <ResetPasswordForm />
    </div>
  );
};

export default ResetPassword;
