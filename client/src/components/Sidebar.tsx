"use client"

import React from "react";
import {
  FaHome,
  FaSearch,
  FaMusic,
  FaUserAlt,
  FaClock,
  FaHeart,
  FaPlus,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="text-white h-screen w-64 p-6">
      {/* Logo */}
      <h1 className="text-3xl font-bold text-pink-500 mb-8">Vera</h1>

      {/* Menu Section */}
      <div className="mb-6">
        <h3 className="uppercase text-gray-400 text-xs tracking-wide mb-3">
          Menu
        </h3>
        <ul>
          <li className="mb-4">
            <a
              href="/home"
              className="flex items-center space-x-3 text-white hover:text-pink-500 transition-colors"
            >
              <FaHome className="text-lg" />
              <span>Home</span>
            </a>
          </li>
          <li className="mb-4">
            <a
              href="/discover"
              className="flex items-center space-x-3 text-white hover:text-pink-500 transition-colors"
            >
              <FaSearch className="text-lg" />
              <span>Discover</span>
            </a>
          </li>
          <li className="mb-4">
            <a
              href="/albums"
              className="flex items-center space-x-3 text-white hover:text-pink-500 transition-colors"
            >
              <FaMusic className="text-lg" />
              <span>Albums</span>
            </a>
          </li>
          <li className="mb-4">
            <a
              href="/artists"
              className="flex items-center space-x-3 text-white hover:text-pink-500 transition-colors"
            >
              <FaUserAlt className="text-lg" />
              <span>Artists</span>
            </a>
          </li>
        </ul>
      </div>

      {/* Library Section */}
      <div className="mb-6">
        <h3 className="uppercase text-gray-400 text-xs tracking-wide mb-3">
          Library
        </h3>
        <ul>
          <li className="mb-4">
            <a
              href="/recently-added"
              className="flex items-center space-x-3 text-white hover:text-pink-500 transition-colors"
            >
              <FaClock className="text-lg" />
              <span>Recently Added</span>
            </a>
          </li>
          <li className="mb-4">
            <a
              href="/most-played"
              className="flex items-center space-x-3 text-white hover:text-pink-500 transition-colors"
            >
              <FaMusic className="text-lg" />
              <span>Most Played</span>
            </a>
          </li>
        </ul>
      </div>

      {/* Playlist and Favorite Section */}
      <div className="mb-6">
        <h3 className="uppercase text-gray-400 text-xs tracking-wide mb-3">
          Playlist and Favorite
        </h3>
        <ul>
          <li className="mb-4">
            <a
              href="/favorites"
              className="flex items-center space-x-3 text-white hover:text-pink-500 transition-colors"
            >
              <FaHeart className="text-lg" />
              <span>Your Favorites</span>
            </a>
          </li>
          <li className="mb-4">
            <a
              href="/your-playlist"
              className="flex items-center space-x-3 text-white hover:text-pink-500 transition-colors"
            >
              <FaMusic className="text-lg" />
              <span>Your Playlist</span>
            </a>
          </li>
          <li className="mb-4">
            <a
              href="/add-playlist"
              className="flex items-center space-x-3 text-white hover:text-pink-500 transition-colors"
            >
              <FaPlus className="text-lg" />
              <span>Add Playlist</span>
            </a>
          </li>
        </ul>
      </div>

      {/* General Section */}
      <div>
        <h3 className="uppercase text-gray-400 text-xs tracking-wide mb-3">
          General
        </h3>
        <ul>
          <li className="mb-4">
            <a
              href="/settings"
              className="flex items-center space-x-3 text-white hover:text-pink-500 transition-colors"
            >
              <FaCog className="text-lg" />
              <span>Settings</span>
            </a>
          </li>
          <li>
            <a
              href="/logout"
              className="flex items-center space-x-3 text-white hover:text-pink-500 transition-colors"
            >
              <FaSignOutAlt className="text-lg" />
              <span>Logout</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
