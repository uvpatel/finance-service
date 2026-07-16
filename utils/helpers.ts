import type { ApiError } from '@/types';
import type { AxiosError } from 'axios';

/** Extract a user-friendly error message from an Axios error */
export function getApiErrorMessage(error: unknown): string {
  const axiosErr = error as AxiosError<ApiError>;
  if (axiosErr?.response?.data?.message) {
    return axiosErr.response.data.message;
  }
  if (axiosErr?.message) {
    return axiosErr.message;
  }
  return 'An unexpected error occurred. Please try again.';
}

/** Format a number as Indian Rupees */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Format an ISO date string to DD/MM/YYYY */
export function formatDate(iso: string): string {
  const d = new Date(iso);
  const day   = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year  = d.getFullYear();
  return `${day}/${month}/${year}`;
}

/** Capitalise the first letter of each word */
export function toTitleCase(str: string): string {
  return str
    .toLowerCase()
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

/** Generate initials from a full name (max 2 chars) */
export function getInitials(name: string): string {
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

/** Mask a mobile number: show only last 4 digits */
export function maskMobile(mobile: string): string {
  if (mobile.length < 4) return mobile;
  return `XXXXXX${mobile.slice(-4)}`;
}

/** Deep merge two objects (shallow-safe) */
export function mergeObjects<T extends object>(target: T, source: Partial<T>): T {
  return { ...target, ...source };
}
