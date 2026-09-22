import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { profile } from '../data/profile';
import { useLanguage } from '../context/LanguageContext';
import { ThemeToggle } from './ThemeToggle';
import { LanguageToggle } from './LanguageToggle';

export function Navbar() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  const sections = Object.keys(t.nav) as (keyof typeof t.nav)[];
  useEffect(() => {
    let frame = 0;
    const update = () => {
      setScrolled(window.scrollY > 20);
      let current = '';
      const atBottom =
        window.scrollY > 50 &&
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 8;
      const activationLine = Math.max(160, window.innerHeight * 0.25);
      document.querySelectorAll<HTMLElement>('main > section[id]').forEach((section) => {
        if (section.getBoundingClientRect().top <= activationLine) current = section.id;
      });
      setActive(atBottom ? 'contact' : current);
      frame = 0;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
  useEffect(() => {
    if (!open) return;
    const keydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    const outside = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) setOpen(false);
    };
    const desktop = matchMedia('(min-width: 1120px)');
    const resize = () => {
      if (desktop.matches) setOpen(false);
    };
    document.addEventListener('keydown', keydown);
    document.addEventListener('pointerdown', outside);
    desktop.addEventListener('change', resize);
    return () => {
      document.removeEventListener('keydown', keydown);
      document.removeEventListener('pointerdown', outside);
      desktop.removeEventListener('change', resize);
    };
  }, [open]);
  function navigate(id: string) {
    setOpen(false);
    document.getElementById(id)?.focus({ preventScroll: true });
  }
  return (
    <header ref={header} className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-inner">
        <a className="wordmark" href="#top" onClick={() => setOpen(false)}>
          {profile.name}
          <span className="brand-dot" />
        </a>
        <nav
          aria-label={t.common.menu}
          id="main-navigation"
          className={`nav-links ${open ? 'is-open' : ''}`}
        >
          {sections.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => navigate(id)}
              aria-current={active === id ? 'location' : undefined}
            >
              {t.nav[id]}
              {id === 'contact' && <ArrowUpRight size={13} aria-hidden="true" />}
            </a>
          ))}
        </nav>
        <div className="nav-controls">
          <LanguageToggle />
          <span className="control-divider" />
          <ThemeToggle />
          <button
            ref={menuButton}
            className="icon-button menu-toggle"
            onClick={() => setOpen(!open)}
            aria-label={open ? t.common.closeMenu : t.common.menu}
            aria-controls="main-navigation"
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}
