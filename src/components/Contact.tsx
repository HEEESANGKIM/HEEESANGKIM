import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import { profile } from '../data/profile';
import { useLanguage } from '../context/LanguageContext';
import { safeUrl } from '../lib/storage';
import { ExternalLink, Section } from './Primitives';
export function Contact() {
  const { t } = useLanguage();
  const items = [
    {
      name: t.common.email,
      icon: Mail,
      href: profile.email ? `mailto:${profile.email}` : '',
      description: profile.email || t.contact.emailPending,
    },
    {
      name: t.common.github,
      icon: Github,
      href: profile.github,
      description: t.contact.githubDescription,
    },
    {
      name: t.common.linkedin,
      icon: Linkedin,
      href: profile.linkedin,
      description: profile.linkedin ? t.contact.linkedinDescription : t.contact.linkedinPending,
    },
  ];
  return (
    <Section id="contact" className="contact-section">
      <div className="contact-grid">
        <div>
          <div className="eyebrow section-label">
            <span>08</span>
            {t.nav.contact}
          </div>
          <h2>{t.contact.title}</h2>
          <p>{t.contact.body}</p>
          <span className="eyebrow contact-eyebrow">{t.contact.eyebrow}</span>
        </div>
        <div className="contact-links">
          {items.map(({ name, icon: Icon, href, description }) => {
            const content = (
              <>
                <Icon size={21} strokeWidth={1.5} aria-hidden="true" />
                <div>
                  <strong>{name}</strong>
                  <span>{description}</span>
                </div>
                {safeUrl(href) ? (
                  <ArrowUpRight size={20} className="contact-link-arrow" aria-hidden="true" />
                ) : (
                  <span className="pending-dash" aria-hidden="true">
                    —
                  </span>
                )}
              </>
            );
            return safeUrl(href) ? (
              <ExternalLink key={name} href={href} className="contact-link">
                {content}
              </ExternalLink>
            ) : (
              <div key={name} className="contact-link unavailable">
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
