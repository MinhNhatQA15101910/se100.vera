'use client';

import React, { useEffect, useRef, useState } from 'react';
import usePlayerStore from '@/stores/player-store';
import { useLoading } from '@/contexts/LoadingContext';

interface LyricLine {
  time: number;
  text: string;
}

const Lyric: React.FC = () => {
  const { activeSong, currentDuration } = usePlayerStore();
  const { setLoadingState } = useLoading();
  const [lyrics, setLyrics] = useState<LyricLine[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const lrcUrl = activeSong?.lyricUrl;

  useEffect(() => {
    const fetchLyrics = async () => {
      try {
        setLoadingState(true);
        const response = await fetch(lrcUrl || '');

        const lrcText = await response.text();

        if (!lrcText) {
          setLyrics([]);
          return;
        }

        const parsedLyrics = parseLrc(lrcText);
        setLyrics(parsedLyrics);
      } catch (error) {
        console.error('Error fetching or parsing LRC file:', error);
      } finally {
        setLoadingState(false);
      }
    };

    fetchLyrics();
  }, []);

  useEffect(() => {
    if (!lyrics.length || currentDuration === undefined) {
      setCurrentLineIndex(null);
      return;
    }

    const currentDurationInMillis = currentDuration * 1000;

    const currentIndex = lyrics.findIndex((line, index) => {
      const nextLine = lyrics[index + 1];
      return (
        currentDurationInMillis >= line.time &&
        (!nextLine || currentDurationInMillis < nextLine.time)
      );
    });

    setCurrentLineIndex(currentIndex >= 0 ? currentIndex : null);
  }, [currentDuration, lyrics]);

  useEffect(() => {
    if (currentLineIndex !== null && scrollRef.current) {
      const activeLine = scrollRef.current.querySelector(
        `.lyric-line[data-index="${currentLineIndex}"]`
      ) as HTMLDivElement;
      if (activeLine) {
        activeLine.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [currentLineIndex]);

  return (
    <div
      style={{
        textAlign: 'center',
        fontSize: '1rem',
        overflowY: 'auto',
        padding: '10px',
      }}
      ref={scrollRef}
    >
      {lyrics.map((line, index) => {
        let color = 'lightgray';
        let fontWeight = 'normal';
        const fontSize = '2.5rem';

        if (index === currentLineIndex) {
          color = '#EE10B0';
          fontWeight = 'bold';
        }

        return (
          <div
            key={index}
            data-index={index}
            className="lyric-line"
            style={{
              color,
              fontWeight,
              fontSize,
              margin: '5px 0',
              transition: 'color 0.3s, font-weight 0.3s',
            }}
          >
            {line.text}
          </div>
        );
      })}
    </div>
  );
};

const parseLrc = (lrcText: string): LyricLine[] => {
  const lines = lrcText.split('\n');
  const lyrics: LyricLine[] = [];

  const timeRegex = /\[(\d{2}):(\d{2})(\.\d{2,3})?\]/;

  lines.forEach((line) => {
    const match = line.match(timeRegex);

    if (match) {
      const minutes = parseInt(match[1], 10);
      const seconds = parseInt(match[2], 10);
      const milliseconds = match[3] ? parseFloat(match[3]) * 1000 : 0;

      const time = minutes * 60 * 1000 + seconds * 1000 + milliseconds;
      const text = line.replace(timeRegex, '').trim();

      lyrics.push({ time, text });
    }
  });

  return lyrics.sort((a, b) => a.time - b.time);
};

export default Lyric;
