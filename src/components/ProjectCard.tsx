import { ArrowUpRight, Code2 } from 'lucide-react';
import type { Project } from '../data/types';
import { useLanguage } from '../context/LanguageContext';
import { assetUrl } from '../lib/storage';
import { ExternalLink, Tags } from './Primitives';
export function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: (project: Project) => void;
}) {
  const { t, localized } = useLanguage();
  return (
    <article className="project-card">
      <div className="project-image">
        {project.image ? (
          <img
            src={assetUrl(project.image.src)}
            alt={localized(project.image.alt)}
            loading="lazy"
            width="1200"
            height="750"
          />
        ) : (
          <Code2 size={50} strokeWidth={1} aria-hidden="true" />
        )}
      </div>
      <div className="project-card-copy">
        <span className="eyebrow">{t.projects.filters[project.category]}</span>
        <h3>{localized(project.title)}</h3>
        <p>{localized(project.description)}</p>
        {project.problem && (
          <p>
            <strong>{t.fields.problem}: </strong>
            {localized(project.problem)}
          </p>
        )}
        {project.contribution && (
          <p>
            <strong>{t.fields.contribution}: </strong>
            {localized(project.contribution)}
          </p>
        )}
        {project.result && (
          <p>
            <strong>{t.fields.results}: </strong>
            {localized(project.result)}
          </p>
        )}
        <Tags items={project.technologies} />
        <div className="project-card-actions">
          <button className="text-button" onClick={() => onOpen(project)}>
            {t.common.details}
            <ArrowUpRight size={16} />
          </button>
          <ExternalLink href={project.github}>{t.common.github}</ExternalLink>
          <ExternalLink href={project.demo}>{t.common.demo}</ExternalLink>
        </div>
      </div>
    </article>
  );
}
