import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Generate a random hsl color based on a string */
export function stringToHslColor(
  str: string,
): `hsl(${number}, ${number}%, ${number}%)` {
  // Simple hash function to convert string to an integer
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Generate HSL values based on the hash
  const hue = Math.abs(hash) % 360; // Hue is between 0 and 359
  const saturation = 70; // Fixed saturation for more vibrant colors
  const lightness = 50; // Fixed lightness for balanced brightness

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}
