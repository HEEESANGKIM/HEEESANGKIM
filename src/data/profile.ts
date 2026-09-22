import type { Education, Localized } from './types';

export const profile = {
  name: 'HEESANG KIM',
  firstName: 'HEESANG',
  lastName: 'KIM',
  portrait: {
    src: 'heesang-kim.jpg',
    alt: { en: 'Portrait of Heesang Kim', ko: '김희상 프로필 사진' },
    width: 2298,
    height: 2955,
  },
  affiliation: {
    en: 'Stony Brook University at SUNY Korea',
    ko: '한국뉴욕주립대학교 스토니브룩',
  } satisfies Localized,
  academicStatus: {
    en: 'B.S. in Computer Science · Expected Feb 2027',
    ko: '컴퓨터공학 학사 과정 · 2027년 2월 졸업 예정',
  } satisfies Localized,
  subtitle: 'Computer Science | AI Systems | Autonomous Driving',
  github: 'https://github.com/HEEESANGKIM',
  email: 'kimheesang1228@gmail.com',
  linkedin: 'https://www.linkedin.com/in/heesang-kim-5379352b6/',
  intro: {
    en: 'Computer Science student exploring AI systems, autonomous systems, perception, and software-defined mobility.',
    ko: 'AI 시스템, 자율 시스템, Perception, 소프트웨어 중심 모빌리티를 탐구하는 Computer Science 학생입니다.',
  } satisfies Localized,
  bio: {
    en: 'I’m Heesang Kim, a Computer Science undergraduate at Stony Brook University at SUNY Korea. My studies also include a year at the university’s New York campus.',
    ko: '한국뉴욕주립대학교 스토니브룩에서 컴퓨터공학을 전공하는 김희상입니다. 미국 뉴욕 본교에서도 수학하며 전공 지식과 경험의 폭을 넓혔습니다.',
  } satisfies Localized,
  background: {
    en: 'Through coursework in computer vision, natural language processing, and operating systems, I’m building a foundation in intelligent software. Hackathons and team projects have given me hands-on experience connecting APIs and building full-stack, AI-powered web applications.',
    ko: 'Computer Vision, Natural Language Processing, 운영체제 등의 수업을 통해 지능형 소프트웨어의 기초를 쌓았습니다. 해커톤과 팀 프로젝트에서는 외부 API를 연동하고, AI를 활용한 풀스택 웹 애플리케이션을 구현했습니다.',
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

// CV education history; expected graduation updated by the owner to February 2027.
// New York attendance is part of the same undergraduate program, not a second degree.
export const education: Education[] = [
  {
    school: {
      en: 'Stony Brook University at SUNY Korea',
      ko: '한국뉴욕주립대학교 스토니브룩',
    },
    degree: { en: 'B.S. in Computer Science', ko: '컴퓨터공학 학사 과정 (B.S.)' },
    date: { en: 'Aug 2021 – Feb 2027 (expected)', ko: '2021.08 – 2027.02 (졸업 예정)' },
  },
  {
    school: { en: 'Stony Brook University, New York', ko: '스토니브룩대학교 뉴욕 본교' },
    degree: { en: 'Computer Science · New York campus studies', ko: '컴퓨터공학 · 미국 본교 수학' },
    date: { en: 'Aug 2023 – May 2024', ko: '2023.08 – 2024.05' },
  },
];
