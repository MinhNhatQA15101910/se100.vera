'use client';

import React from 'react';
import { GenderType } from '@/types/declaration';
import { Label } from '@/components/ui/Label';
import { Checkbox } from '@/components/ui/CheckBox';

type GenderSelectionProps = {
  isGender: GenderType;
  setIsGender: (value: GenderType) => void;
};

const GenderSelection = ({ isGender, setIsGender }: GenderSelectionProps) => {
  return (
    <div className="flex flex-row items-center justify-between mb-5">
      <Label>Gender</Label>
      <div className="flex flex-row space-x-4 items-center">
        <Checkbox
          checked={isGender === 'Male'}
          onCheckedChange={() => setIsGender('Male')}
          className={`w-6 h-6 rounded-md bg-general-pink${
            isGender === 'Male' ? 'bg-red-100' : 'bg-transparent'
          } border border-general-pink flex items-center justify-center transition-colors duration-200`}
        />
        <span className="text-gray-400">Male</span>
      </div>
      <div className="flex flex-row space-x-4 items-center">
        <Checkbox
          checked={isGender === 'Female'}
          onCheckedChange={() => setIsGender('Female')}
          className={`w-6 h-6 rounded-md bg-general-pink${
            isGender === 'Female' ? 'bg-red-100' : 'bg-transparent'
          } border border-general-pink flex items-center justify-center transition-colors duration-200`}
        />
        <span className="text-gray-400">Female</span>
      </div>
    </div>
  );
};

export default GenderSelection;
