import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { randomBytes } from 'crypto';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generatePincode() {
  const pin = randomBytes(3).readUIntLE(0, 3) % 1000000;
  return pin.toString().padStart(6, '0');
}

export function formatDate(date: string) {
  return date.replace(/-/g, '/');
}

export function convertToFormData(formData: Record<string, any>): FormData {
  const browserFormData = new window.FormData();
  for (const [key, value] of Object.entries(formData)) {
    if (value instanceof Blob) {
      browserFormData.append(key, value);
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        browserFormData.append(`${key}[${index}]`, item);
      });
    } else if (typeof value === 'object' && value !== null) {
      browserFormData.append(key, JSON.stringify(value));
    } else if (value !== undefined && value !== null) {
      browserFormData.append(key, String(value));
    }
  }
  return browserFormData;
}

export function consoleLogFormData(address: string, formData: FormData) {
  console.log(`FormData Loads at ${address}`);
  Array.from(formData.entries()).forEach(([key, value]) => {
    console.log(`${key}: ${value}`);
  });
}

export function generateRandomImageSource(): string {
  const randomNum = Math.floor(Math.random() * 1000);
  return `https://picsum.photos/400/400?random=${randomNum}`;
}

export function generateRandomArtist(): string {
  const artistNames = [
    'Hanzo',
    'Hustlang Baby',
    'Desant',
    'Ginjin',
    'Young Mo',
    'Mrs M',
    'Uka',
    'Lil Thug E',
    'Magi',
    'Shadow',
    'Luigini Justasuy',
    'Bayaraa',
    'Ice Top',
    'Rokit Bay',
    'Gee',
    'Vanquish',
    'Endree',
  ];

  const numArtists = Math.floor(Math.random() * 6) + 1;
  const selectedArtists: string[] = [];

  for (let i = 0; i < numArtists; i++) {
    const randomIndex = Math.floor(Math.random() * artistNames.length);
    selectedArtists.push(artistNames[randomIndex]);
    artistNames.splice(randomIndex, 1);
  }
  return `By ${
    selectedArtists.length > 2
      ? selectedArtists.slice(0, -1).join(', ') +
        ' and ' +
        selectedArtists.slice(-1)
      : selectedArtists.join(' and ')
  }`;
}

export const formatTime = (seconds: number) => {
  if (!seconds || isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export function downloadSong(
  fileName: string,
  data: string | ArrayBuffer | ArrayBufferView | Blob,
  mime = "audio/mpeg",
  bom?: string | Uint8Array,
) {
  const blob = bom ? new Blob([bom, data], { type: mime }) : new Blob([data], { type: mime });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 0);
}
