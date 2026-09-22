# 콘텐츠 편집

포트폴리오의 실제 정보는 `src/data/`에서 관리합니다. `src/i18n/`은 공통 UI 번역입니다. 아래 값은 형식 설명용 placeholder이며 실제 이력으로 화면에 등록되어 있지 않습니다. **확인된 본인의 내용으로 바꾼 뒤** 배열에 넣으세요.

## 프로필

`src/data/profile.ts`에서 이메일, LinkedIn, 소개 등을 수정하고 `education`에 실제 학교·학위·기간을 입력합니다. 한글 이름을 제공받지 않았으므로 영문 이름을 두 언어에 공통으로 사용합니다.

```ts
export const education: Education[] = [
  {
    school: { en: '[University]', ko: '[학교]' },
    degree: { en: '[Degree / Major]', ko: '[학위 / 전공]' },
    date: { en: '[Dates]', ko: '[기간]' },
  },
];
```

## 프로젝트

```ts
export const projects: Project[] = [
  {
    id: 'unique-project-id',
    title: { en: '[Project title]', ko: '[프로젝트 제목]' },
    category: 'software', // ai | autonomous | research | software
    description: { en: '[Overview]', ko: '[개요]' },
    problem: { en: '[Problem]', ko: '[문제]' },
    contribution: { en: '[Your contribution]', ko: '[본인의 기여]' },
    technologies: [], // 실제 사용 기술만
    // 선택: architecture, implementation, result, lessons (모두 en/ko)
    // image: { src: 'images/project.webp', alt: { en: '...', ko: '...' } },
    // github: 'https://github.com/...',
    // demo, paper, documentation도 실제 링크가 있을 때만 추가
  },
];
```

결과가 없으면 `result`를 생략합니다. `image`를 생략하면 코드 아이콘이 표시됩니다. 상세 모달은 존재하는 항목만 보여주며, 빈 선택 항목을 채우기 위해 내용을 생성할 필요가 없습니다. 카드는 필터에 자동 반영됩니다.

## 연구

`researchInterests`는 관심 분야, `research`는 **실제 연구 기록**입니다. 둘을 구분하세요.

```ts
export const research: ResearchEntry[] = [
  {
    id: 'unique-research-id',
    title: { en: '[Research title]', ko: '[연구 제목]' },
    status: 'exploring', // exploring | ongoing | completed | published
    area: { en: '[Area]', ko: '[분야]' },
    overview: { en: '[Overview]', ko: '[개요]' },
    // 선택: problem, motivation, approach, role, dataset,
    // architecture, experiments, results (en/ko 객체)
    // methods: [], tools: [], paper: URL, code: URL, slides: URL
    // architectureImage: { src: 'images/architecture.svg', alt: { en: '...', ko: '...' } }
  },
];
```

## 논문

`Publication`은 `id`, `title`(en/ko), `authors`(문자열 배열), `venue`, `year`, `kind`를 사용합니다. `kind`는 `conference`, `workshop`, `poster`, `review` 중 실제 상태를 입력합니다. 선택 항목은 `role`, `contribution`(en/ko), `pdf`, `presentation`, `code`, `projectPage`(URL)입니다. 연도 내림차순으로 표시합니다.

## 경험 및 기술

`ExperienceEntry` 필수: `id`, `organization`, `role`, `date`(en/ko), `category`(`research`, `academic`, `development`). 선택: `description`(en/ko), `contributions`(en/ko 배열), `technologies`(문자열 배열). 배열 순서대로 타임라인에 표시하므로 최신 항목부터 입력하세요.

`src/data/skills.ts`의 각 그룹 `skills`에 직접 사용한 기술을 문자열로 추가하세요. 백분율 숙련도나 과장된 역량 표시는 없습니다.

## 게시 전 확인

1. 영어/한국어 내용을 확인합니다. 기술 이름은 필요한 경우 영어를 유지합니다.
2. 실제 이미지 경로와 대체 텍스트, 링크, 본인의 역할을 확인합니다.
3. `npm run build`와 `npm test`를 실행합니다.
4. 실제 `public/resume.pdf`가 있다면 다운로드와 내용을 확인합니다.
5. `npm run preview`에서 두 테마와 모바일 화면을 확인한 뒤 배포합니다.
