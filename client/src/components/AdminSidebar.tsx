'use client';

import React, { useState } from 'react';
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
import { IconType } from 'react-icons/lib';
import AddPlaylistModal from './AddPlaylistModal';

export type SidebarItem = {
  name: string;
  icon: IconType;
  href: string;
};

export type SidebarSection = {
  title: string;
  items: SidebarItem[];
};

const sidebarSections: SidebarSection[] = [
  {
    title: 'Menu',
    items: [
      { name: 'Home', icon: FaHome, href: '/admin/home' },
      {
        name: 'Manage albums',
        icon: FaSearch,
        href: '/admin/manage-albums',
      },
      { name: 'Manage artists', icon: FaMusic, href: '/admin/manage-artists' },
      { name: 'Manage songs', icon: FaUserAlt, href: '/admin/manage-songs' },
      { name: 'Manage genres', icon: FaUserAlt, href: '/admin/manage-genres' },
    ],
  },
];

const Sidebar = ({ paddingBottom = '0' }) => {
  const { logout, isAuthenticated } = useUser();
  const { setLoadingState } = useLoading();
  const [isAddPlaylistModalOpen, setIsAddPlaylistModalOpen] = useState(false);
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
      className={`h-screen sticky top-0 animated-border z-2 flex-col min-h-screen text-white max-w-fit p-6 border-r border-r-general-pink shadow-[8px_0px_24.2px_0px_rgba(238,16,176,0.15)] animate-[border-pulse_2s_ease-in-out_infinite] ${isAuthenticated ? `flex` : `hidden`}`}
    >
      <div
        className="overflow-y-scroll"
        style={{
          paddingBottom,
        }}
      >
        {/* Logo */}
        <h1
          onClick={() => {
            router.push('/home');
          }}
          className="title-text-gradient mb-8 cursor-pointer"
        >
          VERA
        </h1>
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
                  ) : item.href === '/add-playlist' ? (
                    <div
                      onClick={() => {
                        setIsAddPlaylistModalOpen(true);
                      }}
                      className={`group flex items-center space-x-3 hover:bg-slate-400/20 p-2 rounded-md cursor-pointer`}
                    >
                      <item.icon
                        className={`text-xs group-hover:text-pink-500 ${pathname === item.href ? 'text-general-pink' : ''}`}
                      />
                      <span
                        className={`sub-header whitespace-nowrap group-hover:text-pink-500 ${pathname === item.href ? 'text-general-pink' : ''}`}
                      >
                        {item.name}
                      </span>
                    </div>
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
        <AddPlaylistModal
          isOpen={isAddPlaylistModalOpen}
          onClose={() => {
            setIsAddPlaylistModalOpen(false);
          }}
        />
      </div>
    </div>
  );
};

export default Sidebar;
