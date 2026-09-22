import type { ReactNode } from 'react';
import { m, useReducedMotion } from 'motion/react';
import { ArrowUpRight, type LucideIcon } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { safeUrl } from '../lib/storage';

export function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <m.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
    >
      {children}
    </m.div>
  );
}

export function SectionHeading({
  number,
  label,
  title,
  subtitle,
}: {
  number: string;
  label: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="section-heading">
      <div className="eyebrow section-label">
        <span>{number}</span>
        {label}
        <span className="heading-rule" />
      </div>
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}

export function Section({
  id,
  children,
  className = '',
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  const { t } = useLanguage();
  return (
    <section
      id={id}
      tabIndex={-1}
      className={`section ${className}`}
      aria-label={t.nav[id as keyof typeof t.nav] ?? id}
    >
      <div className="container">
        <Reveal>{children}</Reveal>
      </div>
    </section>
  );
}

export function ExternalLink({
  href,
  children,
  className = '',
  arrow = false,
  label,
}: {
  href?: string;
  children: ReactNode;
  className?: string;
  arrow?: boolean;
  label?: string;
}) {
  const { t } = useLanguage();
  const url = safeUrl(href);
  if (!url) return null;
  const external = !url.startsWith('mailto:');
  return (
    <a
      href={url}
      className={className}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      aria-label={label ? `${label}${external ? ` (${t.common.newTab})` : ''}` : undefined}
    >
      {children}
      {arrow && <ArrowUpRight size={16} aria-hidden="true" />}
      {external && !label && <span className="sr-only"> ({t.common.newTab})</span>}
    </a>
  );
}

export function Tags({ items }: { items: string[] }) {
  return items.length ? (
    <ul className="tags">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  ) : null;
}

export function EmptyState({
  icon: Icon,
  title,
  body,
  children,
  className = '',
}: {
  icon: LucideIcon;
  title: string;
  body: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`empty-state ${className}`}>
      <div className="empty-icon">
        <Icon size={26} strokeWidth={1.3} aria-hidden="true" />
      </div>
      <div>
        <h3>{title}</h3>
        <p>{body}</p>
        {children}
      </div>
    </div>
  );
}
