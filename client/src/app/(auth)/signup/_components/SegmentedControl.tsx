'use client';

import { UserType } from '@/types/declaration';
import { Label } from '@/components/ui/Label';

type SegmentedControlProps = {
  isRole: UserType;
  setIsRole: (value: UserType) => void;
};

const SegmentedControl = ({ isRole, setIsRole }: SegmentedControlProps) => {
  return (
    <div className=" flex flex-col items-start space-y-2">
      <Label>Register as</Label>
      <div className="relative flex items-center bg-gray-200 rounded-full p-1">
        <button
          type="button"
          onClick={() => setIsRole('Listener')}
          className={`${
            isRole === 'Listener'
              ? 'bg-general-pink text-white'
              : 'text-gray-500'
          } px-4 py-2 rounded-full duration-300 ease-in-out transform transition-colors`}
        >
          Listener
        </button>
        <button
          type="button"
          onClick={() => setIsRole('Artist')}
          className={`${
            isRole === 'Artist' ? 'bg-general-pink text-white' : 'text-gray-500'
          } px-4 py-2 rounded-full duration-300 ease-in-out transform transition-colors`}
        >
          Artist
        </button>
      </div>
    </div>
  );
};

export default SegmentedControl;
