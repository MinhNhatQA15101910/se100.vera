'use client';

import { AppButton } from '@/components/ui/AppButton';
import React, { useState } from 'react';
import { useUser } from '@/contexts/UserContext';
import ReactCodeInput from 'react-code-input';

const CodeInput = () => {
  const [code, setCode] = useState<string>('');
  const { signup } = useUser();

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

  const onChange = (value: string) => {
    setCode(value);
  };

  const handleVerifyEmail = async () => {
    try {
      await signup(code);
    } catch (error) {
      console.error('Error on handleVerifyEmail: ', error);
    }
  };

  return (
    <div className="flex flex-col justify-center w-full mb-6 space-y-4 items-center">
      <ReactCodeInput
        className="flex justify-center"
        type="number"
        fields={6}
        onChange={onChange}
        value={code}
        name="code-input"
        inputStyle={
          typeof window !== 'undefined' && window.innerWidth < 640
            ? mobilePinputStyle
            : pinputStyle
        }
        inputMode="numeric"
      />

      <div className="flex flex-col w-full items-center gap-4">
        <AppButton
          className="bg-general-pink hover:bg-general-pink-hover rounded-full h-12 w-full sm:w-[200px] group disabled:opacity-50 disabled:cursor-not-allowed"
          type="button"
          disabled={code.length !== 6}
          onClick={handleVerifyEmail}
        >
          <p className="font-bold text-[14px] text-gray-950 group-hover:text-gray-700 transition-colors duration-200">
            VERIFY
          </p>
        </AppButton>
      </div>
    </div>
  );
};

export default CodeInput;
