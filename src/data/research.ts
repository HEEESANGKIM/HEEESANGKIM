import type { ResearchEntry, ResearchInterest } from './types';

// These describe interests, not completed work or claims of expertise.
export const researchInterests: ResearchInterest[] = [
  {
    id: 'autonomous-systems',
    title: { en: 'Autonomous & SDV Systems', ko: '자율 시스템 & SDV' },
    description: {
      en: 'The intersection of software, intelligence, and mobility—from autonomous systems to software-defined vehicles.',
      ko: '자율 시스템부터 Software-Defined Vehicle까지 소프트웨어, 지능, 모빌리티의 접점에 관심이 있습니다.',
    },
    tags: ['Autonomous Driving', 'SDV'],
    graphic: 'mobility',
  },
  {
    id: 'perception',
    title: { en: 'Perception & Vision', ko: 'Perception & Vision' },
    description: {
      en: 'How machines interpret visual information and build an understanding of the world around them.',
      ko: '기계가 시각 정보를 해석하고 주변 환경을 이해하는 방식을 탐구하고자 합니다.',
    },
    tags: ['Computer Vision', 'Perception'],
    graphic: 'perception',
  },
  {
    id: 'intelligent-systems',
    title: { en: 'AI & Efficient Systems', ko: 'AI & 효율적인 시스템' },
    description: {
      en: 'How intelligent models become practical systems, with an interest in efficient inference and edge computing.',
      ko: '지능형 모델을 실제 시스템으로 연결하는 과정과 효율적인 추론, Edge Computing에 관심이 있습니다.',
    },
    tags: ['AI Systems', 'Edge AI', 'On-device AI'],
    graphic: 'systems',
  },
];

// Add only real research. Optional fields and missing links are hidden.
export const research: ResearchEntry[] = [];
