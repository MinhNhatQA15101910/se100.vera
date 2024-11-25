'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ReactCodeInput from 'react-code-input';
import { AppButton } from '@/components/ui/AppButton';

const VerifyCode = () => {
  const [code, setCode] = useState<string>('');

  const handleChange = (value: string) => {
    setCode(value);
  };

  const pinputStyle = {
    backgroundColor: 'transparent',
    width: '45px',
    height: '45px',
    borderRadius: '4px', 
    border: '1px solid #EE10B0',
    color: 'var(--general-white)',
    textAlign: 'center' as const,
    fontSize: '24px',
    MozAppearance: 'textfield' as const,
    WebkitAppearance: 'none' as const,
    appearance: 'none' as const,
    margin: '0 4px',
  };

  const mobilePinputStyle = {
    ...pinputStyle,
    width: '35px',
    height: '35px',
    fontSize: '18px',
    margin: '0 2px',
  };

  return (
    <div
      className="flex flex-col w-screen min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat bg-fixed px-4"
      style={{ backgroundImage: `url('/auth-bg.png')` }}
    >
      <div className="flex flex-col items-center justify-center bg-black bg-opacity-70 p-4 sm:p-6 md:p-8 w-full max-w-[500px] rounded-lg">
        <div className="flex flex-col w-full">
          <div className="flex flex-col w-full mb-6">
            <h1 className="text-[24px] md:text-[30px] font-bold tracking-wider text-white text-center mb-3">
              Verify your code
            </h1>
            <p className="text-[14px] md:text-[16px] text-gray-400 text-center">
              Enter the passcode you just received on your email address ending
              with ********in@gmail.com
            </p>
          </div>
          <div className="flex justify-center w-full mb-6">
            <ReactCodeInput
              className="flex justify-center"
              type="number"
              fields={6}
              onChange={handleChange}
              name="code-input"
              inputStyle={window.innerWidth < 640 ? mobilePinputStyle : pinputStyle}
              inputMode="numeric"
            />
          </div>
          <div className="flex flex-col w-full items-center gap-4">
            <AppButton
              className="bg-general-pink hover:bg-general-pink-hover rounded-full h-12 w-full sm:w-[200px] group disabled:opacity-50 disabled:cursor-not-allowed"
              type="button"
              disabled={code.length !== 6}
            >
              <p className="font-bold text-[14px] text-gray-950 group-hover:text-gray-700 transition-colors duration-200">
                VERIFY
              </p>
            </AppButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyCode;
