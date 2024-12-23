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