import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { readPreference, writePreference } from '../lib/storage';
type Theme = 'light' | 'dark';
const ThemeContext = createContext<{ theme: Theme; toggle: () => void } | null>(null);
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [preference, setPreference] = useState<Theme | null>(() => {
    const saved = readPreference('hk-theme');
    return saved === 'dark' || saved === 'light' ? saved : null;
  });
  const theme = preference ?? 'dark';
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'dark' ? '#0b1018' : '#f8f9fc');
  }, [theme]);
  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setPreference(next);
    writePreference('hk-theme', next);
  };
  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
}
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme requires ThemeProvider');
  return context;
}
