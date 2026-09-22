import { useLanguage } from '../context/LanguageContext';
export function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage();
  return (
    <div className="language-toggle">
      <button
        onClick={() => setLanguage('en')}
        aria-pressed={language === 'en'}
        aria-label={t.common.english}
      >
        EN
      </button>
      <span aria-hidden="true">/</span>
      <button
        onClick={() => setLanguage('ko')}
        aria-pressed={language === 'ko'}
        aria-label={t.common.korean}
      >
        KR
      </button>
    </div>
  );
}
