import { Milestone } from 'lucide-react';
import { experience } from '../data/experience';
import { useLanguage } from '../context/LanguageContext';
import { EmptyState, Section, SectionHeading, Tags } from './Primitives';
export function Experience() {
  const { t, localized } = useLanguage();
  return (
    <Section id="experience">
      <SectionHeading
        number="05"
        label={t.nav.experience}
        title={t.experience.title}
        subtitle={t.experience.subtitle}
      />
      {experience.length ? (
        <ol className="timeline">
          {experience.map((item) => (
            <li key={item.id}>
              <div className="timeline-date mono">{localized(item.date)}</div>
              <article>
                <span className="eyebrow">{t.experience.categories[item.category]}</span>
                <h3>{localized(item.role)}</h3>
                <h4>{localized(item.organization)}</h4>
                {item.description && <p>{localized(item.description)}</p>}
                {item.contributions?.length ? (
                  <ul className="contributions">
                    {item.contributions.map((value) => (
                      <li key={value.en}>{localized(value)}</li>
                    ))}
                  </ul>
                ) : null}
                {item.technologies && <Tags items={item.technologies} />}
              </article>
            </li>
          ))}
        </ol>
      ) : (
        <div className="timeline-empty">
          <span className="timeline-marker" />
          <EmptyState icon={Milestone} title={t.experience.empty} body={t.experience.emptyBody} />
        </div>
      )}
    </Section>
  );
}
