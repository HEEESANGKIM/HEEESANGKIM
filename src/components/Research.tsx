import { ScanLine } from 'lucide-react';
import { research, researchInterests } from '../data/research';
import { useLanguage } from '../context/LanguageContext';
import { EmptyState, Section, SectionHeading } from './Primitives';
import { ResearchCard, ResearchRecord } from './ResearchCard';
export function Research() {
  const { t } = useLanguage();
  return (
    <Section id="research" className="section-tinted">
      <SectionHeading
        number="02"
        label={t.nav.research}
        title={t.research.title}
        subtitle={t.research.subtitle}
      />
      <div className="research-grid">
        {researchInterests.map((item, index) => (
          <ResearchCard key={item.id} item={item} index={index} />
        ))}
      </div>
      <div className="research-work">
        <h3 className="eyebrow small-heading">{t.research.entries}</h3>
        {research.length ? (
          research.map((item) => <ResearchRecord key={item.id} item={item} />)
        ) : (
          <EmptyState
            icon={ScanLine}
            title={t.research.empty}
            body={t.research.emptyBody}
            className="compact"
          />
        )}
      </div>
    </Section>
  );
}
