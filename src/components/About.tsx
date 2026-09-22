import { GraduationCap, Network } from 'lucide-react';
import { education, profile } from '../data/profile';
import { useLanguage } from '../context/LanguageContext';
import { Section, SectionHeading, Tags } from './Primitives';
export function About() {
  const { t, localized } = useLanguage();
  return (
    <Section id="about">
      <SectionHeading
        number="01"
        label={t.nav.about}
        title={t.about.title}
        subtitle={t.about.subtitle}
      />
      <div className="about-grid">
        <div className="about-bio">
          <p className="lead">{localized(profile.bio)}</p>
          <p>{localized(profile.perspective)}</p>
          <div className="perspective-note">
            <Network size={21} />
            <div>
              <strong>{t.about.perspective}</strong>
              <span>{t.about.perspectiveNote}</span>
            </div>
          </div>
        </div>
        <div>
          <h3 className="eyebrow small-heading">{t.about.interests}</h3>
          <Tags items={profile.interests} />
          <div className="education">
            <h3 className="eyebrow small-heading">
              <GraduationCap size={16} />
              {t.about.education}
            </h3>
            {education.length ? (
              education.map((item) => (
                <div key={item.school.en} className="education-entry">
                  <h4>{localized(item.school)}</h4>
                  <p>{localized(item.degree)}</p>
                  {item.date && <span className="mono muted">{localized(item.date)}</span>}
                </div>
              ))
            ) : (
              <p className="muted">{t.about.educationEmpty}</p>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
