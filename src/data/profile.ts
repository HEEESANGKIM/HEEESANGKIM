import type { Education, Localized } from './types';

export const profile = {
  name: 'HEESANG KIM',
  firstName: 'HEESANG',
  lastName: 'KIM',
  subtitle: 'Computer Science | AI Systems | Autonomous Driving',
  github: 'https://github.com/HEEESANGKIM',
  // Add confirmed values. Empty contact fields are displayed as unavailable.
  email: '',
  linkedin: '',
  intro: {
    en: 'Computer Science student exploring AI systems, autonomous systems, perception, and software-defined mobility.',
    ko: 'AI 시스템, 자율 시스템, Perception, 소프트웨어 중심 모빌리티를 탐구하는 Computer Science 학생입니다.',
  } satisfies Localized,
  bio: {
    en: 'I’m a Computer Science student with an interest in how intelligent systems are built—from the models that understand the world to the software that brings them into it.',
    ko: '세상을 이해하는 모델부터 실제 환경에서 이를 구현하는 소프트웨어까지, 지능형 시스템이 만들어지는 과정에 관심을 가진 Computer Science 학생입니다.',
  } satisfies Localized,
  perspective: {
    en: 'My interests span AI, perception, and software-defined mobility. I’m keeping an open research perspective, connecting foundations in computer science with questions across autonomous and efficient AI systems.',
    ko: 'AI, Perception, 소프트웨어 중심 모빌리티 전반에 관심을 두고 있습니다. 특정 연구 주제에 한정하지 않고, 컴퓨터 과학의 기초를 자율 시스템과 효율적인 AI 시스템의 다양한 질문에 연결하고자 합니다.',
  } satisfies Localized,
  interests: [
    'Artificial Intelligence',
    'AI Systems',
    'Autonomous Driving',
    'Software-Defined Vehicles',
    'Computer Vision',
    'Perception',
    'Edge AI',
    'Machine Learning',
    'Intelligent Mobility',
  ],
};

export const education: Education[] = [];
