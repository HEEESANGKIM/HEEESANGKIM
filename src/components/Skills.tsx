import { Braces, BrainCircuit, CircuitBoard, Terminal } from 'lucide-react';
import { skillGroups } from '../data/skills';
import { useLanguage } from '../context/LanguageContext';
import { Section, SectionHeading, Tags } from './Primitives';
const icons = {
  programming: Braces,
  ml: BrainCircuit,
  autonomous: CircuitBoard,
  systems: Terminal,
};
export function Skills() {
  const { t } = useLanguage();
  return (
    <Section id="skills" className="skills-section">
      <SectionHeading
        number="06"
        label={t.nav.skills}
        title={t.skills.title}
        subtitle={t.skills.subtitle}
      />
      <div className="skills-grid">
        {skillGroups.map((group) => {
          const Icon = icons[group.id];
          return (
            <article className="skill-card" key={group.id}>
              <Icon size={23} strokeWidth={1.4} aria-hidden="true" />
              <h3>{t.skills.groups[group.id]}</h3>
              {group.skills.length ? <Tags items={group.skills} /> : <p>{t.skills.pending}</p>}
            </article>
          );
        })}
      </div>
      {skillGroups.every((group) => !group.skills.length) && (
        <p className="skill-note">{t.skills.note}</p>
      )}
    </Section>
  );
}
