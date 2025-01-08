"use client"

import { useState } from "react";
import { toast } from "react-toastify";

interface MediaDurationHook {
  duration: number | null;
  getDuration: (url: string) => void;
}

const useMediaDuration = (): MediaDurationHook => {
  const [duration, setDuration] = useState<number | null>(null);

  const getDuration = (url: string): void => {
    if (!url) {
      toast.error("No URL provided.");
      setDuration(null);
      return;
    }

    const mediaElement = document.createElement(
      url.endsWith(".mp3") ? "audio" : "video"
    );
    mediaElement.src = url;

    // Extract duration when metadata is loaded
    mediaElement.addEventListener("loadedmetadata", () => {
      setDuration(mediaElement.duration); 
    });

    mediaElement.addEventListener("error", () => {
      toast.error("Error loading media file. Please check the URL.");
      setDuration(null);
    });
  };

  return { duration, getDuration };
};

export default useMediaDuration;
