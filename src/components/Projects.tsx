import { lazy, Suspense, useState } from 'react';
import { ArrowRight, FolderCode } from 'lucide-react';
import { projects } from '../data/projects';
import type { Project, ProjectCategory } from '../data/types';
import { useLanguage } from '../context/LanguageContext';
import { EmptyState, Section, SectionHeading } from './Primitives';
import { ProjectCard } from './ProjectCard';
const ProjectDialog = lazy(() =>
  import('./ProjectDialog').then((module) => ({ default: module.ProjectDialog })),
);

export function Projects({ items = projects }: { items?: Project[] }) {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<ProjectCategory | 'all'>('all');
  const [selected, setSelected] = useState<Project | null>(null);
  const filtered = filter === 'all' ? items : items.filter((item) => item.category === filter);
  return (
    <Section id="projects" className="section-tinted">
      <SectionHeading
        number="04"
        label={t.nav.projects}
        title={t.projects.title}
        subtitle={t.projects.subtitle}
      />
      <div className="filter-row">
        <div className="project-filters" role="group" aria-label={t.nav.projects}>
          {(Object.keys(t.projects.filters) as (ProjectCategory | 'all')[]).map((key) => (
            <button key={key} aria-pressed={filter === key} onClick={() => setFilter(key)}>
              {t.projects.filters[key]}
              {key === 'all' && (
                <span className="filter-count">{items.length.toString().padStart(2, '0')}</span>
              )}
            </button>
          ))}
        </div>
        <span className="mono project-count" role="status">
          {filtered.length.toString().padStart(2, '0')} {t.projects.count}
        </span>
      </div>
      {filtered.length ? (
        <div className="project-grid">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} onOpen={setSelected} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={FolderCode}
          title={filter === 'all' ? t.projects.empty : t.projects.filteredEmpty}
          body={filter === 'all' ? t.projects.emptyBody : t.projects.filteredBody}
          className="projects-empty"
        >
          {filter !== 'all' && (
            <button className="text-button" onClick={() => setFilter('all')}>
              {t.projects.reset}
              <ArrowRight size={15} />
            </button>
          )}
        </EmptyState>
      )}
      {selected && (
        <Suspense fallback={null}>
          <ProjectDialog project={selected} onClose={() => setSelected(null)} />
        </Suspense>
      )}
    </Section>
  );
}
