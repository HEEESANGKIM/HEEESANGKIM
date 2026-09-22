import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const { t } = useLanguage();
  return (
    <button
      className="icon-button theme-toggle"
      onClick={toggle}
      aria-label={theme === 'dark' ? t.common.light : t.common.dark}
      title={theme === 'dark' ? t.common.light : t.common.dark}
    >
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
