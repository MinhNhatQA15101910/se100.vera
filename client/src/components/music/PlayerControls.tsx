"use client"

import usePlayerStore from "@/stores/player-store";

const PlayerControls = () => {
  const { isPlaying, play, pause, next, previous } = usePlayerStore();

  return (
    <div className="flex items-center justify-center gap-4 p-4">
      <button
        className="p-2 bg-gray-300 rounded"
        onClick={previous}
      >
        Previous
      </button>
      <button
        className="p-4 bg-blue-500 text-white rounded"
        onClick={isPlaying ? pause : play}
      >
        {isPlaying ? "Pause" : "Play"}
      </button>
      <button
        className="p-2 bg-gray-300 rounded"
        onClick={next}
      >
        Next
      </button>
    </div>
  );
};

export default PlayerControls;