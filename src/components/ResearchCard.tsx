import { ArrowDownRight } from 'lucide-react';
import type { ResearchInterest, ResearchEntry } from '../data/types';
import { useLanguage } from '../context/LanguageContext';
import { assetUrl } from '../lib/storage';
import { ExternalLink, Tags } from './Primitives';
import { ResearchGraphic } from './SystemVisual';

export function ResearchCard({ item, index }: { item: ResearchInterest; index: number }) {
  const { t, localized } = useLanguage();
  return (
    <article className="research-card">
      <div className="card-topline">
        <span className="mono">0{index + 1}</span>
        <ArrowDownRight size={17} />
      </div>
      <ResearchGraphic kind={item.graphic} />
      <div className="research-card-copy">
        <span className="eyebrow">{t.research.label}</span>
        <h3>{localized(item.title)}</h3>
        <p>{localized(item.description)}</p>
        <Tags items={item.tags} />
      </div>
    </article>
  );
}

export function ResearchRecord({ item }: { item: ResearchEntry }) {
  const { t, localized } = useLanguage();
  const fields = [
    'problem',
    'motivation',
    'approach',
    'role',
    'dataset',
    'architecture',
    'experiments',
    'results',
  ] as const;
  return (
    <article className="research-record">
      <div className="flex flex-wrap items-center gap-3">
        <span className="status-badge">{t.research.status[item.status]}</span>
        <span className="muted">{localized(item.area)}</span>
      </div>
      <h3>{localized(item.title)}</h3>
      <p>{localized(item.overview)}</p>
      <div className="record-fields">
        {fields.map(
          (key) =>
            item[key] && (
              <div key={key}>
                <h4>{t.fields[key]}</h4>
                <p>{localized(item[key])}</p>
              </div>
            ),
        )}
      </div>
      {item.architectureImage && (
        <img
          className="architecture-image"
          src={assetUrl(item.architectureImage.src)}
          alt={localized(item.architectureImage.alt)}
          loading="lazy"
        />
      )}
      {item.methods?.length ? (
        <div>
          <h4>{t.fields.methods}</h4>
          <Tags items={item.methods} />
        </div>
      ) : null}
      {item.tools?.length ? (
        <div>
          <h4>{t.fields.tools}</h4>
          <Tags items={item.tools} />
        </div>
      ) : null}
      <div className="action-links">
        <ExternalLink href={item.paper} arrow>
          {t.common.paper}
        </ExternalLink>
        <ExternalLink href={item.code} arrow>
          {t.common.code}
        </ExternalLink>
        <ExternalLink href={item.slides} arrow>
          {t.common.slides}
        </ExternalLink>
      </div>
    </article>
  );
}
