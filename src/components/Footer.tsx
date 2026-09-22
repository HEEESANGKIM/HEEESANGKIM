import { ArrowUp } from 'lucide-react';
import { profile } from '../data/profile';
import { useLanguage } from '../context/LanguageContext';
import { ExternalLink } from './Primitives';
export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <a href="#top" className="wordmark">
            {profile.name}
            <span className="brand-dot" />
          </a>
          <p>
            © {new Date().getFullYear()} · {t.footer.note}
          </p>
        </div>
        <div className="footer-right">
          <span>{t.footer.built}</span>
          <ExternalLink href={profile.github}>GitHub</ExternalLink>
          <a className="icon-button" href="#top" aria-label={t.footer.top}>
            <ArrowUp size={17} />
          </a>
        </div>
      </div>
    </footer>
  );
}
