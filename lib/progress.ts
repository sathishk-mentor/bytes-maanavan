'use client';

import { ProgressData } from './types';

const STORAGE_KEY = 'bytes_progress';

function getDefaultProgress(): ProgressData {
  return {
    completedBytes: [],
    lastUpdated: new Date().toISOString(),
    categoryProgress: {},
  };
}

export function getProgress(): ProgressData {
  if (typeof window === 'undefined') {
    return getDefaultProgress();
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return getDefaultProgress();
    }
    return JSON.parse(stored);
  } catch (error) {
    console.error('Error reading progress from localStorage:', error);
    return getDefaultProgress();
  }
}

function saveProgress(progress: ProgressData): void {
  if (typeof window === 'undefined') return;

  try {
    progress.lastUpdated = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('Error saving progress to localStorage:', error);
  }
}

export function markByteComplete(slug: string): void {
  const progress = getProgress();

  if (!progress.completedBytes.includes(slug)) {
    progress.completedBytes.push(slug);
    saveProgress(progress);
  }
}

export function markByteIncomplete(slug: string): void {
  const progress = getProgress();

  progress.completedBytes = progress.completedBytes.filter((s) => s !== slug);
  saveProgress(progress);
}

export function isByteComplete(slug: string): boolean {
  const progress = getProgress();
  return progress.completedBytes.includes(slug);
}

export function getCategoryProgress(categorySlug: string, totalBytes: number): number {
  if (totalBytes === 0) return 0;

  const progress = getProgress();
  // Note: We need to filter completed bytes by category when calculating
  // This is a simplified version - in practice you'd pass category bytes
  const completed = progress.completedBytes.length;
  return Math.round((completed / totalBytes) * 100);
}

export function getTotalProgress(totalBytes: number): number {
  if (totalBytes === 0) return 0;

  const progress = getProgress();
  return Math.round((progress.completedBytes.length / totalBytes) * 100);
}

export function getCompletedBytesCount(): number {
  const progress = getProgress();
  return progress.completedBytes.length;
}

export function resetProgress(): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error resetting progress:', error);
  }
}

export function getCompletedBytesByCategory(categorySlug: string, categoryBytes: string[]): number {
  const progress = getProgress();
  return progress.completedBytes.filter((slug) => categoryBytes.includes(slug)).length;
}
