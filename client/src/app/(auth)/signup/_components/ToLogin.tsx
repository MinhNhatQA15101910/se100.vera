"use client"

import React from 'react';
import { useRouter } from 'next/navigation';
import { useLoading } from '@/contexts/LoadingContext';
import BottomGradient from '@/components/BottomGradient';


const ToLogin = () => {
    const router = useRouter();
    const { isLoading } = useLoading();
  
    return (
      <div className="flex flex-col items-center justify-between space-y-4 w-[350px]">
        <p className="text-general-white">Don&apos;t have an account?</p>
        <button
          className="relative group/btn block w-full rounded-full h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] border border-general-pink"
          disabled={isLoading}
          onClick={() => router.push('/login')}
        >
          <p className="text-[13px] font-bold tracking-[1.5px] text-center text-general-pink">
            LOG IN VERA
          </p>
          <BottomGradient />
        </button>
      </div>
    );
};

export default ToLogin;
