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
  console.log(`FormData Loads at ${address}`)
  Array.from(formData.entries()).forEach(([key, value]) => {
    console.log(`${key}: ${value}`);
  });
}
