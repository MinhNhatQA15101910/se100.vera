"use client";
import ChoosePlaylistCard from "@/components/ui/ChoosePlaylistCard";
import CreatePlaylistCard from "@/components/ui/CreatePlaylistCard";
import React, { useState } from "react";

// Navbar with Search Bar component
const Navbar = () => (
  <div className="bg-[#1e1e1e] p-4 flex items-center justify-between text-white">
    <input
      type="text"
      placeholder="Search for Music, Artists..."
      className="bg-[#333333] rounded-lg px-4 py-2 text-white w-1/2 focus:outline-none"
    />
    <div className="space-x-4">
      <button className="bg-pink-500 px-4 py-2 rounded text-white">
        Login
      </button>
      <button className="bg-purple-600 px-4 py-2 rounded text-white">
        Sign Up
      </button>
    </div>
  </div>
);

// Main Content component with dynamic tab content
const MainContent = () => {
  const [activeTab, setActiveTab] = useState("Trending Songs");

  // Content for each tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "Trending Songs":
        return (
          <div>
            <h2 className="text-3xl font-bold mb-5">Trending Songs</h2>
            <table className="w-full text-left bg-[#1e1e1e] rounded-lg">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="p-3">#</th>
                  <th className="p-3">Title</th>
                  <th className="p-3">Release Date</th>
                  <th className="p-3">Album</th>
                  <th className="p-3">Time</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 20 }).map((_, index) => (
                  <tr key={index} className="border-b border-gray-700">
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3 flex items-center space-x-3">
                      {/* Thumbnail */}
                      <img
                        src="https://via.placeholder.com/50" // Replace with actual image URL
                        alt="Song Thumbnail"
                        className="w-12 h-12 rounded-md"
                      />
                      <div>
                        {/* Song Title */}
                        <p className="text-white font-medium">Song Title</p>
                        {/* Artist Name */}
                        <p className="text-gray-400 text-sm">Artist Name</p>
                      </div>
                    </td>
                    <td className="p-3">Date</td>
                    <td className="p-3">Album Name</td>
                    <td className="p-3">3:45</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case "Top Albums":
        return <h2 className="text-3xl font-bold mb-5">Top Albums</h2>;
      case "Popular Artists":
        return <h2 className="text-3xl font-bold mb-5">Popular Artists</h2>;
      case "Mood Playlist":
        return <h2 className="text-3xl font-bold mb-5">Mood Playlist</h2>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-[#141414] flex-1 p-10 text-white">
      {/* Tabs */}
      <div className="flex space-x-8 text-gray-400 border-b border-gray-700 pb-2 mb-5">
        {[
          "Trending Songs",
          "Top Albums",
          "Popular Artists",
          "Mood Playlist",
        ].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`${
              activeTab === tab ? "text-pink-500 font-semibold" : ""
            } hover:text-pink-500 transition`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {renderTabContent()}
    </div>
  );
};

// Footer component
const Footer = () => (
  <div className="bg-[#1e1e1e] text-white p-5 flex justify-between">
    <p>About</p>
    <p>Vera © 2024</p>
  </div>
);

// Main Page component
const Page = () => (
  <div className="flex h-screen w-screen overflow-hidden">
    <div className="flex flex-col w-full overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <Navbar />
        <MainContent />
        <Footer />
        <ChoosePlaylistCard />
      </div>
    </div>
  </div>
);

export default Page;
