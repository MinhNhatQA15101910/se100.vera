'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  FaHome,
  FaSearch,
  FaMusic,
  FaUserAlt,
  FaClock,
  FaHeart,
  FaPlus,
  FaCog,
  FaPersonBooth,
  FaSignOutAlt,
} from 'react-icons/fa';
import { useUser } from '@/contexts/UserContext';
import { useLoading } from '@/contexts/LoadingContext';

const sidebarSections = [
  {
    title: 'Menu',
    items: [
      { name: 'Home', icon: FaHome, href: '/home' },
      { name: 'Discover', icon: FaSearch, href: '/discover' },
      { name: 'Albums', icon: FaMusic, href: '/albums' },
      { name: 'Artists', icon: FaUserAlt, href: '/artists' },
    ],
  },
  {
    title: 'Library',
    items: [
      { name: 'Recently Added', icon: FaClock, href: '/recently-added' },
      { name: 'Most Played', icon: FaMusic, href: '/most-played' },
    ],
  },
  {
    title: 'Playlist and Favorite',
    items: [
      { name: 'Your Favorites', icon: FaHeart, href: '/favorites' },
      { name: 'Your Playlist', icon: FaMusic, href: '/your-playlist' },
      { name: 'Add Playlist', icon: FaPlus, href: '/add-playlist' },
    ],
  },
  {
    title: 'General',
    items: [
      { name: 'Profile', icon: FaPersonBooth, href: '/profile' },
      { name: 'Settings', icon: FaCog, href: '/settings' },
      { name: 'Logout', icon: FaSignOutAlt, href: '#' },
    ],
  },
];

const Sidebar = () => {
  const { logout, isAuthenticated } = useUser();
  const {setLoadingState} = useLoading();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    setLoadingState(true);
    logout();
    router.push('/login');
    setLoadingState(false);
  };

  return (
    <div
      className={`hidden sticky top-0 animated-border h-full z-2 md:flex flex-col min-h-screen text-white max-w-fit p-6 border-r border-r-general-pink shadow-[8px_0px_24.2px_0px_rgba(238,16,176,0.15)] animate-[border-pulse_2s_ease-in-out_infinite] ${!isAuthenticated && 'hidden'}`}
    >
      {/* Logo */}
      <h1 className="title-text-gradient mb-8">VERA</h1>
      {sidebarSections.map((section, index) => (
        <div
          key={section.title}
          className={index !== sidebarSections.length - 1 ? 'mb-4' : ''}
        >
          <h3 className="sidebar-second-header tracking-wide mb-3 whitespace-nowrap">
            {section.title}
          </h3>
          <ul>
            {section.items.map((item) => (
              <li key={item.name} className="flex flex-col">
                {item.name === 'Logout' ? (
                  <button
                    onClick={handleLogout}
                    className={`group flex items-center space-x-3 p-2`}
                  >
                    <item.icon
                      className={`text-xs group-hover:text-pink-500 ${pathname === item.href ? 'text-general-pink' : ''}`}
                    />
                    <span
                      className={`sub-header whitespace-nowrap group-hover:text-pink-500 ${pathname === item.href ? 'text-general-pink' : ''}`}
                    >
                      {item.name}
                    </span>
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={`group flex items-center space-x-3 hover:bg-slate-400/20 p-2 rounded-md`}
                  >
                    <item.icon
                      className={`text-xs group-hover:text-pink-500 ${pathname === item.href ? 'text-general-pink' : ''}`}
                    />
                    <span
                      className={`sub-header whitespace-nowrap group-hover:text-pink-500 ${pathname === item.href ? 'text-general-pink' : ''}`}
                    >
                      {item.name}
                    </span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
