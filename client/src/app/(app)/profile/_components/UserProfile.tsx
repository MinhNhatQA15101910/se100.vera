'use client';

import React from 'react';
import ListenerProfile from './ListenerProfile';
import ArtistProfile from './ArtistProfile';

import { useUser } from '@/contexts/UserContext';
enum Role {
  Admin = 'Admin',
  Artist = 'Artist',
  User = 'User',
}

const UserProfile = () => {
  const { userDetails } = useUser();

  return (
    <div className="flex flex-col w-full justify-center items-center">
      {/* Render User follows LISTENER / ARTIST */}
      {userDetails?.roles.includes(Role.Artist) ? (
        <ArtistProfile />
      ) : (
        <ListenerProfile />
      )}
    </div>
  );
};

export default UserProfile;
