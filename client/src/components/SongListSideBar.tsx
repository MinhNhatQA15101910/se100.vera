import React from 'react';

const SongListSideBar = ({ paddingBottom = '0' }) => {
  return (
    <div
      className="h-screen hidden sticky top-0 md:flex bg-[#181818] text-white flex-col min-h-screen border-l border-l-general-pink shadow-[8px_0px_24.2px_0px_rgba(238,16,176,0.15)] animate-[border-pulse_2s_ease-in-out_infinite]"
      style={{
        width: '300px',
        paddingBottom,
      }}
    >
      <div className="overflow-y-scroll">
        <div className="p-4">
          <h2 className="text-lg font-bold mb-4">Queue</h2>

          <div className="mb-6">
            <h3 className="text-sm text-gray-400">Now playing</h3>
            <p className="text-base font-medium">Walk Thru Fire</p>
            <p className="text-sm text-gray-400">Vicetone</p>
          </div>

          <div>
            <h3 className="text-sm text-gray-400 mb-3">
              Next from: Walk Thru Fire
            </h3>
            <ul className="space-y-4">
              <li className="flex flex-col">
                <p className="text-base font-medium">Nevada</p>
                <p className="text-sm text-gray-400">
                  Vicetone, Cozi Zuehlsdorff
                </p>
              </li>
              <li className="flex flex-col">
                <p className="text-base font-medium">Fearless Pt. II</p>
                <p className="text-sm text-gray-400">Lost Sky, Chris Linton</p>
              </li>
              <li className="flex flex-col">
                <p className="text-base font-medium">
                  Something Just Like This
                </p>
                <p className="text-sm text-gray-400">
                  The Chainsmokers, Coldplay
                </p>
              </li>
              <li className="flex flex-col">
                <p className="text-base font-medium">On & On</p>
                <p className="text-sm text-gray-400">
                  Cartoon, Jéja, Daniel Levi
                </p>
              </li>
              <li className="flex flex-col">
                <p className="text-base font-medium">Everything</p>
                <p className="text-sm text-gray-400">Diamond Eyes</p>
              </li>
              <li className="flex flex-col">
                <p className="text-base font-medium">
                  Something Just Like This
                </p>
                <p className="text-sm text-gray-400">
                  The Chainsmokers, Coldplay
                </p>
              </li>
              <li className="flex flex-col">
                <p className="text-base font-medium">On & On</p>
                <p className="text-sm text-gray-400">
                  Cartoon, Jéja, Daniel Levi
                </p>
              </li>
              <li className="flex flex-col">
                <p className="text-base font-medium">Everything</p>
                <p className="text-sm text-gray-400">Diamond Eyes</p>
              </li>
              <li className="flex flex-col">
                <p className="text-base font-medium">
                  Something Just Like This
                </p>
                <p className="text-sm text-gray-400">
                  The Chainsmokers, Coldplay
                </p>
              </li>
              <li className="flex flex-col">
                <p className="text-base font-medium">On & On</p>
                <p className="text-sm text-gray-400">
                  Cartoon, Jéja, Daniel Levi
                </p>
              </li>
              <li className="flex flex-col">
                <p className="text-base font-medium">Everything</p>
                <p className="text-sm text-gray-400">Diamond Eyes</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongListSideBar;
