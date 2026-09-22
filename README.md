# HEESANG KIM — Research & Engineering

Computer Science · AI Systems · Autonomous Driving

React, TypeScript, Vite, Tailwind CSS, Motion for React, Lucide로 만든 정적 포트폴리오입니다. 영문/한글과 라이트/다크 테마를 지원합니다. 학교·경력·논문·프로젝트·기술 숙련도를 임의로 생성하지 않았습니다. 실제 내용이 없는 섹션은 정직한 빈 상태를 보여줍니다.

## 로컬 실행

Node.js 24 LTS와 npm을 사용합니다.

```sh
npm install
npm run dev
```

개발 주소: http://127.0.0.1:5173

```sh
npm run build       # TypeScript 검사 + dist/ 생성
npm run preview     # 프로덕션 미리보기: http://127.0.0.1:4173
npm run typecheck   # TypeScript 검사
npm run format     # 코드 포맷 정리
```

잠금 파일이 있으므로 CI나 재현 가능한 설치에는 `npm ci`를 사용하세요. `dist/`는 빌드 결과이며 Git에 포함하지 않습니다.

## 구조

```text
.github/workflows/deploy.yml   # 빌드·브라우저 검사·GitHub Pages 배포
public/
  favicon.svg                 # HK 파비콘
  .nojekyll
  resume.pdf                  # 실제 이력서를 직접 추가 (현재 없음)
src/
  components/                 # Navbar, Hero, About, Research, Publications,
                              # Projects, ProjectCard, ProjectDialog,
                              # Experience, Skills, Resume, Contact, Footer
                              # Primitives, SystemVisual, Theme/LanguageToggle
  context/                    # ThemeContext, LanguageContext
  data/                       # types, profile, research, publications,
                              # projects, experience, skills
  i18n/                       # en.ts, ko.ts
  lib/storage.ts              # 설정 저장, 미디어 경로, 링크 검증
  styles.css                  # Tailwind, 테마 토큰, 레이아웃, 반응형 스타일
  App.tsx
  main.tsx
docs/content-guide.md         # 데이터 입력 예시와 편집 지침
tests/                        # Playwright + axe, 개발 전용 샘플 데이터
index.html                    # 기본 SEO, 테마 초기화, 파비콘
vite.config.ts               # 자산 경로 및 이력서 존재 여부 감지
```

## 개인정보와 콘텐츠 편집

| 내용                                                  | 파일                       |
| ----------------------------------------------------- | -------------------------- |
| 이름, 소개, GitHub, 이메일, LinkedIn, 학력, 관심 태그 | `src/data/profile.ts`      |
| 연구 관심 분야와 실제 연구 기록                       | `src/data/research.ts`     |
| 논문·포스터·투고 정보                                 | `src/data/publications.ts` |
| 프로젝트와 상세 내용                                  | `src/data/projects.ts`     |
| 경력·학술/개발 경험                                   | `src/data/experience.ts`   |
| 직접 사용한 기술                                      | `src/data/skills.ts`       |
| 공통 타입과 선택 항목                                 | `src/data/types.ts`        |

연락처에서 빈 이메일과 LinkedIn은 비활성 텍스트로 표시합니다. 이메일이 등록되면 `mailto:` 링크가 됩니다. 연구나 프로젝트에서 값이 없는 선택 항목과 링크는 숨깁니다. `[GitHub URL]`과 같은 미완성 문자열 및 `javascript:` 링크는 활성화하지 않습니다.

`education`, `research`, `publications`, `projects`, `experience`는 빈 배열로 시작합니다. 기술도 확인된 항목을 입력하기 전까지 비어 있습니다. 사용자가 제공한 넓은 **관심 분야**만 기본 콘텐츠에 포함되어 있습니다. 특정 연구 문제나 성과를 주장하지 않습니다.

[콘텐츠 입력 예시](docs/content-guide.md)를 참고하세요.

## 영어/한국어

- UI 문구: `src/i18n/en.ts`, `src/i18n/ko.ts`
- 개인정보와 연구/프로젝트 내용: 각 데이터 파일의 `{ en: '...', ko: '...' }`
- 동작: `src/context/LanguageContext.tsx`
- 기본 언어는 영어입니다. 선택은 `localStorage`의 `hk-language`에 저장합니다.
- 언어를 바꾸면 `html.lang`, 문서 제목, 설명 및 Open Graph locale도 변경합니다.
- 공유 크롤러용 최초 HTML 메타데이터는 영어입니다. 한국어별 공유 미리보기가 필요하면 별도 정적 언어 URL 생성이 필요합니다.

## 라이트/다크 테마

- 색상 토큰: `src/styles.css`의 `:root`와 `:root.dark`
- 상태와 시스템 테마 변경 감지: `src/context/ThemeContext.tsx`
- 최초 페인트 전 초기화: `index.html`의 작은 인라인 스크립트
- 선택 저장: `localStorage`의 `hk-theme`
- 선택 전에는 `prefers-color-scheme`을 따르고, 명시적으로 선택한 후에는 사용자 선택을 유지합니다.
- 시스템/브라우저에서 저장소를 사용할 수 없어도 토글은 동작합니다.
- 배경 기본색을 바꾸면 `index.html`, `ThemeContext.tsx`의 `theme-color` 값도 함께 바꾸세요.
- `prefers-reduced-motion`에서는 등장 이동, 호버 이동 및 부드러운 스크롤을 끕니다.

## 이미지와 이력서

- 히어로와 연구 관심사 그래픽은 `SystemVisual.tsx`의 가벼운 SVG입니다. 외부 이미지 요청이 없습니다.
- 프로젝트 이미지 권장 크기: **1200 × 750px** (8:5), WebP/AVIF, 가능하면 200KB 이하.
- 구조도 권장: SVG 또는 가로 1200–1600px PNG/WebP. 설명 대체 텍스트를 두 언어로 작성하세요.
- 예: 파일 `public/images/project.webp` → 데이터의 `image.src: 'images/project.webp'`.
- 이력서는 **`public/resume.pdf`**에 추가하고 개발 서버를 다시 시작하거나 재빌드하세요. 파일이 없으면 다운로드 버튼이 비활성화됩니다. 가짜 PDF는 포함되어 있지 않습니다.
- 공유 이미지가 필요하면 `public/og-image.png`에 1200 × 630px 이미지를 추가하고, `index.html`에 최종 배포 주소를 사용하는 `og:image`를 설정하세요.

## GitHub Pages 배포

1. GitHub 저장소의 **Settings → Pages → Build and deployment → Source**를 **GitHub Actions**로 선택합니다.
2. 소스를 `main` 브랜치에 커밋하고 푸시합니다.
3. **Actions → Verify and deploy portfolio**가 성공하면 환경의 배포 URL에서 확인합니다.

워크플로는 의존성 설치 → TypeScript/프로덕션 빌드 → Chromium 기능·접근성 검사 → `dist/` 업로드 → Pages 배포 순서로 진행합니다. PR에서는 검증만 실행합니다. 저장소에서 Pages 권한과 GitHub Actions가 허용되어 있어야 합니다. 이 작업은 로컬 구현이며, 실제 GitHub 배포는 푸시와 저장소 설정 후 이루어집니다.

### 현재 일반 저장소

`HEEESANGKIM/HEEESANGKIM` → `https://heeesangkim.github.io/HEEESANGKIM/`

### 계정 홈페이지 저장소

`HEEESANGKIM/heeesangkim.github.io` → `https://heeesangkim.github.io/`

두 경우 모두 기본 `base: './'`가 동작합니다. 해시 섹션 탐색을 사용하는 단일 HTML 사이트이므로 라우터 fallback이나 별도 404 설정이 필요 없습니다. 테스트가 실제 `dist/`를 두 경로에서 각각 제공해 JS, CSS, 폰트, 파비콘 경로를 확인합니다. 외부 호스팅에서 고정 base가 필요하면 환경변수 `VITE_BASE_PATH=/repository/`를 지정할 수 있습니다.

설정 기준: [Vite 정적 배포 문서](https://vite.dev/guide/static-deploy), [Tailwind Vite 통합](https://tailwindcss.com/docs/installation/using-vite), [Motion reduced motion](https://motion.dev/docs/react-use-reduced-motion).

## 검증

```sh
npm run build
npm test
```

로컬 테스트는 설치된 Google Chrome을 사용합니다. Chrome이 없다면 `npx playwright install chromium` 실행 후 `playwright.config.ts`의 `channel`을 `undefined`로 설정하세요. CI는 Chromium을 설치하고 사용합니다.

검사 항목:

- 계정/저장소 경로의 프로덕션 자산 로딩
- 두 언어와 두 테마, 저장/복원, 시스템 테마 반영, 저장소 접근 실패 처리
- 320/390/768/1440px 너비에서 가로 넘침
- 모바일 메뉴, Escape, 스크롤에 따른 활성 메뉴, 키보드 본문 바로가기
- 빈 필터 상태 및 **테스트 전용 데이터**로 채워진 카드/모달, 포커스 복원, 누락 항목 숨김
- axe WCAG 2 A/AA 및 2.1 AA 자동 검사, reduced motion
- `test-results/`에 데스크톱/모바일 시각 검토용 스크린샷

테스트 데이터는 `tests/fixture.tsx`에만 있고 프로덕션 빌드에는 포함되지 않습니다. 자동 검사는 수동 스크린리더 검토 전체를 대체하지 않습니다. 실제 배포 환경의 Lighthouse 점수는 배포 후 측정하세요.

## 확장과 경량화

실제 프로젝트·논문 추가, 연구 구조도, 정확한 학력·경력, 이력서, 프로필 사진을 순서대로 보완할 수 있습니다. 향후 필요하면 언어별 정적 HTML, 프로젝트별 공유 URL, custom domain을 추가하세요.

초기 버전에는 백엔드 문의 폼, 분석/추적 스크립트, CMS, Three.js, WebGL, 비디오, 대형 이미지, 무한 파티클 효과를 포함하지 않았습니다. 서체는 로컬 번들로 제공하고, 모달은 필요할 때 로드하며, 이미지는 지연 로딩합니다. 별도 서버나 API 키가 필요하지 않습니다.
