import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes with clsx
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a number as a percentage
 */
export function formatPercentage(value: number, decimals = 0): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Format a number with commas
 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value);
}

/**
 * Generate a slug from a string
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
}

/**
 * Capitalize the first letter of each word
 */
export function titleCase(text: string): string {
  return text
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

/**
 * Truncate text to a specified length
 */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + '...';
}

/**
 * Get visualization colors array
 */
export function getVizColors(): string[] {
  return [
    'var(--viz-blue)',
    'var(--viz-green)',
    'var(--viz-yellow)',
    'var(--viz-purple)',
    'var(--viz-cyan)',
    'var(--viz-pink)',
    'var(--viz-orange)',
    'var(--viz-red)',
  ];
}

/**
 * Get a color from the visualization palette by index
 */
export function getVizColor(index: number): string {
  const colors = getVizColors();
  return colors[index % colors.length];
}
