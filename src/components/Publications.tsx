import { BookOpen } from 'lucide-react';
import { publications } from '../data/publications';
import { useLanguage } from '../context/LanguageContext';
import { EmptyState, ExternalLink, Section, SectionHeading } from './Primitives';
export function Publications() {
  const { t, localized } = useLanguage();
  return (
    <Section id="publications">
      <SectionHeading
        number="03"
        label={t.nav.publications}
        title={t.publications.title}
        subtitle={t.publications.subtitle}
      />
      {publications.length ? (
        <div className="publication-list">
          {[...publications]
            .sort((a, b) => b.year - a.year)
            .map((item) => (
              <article className="publication" key={item.id}>
                <span className="mono publication-year">{item.year}</span>
                <div>
                  <span className="status-badge">{t.publications.kinds[item.kind]}</span>
                  <h3>{localized(item.title)}</h3>
                  <p>{item.authors.join(', ')}</p>
                  <p className="venue">{item.venue}</p>
                  {item.role && (
                    <p>
                      <strong>{t.fields.role}: </strong>
                      {localized(item.role)}
                    </p>
                  )}
                  {item.contribution && <p>{localized(item.contribution)}</p>}
                  <div className="action-links">
                    <ExternalLink href={item.pdf} arrow>
                      {t.common.pdf}
                    </ExternalLink>
                    <ExternalLink href={item.presentation} arrow>
                      {t.common.presentation}
                    </ExternalLink>
                    <ExternalLink href={item.code} arrow>
                      {t.common.code}
                    </ExternalLink>
                    <ExternalLink href={item.projectPage} arrow>
                      {t.common.projectPage}
                    </ExternalLink>
                  </div>
                </div>
              </article>
            ))}
        </div>
      ) : (
        <EmptyState icon={BookOpen} title={t.publications.empty} body={t.publications.emptyBody} />
      )}
    </Section>
  );
}
