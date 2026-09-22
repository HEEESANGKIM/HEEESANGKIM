import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import type { Project } from '../data/types';
import { useLanguage } from '../context/LanguageContext';
import { assetUrl } from '../lib/storage';
import { ExternalLink, Tags } from './Primitives';

export function ProjectDialog({ project, onClose }: { project: Project; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const { t, localized } = useLanguage();
  useEffect(() => {
    const element = dialog.current;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    element?.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      element?.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus({ preventScroll: true });
    };
  }, []);
  const fields = [
    ['problem', 'problem'],
    ['architecture', 'architecture'],
    ['contribution', 'contribution'],
    ['implementation', 'implementation'],
    ['result', 'results'],
    ['lessons', 'lessons'],
  ] as const;
  return (
    <dialog
      ref={dialog}
      className="project-dialog"
      aria-labelledby="project-dialog-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onKeyDown={(event) => {
        if (event.key !== 'Tab') return;
        const controls = event.currentTarget.querySelectorAll<HTMLElement>(
          'a[href], button:not(:disabled), [tabindex="0"]',
        );
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          const rect = event.currentTarget.getBoundingClientRect();
          if (
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom
          )
            onClose();
        }
      }}
    >
      <div className="dialog-inner">
        <div className="dialog-topline">
          <span className="eyebrow">{t.projects.detailLabel}</span>
          <button autoFocus onClick={onClose} className="icon-button" aria-label={t.common.close}>
            <X size={22} />
          </button>
        </div>
        <h2 id="project-dialog-title">{localized(project.title)}</h2>
        <p className="dialog-description">{localized(project.description)}</p>
        {project.image && (
          <img
            className="dialog-image"
            src={assetUrl(project.image.src)}
            alt={localized(project.image.alt)}
            width="1200"
            height="750"
          />
        )}
        <div className="dialog-fields">
          {fields.map(
            ([key, label]) =>
              project[key] && (
                <div key={key}>
                  <h3>{t.fields[label]}</h3>
                  <p>{localized(project[key])}</p>
                </div>
              ),
          )}
        </div>
        {project.technologies.length > 0 && (
          <div>
            <h3>{t.fields.technologies}</h3>
            <Tags items={project.technologies} />
          </div>
        )}
        <div className="action-links">
          <ExternalLink href={project.github} arrow>
            {t.common.github}
          </ExternalLink>
          <ExternalLink href={project.demo} arrow>
            {t.common.demo}
          </ExternalLink>
          <ExternalLink href={project.paper} arrow>
            {t.common.paper}
          </ExternalLink>
          <ExternalLink href={project.documentation} arrow>
            {t.common.documentation}
          </ExternalLink>
        </div>
      </div>
    </dialog>
  );
}
