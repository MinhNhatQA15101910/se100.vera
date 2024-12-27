import React from 'react';
import CodeInput from './_components/CodeInput';
import ReturnPreviousPage from '@/components/ReturnPreviousPage';

const VerifyCode = () => {
  return (
    <div
      className="flex flex-col w-screen min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat bg-fixed px-4"
      style={{ backgroundImage: `url('/auth-bg.png')` }}
    >
      <div
        className="flex flex-col items-center justify-center bg-black bg-opacity-70 p-4 sm:p-6 md:p-8 w-full max-w-[500px] rounded-lg"
      >
        <div className="flex flex-col w-full">
          <div className="flex flex-col w-full mb-6">
            <ReturnPreviousPage />
            <h1 className="text-[24px] md:text-[30px] font-bold tracking-wider text-white text-center mb-3">
              Verify your code
            </h1>
            <p className="text-[14px] md:text-[16px] text-gray-400 text-center">
              Enter the passcode you just received on your email address ending
              with ********in@gmail.com
            </p>
          </div>
          <CodeInput />
        </div>
      </div>
    </div>
  );
};

export default VerifyCode;
