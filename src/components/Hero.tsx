import { ArrowDown, ArrowRight, Download, Github, Linkedin, Mail } from 'lucide-react';
import { profile } from '../data/profile';
import { useLanguage } from '../context/LanguageContext';
import { assetUrl } from '../lib/storage';
import { ExternalLink, Reveal } from './Primitives';
import { SystemVisual } from './SystemVisual';

export function Hero() {
  const { t, localized } = useLanguage();
  return (
    <section id="top" className="hero" aria-label={profile.name}>
      <div className="container">
        <div className="hero-grid">
          <Reveal className="hero-copy">
            <div className="eyebrow hero-eyebrow">
              <span className="tiny-dot" />
              {t.hero.eyebrow}
            </div>
            <h1>
              {profile.firstName}
              <br />
              {profile.lastName}
              <span className="name-dot">.</span>
            </h1>
            <p className="hero-subtitle">
              {profile.subtitle.split(' | ').map((part, i) => (
                <span key={part}>
                  {i > 0 && (
                    <span className="subtitle-separator" aria-hidden="true">
                      /
                    </span>
                  )}
                  {part}
                </span>
              ))}
            </p>
            <p className="hero-intro">{localized(profile.intro)}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#research">
                {t.hero.research}
                <ArrowUpRightIcon />
              </a>
              <a className="button button-secondary" href="#projects">
                {t.hero.projects}
                <ArrowRight size={16} />
              </a>
            </div>
            <div className="hero-meta">
              <div className="social-links">
                <ExternalLink href={profile.github} label="GitHub">
                  <Github size={19} />
                </ExternalLink>
                <ExternalLink href={profile.linkedin} label="LinkedIn">
                  <Linkedin size={19} />
                </ExternalLink>
                <ExternalLink
                  href={profile.email ? `mailto:${profile.email}` : undefined}
                  label={t.common.email}
                >
                  <Mail size={19} />
                </ExternalLink>
              </div>
              <span className="control-divider" />
              {__HAS_RESUME__ ? (
                <a className="resume-link" href={assetUrl('resume.pdf')} download>
                  <Download size={14} />
                  {t.hero.resume}
                </a>
              ) : (
                <span className="resume-link muted">
                  <Download size={14} />
                  {t.hero.resumeUnavailable}
                </span>
              )}
            </div>
          </Reveal>
          <Reveal className="hero-art" delay={0.12}>
            <SystemVisual />
          </Reveal>
        </div>
        <div className="hero-bottom">
          <span className="eyebrow">{t.hero.strip}</span>
          <div className="hero-interest-list">
            <span>AI Systems</span>
            <span>Computer Vision</span>
            <span>Autonomous Systems</span>
            <span>Software-Defined Vehicles</span>
          </div>
          <a href="#about" className="scroll-link" aria-label={t.hero.scroll}>
            <ArrowDown size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
function ArrowUpRightIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      aria-hidden="true"
    >
      <path d="M7 17 17 7M7 7h10v10" />
    </svg>
  );
}
