import { Download, FileText } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { assetUrl } from '../lib/storage';
import { Section } from './Primitives';
export function Resume() {
  const { t } = useLanguage();
  return (
    <Section id="resume" className="resume-section">
      <div className="resume-panel">
        <div className="resume-document" aria-hidden="true">
          <FileText size={44} strokeWidth={1.2} />
          <span>CV</span>
        </div>
        <div className="resume-copy">
          <div className="eyebrow section-label">
            <span>07</span>
            {t.nav.resume}
          </div>
          <h2>{t.resume.title}</h2>
          <p>{t.resume.body}</p>
        </div>
        <div className="resume-action">
          {__HAS_RESUME__ ? (
            <>
              <a className="button button-primary" href={assetUrl('resume.pdf')} download>
                {t.resume.download}
                <Download size={16} />
              </a>
              <span className="eyebrow">{t.resume.format}</span>
            </>
          ) : (
            <>
              <button className="button button-secondary" disabled>
                <Download size={16} />
                {t.resume.unavailable}
              </button>
              <span>{t.resume.note}</span>
            </>
          )}
        </div>
      </div>
    </Section>
  );
}
