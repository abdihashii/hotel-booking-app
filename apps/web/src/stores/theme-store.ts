import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { PersistStorage, StorageValue } from 'zustand/middleware';

type Theme = 'dark' | 'light' | 'system';

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  resolvedTheme: () => 'dark' | 'light';
}

function getSystemTheme(): 'dark' | 'light' {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

/**
 * Custom storage adapter that migrates the legacy raw string format
 * (e.g. "dark") to Zustand's persist format (e.g. {"state":{"theme":"dark"},"version":0}).
 */
const migratingStorage: PersistStorage<Pick<ThemeState, 'theme'>> = {
  getItem: (name) => {
    const raw = localStorage.getItem(name);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as StorageValue<Pick<ThemeState, 'theme'>>;
    } catch {
      // Legacy raw string (e.g. "dark") — migrate it
      const migrated: StorageValue<Pick<ThemeState, 'theme'>> = {
        state: { theme: raw as Theme },
        version: 0,
      };
      localStorage.setItem(name, JSON.stringify(migrated));
      return migrated;
    }
  },
  setItem: (name, value) => localStorage.setItem(name, JSON.stringify(value)),
  removeItem: (name) => localStorage.removeItem(name),
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'dark',
      setTheme: (theme: Theme) => set({ theme }),
      toggleTheme: () => {
        const current = get().resolvedTheme();
        set({ theme: current === 'dark' ? 'light' : 'dark' });
      },
      resolvedTheme: () => {
        const { theme } = get();
        return theme === 'system' ? getSystemTheme() : theme;
      },
    }),
    {
      name: 'vite-ui-theme',
      partialize: (state) => ({ theme: state.theme }),
      storage: migratingStorage,
    },
  ),
);
