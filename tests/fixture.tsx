// Synthetic data is test-only. Vite's production entry never imports this file.
import { createRoot } from 'react-dom/client';
import { LazyMotion, domAnimation } from 'motion/react';
import { Projects } from '../src/components/Projects';
import { ResearchRecord } from '../src/components/ResearchCard';
import { LanguageProvider } from '../src/context/LanguageContext';
import { ThemeProvider } from '../src/context/ThemeContext';
import { LanguageToggle } from '../src/components/LanguageToggle';
import '../src/styles.css';
import type { Localized, Project } from '../src/data/types';
const text = (en: string): Localized => ({ en, ko: `테스트 ${en}` });
const projects: Project[] = [
  {
    id: 'fixture-ai',
    title: text('AI test fixture'),
    category: 'ai',
    description: text('Synthetic data for interface verification.'),
    technologies: ['Test tool'],
    problem: text('A sample problem'),
    contribution: text('A sample contribution'),
    result: text('A sample result'),
    github: 'https://github.com/HEEESANGKIM',
    documentation: 'https://example.com/docs',
  },
  {
    id: 'fixture-software',
    title: text('Software test fixture'),
    category: 'software',
    description: text('Optional fields deliberately absent.'),
    technologies: [],
    github: '[GitHub URL]',
    demo: 'javascript:alert(1)',
  },
];
const empty = new URLSearchParams(location.search).has('empty');
createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <LanguageProvider>
      <LazyMotion features={domAnimation}>
        <LanguageToggle />
        <main>
          <h1>Component verification</h1>
          <Projects items={empty ? [] : projects} />
          <ResearchRecord
            item={{
              id: 'test',
              title: text('Research test fixture'),
              area: text('Test area'),
              status: 'exploring',
              overview: text('Synthetic research fixture.'),
              methods: ['Test method'],
              tools: ['Test tool'],
              results: text('Sample result'),
              paper: 'https://example.com/paper',
              code: '[URL]',
            }}
          />
        </main>
      </LazyMotion>
    </LanguageProvider>
  </ThemeProvider>,
);
