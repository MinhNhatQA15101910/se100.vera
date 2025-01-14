'use client';

import { useUser } from '@/contexts/UserContext';
import { useRouter } from 'next/navigation';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AppButton } from '@/components/ui/AppButton';
import EditProfileButton from '@/components/EditProfileButton';
import ChangePasswordButton from '@/components/ChangePasswordButton';

export default function ArtistProfile() {
  const { userDetails } = useUser();
  const router = useRouter();

  const userDisplayDetails = [
    {
      title: 'Full name',
      detail: `${userDetails?.lastName} ${userDetails?.firstName}`,
    },
    {
      title: 'Email',
      // detail: `${userDetails?.}`
      detail: `${userDetails?.email}`,
    },
    {
      title: 'Gender',
      detail: `${userDetails?.gender === "male" ? "Male" : "Female"}`,
    },
    {
      title: 'Date of birth',
      detail: `${userDetails?.dateOfBirth}`,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen items-center justify-center w-[70%] space-y-4 mt-8">
      {/* Display for fun */}
      <div className=" flex flex-col w-full bg-gradient-to-r from-[#FF1493] via-[#9400D3] to-[#0000FF] p-6 rounded-3xl">
        <div className="flex flex-col space-y-1.5 p-6">
          <div className="flex items-center gap-6">
            <Avatar className="w-[25%] h-auto border-4 border-white/10">
              <AvatarImage
                src={userDetails?.photoUrl || 'https://github.com/shadcn.png'}
                alt="@shadcn"
              />
              <AvatarFallback>Load chưa xong</AvatarFallback>
            </Avatar>
            <div className="flex flex-col justify-center">
              <div className="text-white font-Inter text-2xl font-bold">
                Profile
              </div>
              <h1 className="text-4xl text-white text-[100px] font-Inter font-extrabold leading-tight">
                {userDetails?.lastName}
              </h1>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full">
          <h2 className="font-bold text-2xl text-general-white">DESCRIPTION</h2>
          <p className="text-justify text-general-white">
            {userDetails?.about}
          </p>
        </div>
      </div>

      {/* Manage buttons */}
      <div className="flex flex-row justify-between w-full space-x-4">
        <AppButton
          className="flex w-full bg-general-pink hover:bg-general-pink-hover text-[24px] font-bold py-5"
          onClick={() => {
            router.push('/manage-songs');
          }}
        >
          Manage songs
        </AppButton>

        <AppButton
          className="flex w-full bg-general-blue hover:bg-general-blue-hover text-[24px] font-bold py-5"
          onClick={() => {
            router.push('/manage-albums');
          }}
        >
          Manage albums
        </AppButton>
      </div>
      {/* Displaying User's details */}
      <div className="flex flex-col w-full space-y-4">
        {userDisplayDetails.map((userDetail, idx) => {
          return (
            <div
              key={idx}
              className="flex flex-row text-white h-12 rounded-xl bg-transparent border border-general-pink px-6 py-[15px] justify-between items-center"
            >
              <h2 className="font-bold text-[24px]">
                {userDetail.title.toUpperCase()}
              </h2>
              <h2 className="text-[24px] text-gray-200">{userDetail.detail}</h2>
            </div>
          );
        })}
      </div>

      {/* Displaying buttons */}
      <div className="flex flex-col w-full space-y-2">
        <EditProfileButton user={userDetails} />
        <ChangePasswordButton />
      </div>
    </div>
  );
}
