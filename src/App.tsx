import { LazyMotion, domAnimation, MotionConfig } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Research } from './components/Research';
import { Publications } from './components/Publications';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { Resume } from './components/Resume';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { useLanguage } from './context/LanguageContext';
export default function App() {
  const { t } = useLanguage();
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <a className="skip-link" href="#main">
          {t.common.skip}
        </a>
        <Navbar />
        <main id="main" tabIndex={-1}>
          <Hero />
          <About />
          <Research />
          <Publications />
          <Projects />
          <Experience />
          <Skills />
          <Resume />
          <Contact />
        </main>
        <Footer />
      </MotionConfig>
    </LazyMotion>
  );
}
