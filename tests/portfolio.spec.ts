import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { existsSync } from 'node:fs';

test('production boots at account and repository paths without broken assets', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('response', (response) => {
    if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`);
  });
  for (const path of ['/', '/HEEESANGKIM/']) {
    await page.goto(path);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('HEESANGKIM.');
    await expect(page.locator('main > section')).toHaveCount(9);
    if (existsSync('public/resume.pdf')) {
      const resume = page.locator('#resume a[download]');
      await expect(resume).toBeVisible();
      const href = await resume.evaluate((element: HTMLAnchorElement) => element.href);
      const response = await page.request.get(href);
      expect(response.status()).toBe(200);
      expect((await response.body()).subarray(0, 5).toString()).toBe('%PDF-');
    } else {
      await expect(page.getByRole('button', { name: 'Resume coming soon' })).toBeDisabled();
    }
    expect(await page.locator('a[href="#"]').count()).toBe(0);
    await expect(page.locator('footer a[href="https://github.com/HEEESANGKIM"]')).toBeVisible();
  }
  expect(errors).toEqual([]);
});

test('theme, language, metadata and preferences persist', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('html')).toHaveClass('dark');
  await page.getByRole('button', { name: 'Switch language to Korean' }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'ko');
  await expect(
    page.getByRole('heading', { name: '호기심에서 시작하는 시스템적 사고.' }),
  ).toBeVisible();
  await page.reload();
  await expect(page.locator('html')).toHaveClass('dark');
  await expect(page.locator('html')).toHaveAttribute('lang', 'ko');
  await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute('content', 'ko_KR');
  await page.getByRole('button', { name: '라이트 모드로 전환' }).click();
  await page.getByRole('button', { name: '영어로 전환' }).click();
  await expect(page.locator('html')).not.toHaveClass('dark');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await page.reload();
  await expect(page.locator('html')).not.toHaveClass('dark');
});

test('dark mode is the default until the user chooses light', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/');
  await expect(page.locator('html')).toHaveClass('dark');
  await page.getByRole('button', { name: 'Switch to light mode' }).click();
  await expect(page.locator('html')).not.toHaveClass('dark');
  await page.emulateMedia({ colorScheme: 'dark' });
  await expect(page.locator('html')).not.toHaveClass('dark');
  await page.reload();
  await expect(page.locator('html')).not.toHaveClass('dark');
});

test('unavailable localStorage does not break the page or controls', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', {
      get() {
        throw new Error('Storage unavailable');
      },
    });
  });
  await page.goto('/');
  await expect(page.locator('html')).toHaveClass('dark');
  await page.getByRole('button', { name: 'Switch to light mode' }).click();
  await page.getByRole('button', { name: 'Switch language to Korean' }).click();
  await expect(page.locator('html')).not.toHaveClass('dark');
  await expect(page.locator('html')).toHaveAttribute('lang', 'ko');
});

test('mobile menu closes on selection and Escape; active section tracks scrolling', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const menu = page.getByRole('button', { name: 'Open navigation' });
  await menu.click();
  await expect(page.locator('#main-navigation')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(menu).toBeFocused();
  await expect(page.locator('#main-navigation')).toBeHidden();
  await menu.click();
  await page
    .locator('#main-navigation')
    .getByRole('link', { name: 'Research', exact: true })
    .click();
  await expect(page.locator('#main-navigation')).toBeHidden();
  await expect(page.locator('#research')).toBeFocused();
  await expect(page.locator('#main-navigation a[href="#research"]')).toHaveAttribute(
    'aria-current',
    'location',
  );
  await page.locator('#contact').scrollIntoViewIfNeeded();
  await expect(page.locator('#main-navigation a[href="#contact"]')).toHaveAttribute(
    'aria-current',
    'location',
  );
});

test('empty project filters provide an honest state and reset', async ({ page }) => {
  await page.goto('http://127.0.0.1:5173/tests/fixture.html?empty=1#projects');
  await page.getByRole('button', { name: 'AI', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'No projects in this area yet.' })).toBeVisible();
  await page.getByRole('button', { name: 'View all work' }).click();
  await expect(
    page.getByRole('heading', { name: 'The project collection starts here.' }),
  ).toBeVisible();
  await expect(page.locator('.project-count')).toHaveText('00 projects');
});

test('both languages and themes fit mobile, tablet and desktop', async ({ page }) => {
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    for (const language of ['en', 'ko']) {
      await page
        .getByRole('button', {
          name:
            language === 'en'
              ? /Switch language to English|영어로 전환/
              : /Switch language to Korean|한국어로 전환/,
        })
        .click();
      for (const theme of ['light', 'dark']) {
        await page.evaluate(
          (value) => document.documentElement.classList.toggle('dark', value === 'dark'),
          theme,
        );
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        );
        expect(overflow, `${width}px ${language} ${theme}`).toBe(false);
      }
    }
  }
});

test('reduced motion and keyboard skip link are honored', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
  expect(
    await page.locator('html').evaluate((element) => getComputedStyle(element).scrollBehavior),
  ).toBe('auto');
  expect(
    await page
      .locator('.research-card')
      .first()
      .evaluate((element) => getComputedStyle(element).transitionDuration),
  ).toBe('0s');
});

test('desktop sections occupy one screen at laptop and full-screen sizes', async ({ page }) => {
  for (const size of [
    { width: 1366, height: 768 },
    { width: 1920, height: 1080 },
  ]) {
    await page.setViewportSize(size);
    await page.goto('/');
    for (const language of ['en', 'ko']) {
      await page
        .getByRole('button', {
          name:
            language === 'en'
              ? /Switch language to English|영어로 전환/
              : /Switch language to Korean|한국어로 전환/,
        })
        .click();
      await page.evaluate(() => document.fonts.ready);
      const measurements = await page.locator('main > section').evaluateAll((sections) => {
        const navHeight = document.querySelector('header')!.getBoundingClientRect().height;
        return sections.map((section) => {
          const rect = section.getBoundingClientRect();
          return {
            id: section.id,
            height: rect.height,
            expected: innerHeight - (section.id === 'top' ? 0 : navHeight),
          };
        });
      });
      for (const section of measurements) {
        expect(
          Math.abs(section.height - section.expected),
          `${size.width}×${size.height} ${language} #${section.id}`,
        ).toBeLessThanOrEqual(2);
      }
      await page.locator('#main-navigation a[href="#about"]').click();
      const aboutBounds = await page.locator('#about').boundingBox();
      expect(aboutBounds!.y).toBeCloseTo(79, 0);
      expect(aboutBounds!.y + aboutBounds!.height).toBeLessThanOrEqual(size.height + 2);
    }
  }
});

test('About shows the supplied portrait and CV education with the corrected graduation date', async ({
  page,
}) => {
  for (const path of ['/', '/HEEESANGKIM/']) {
    await page.goto(`${path}#about`);
    const about = page.locator('#about');
    const portrait = about.getByRole('img', { name: 'Portrait of Heesang Kim' });
    await expect(portrait).toBeVisible();
    await expect
      .poll(() =>
        portrait.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0),
      )
      .toBe(true);
    await expect(
      about.getByRole('heading', { name: 'Stony Brook University at SUNY Korea', exact: true }),
    ).toBeVisible();
    await expect(about.getByText('Aug 2021 – Feb 2027 (expected)', { exact: true })).toBeVisible();
    await expect(about.getByText('Aug 2023 – May 2024', { exact: true })).toBeVisible();
    await page.getByRole('button', { name: 'Switch language to Korean' }).click();
    await expect(about.getByRole('img', { name: '김희상 프로필 사진' })).toBeVisible();
    await expect(about.getByText('2021.08 – 2027.02 (졸업 예정)', { exact: true })).toBeVisible();
    await page.getByRole('button', { name: '영어로 전환' }).click();
  }
});

for (const theme of ['light', 'dark'] as const) {
  for (const language of ['en', 'ko'] as const) {
    test(`accessibility: ${theme}, ${language}`, async ({ page }) => {
      await page.addInitScript(
        ({ theme, language }) => {
          localStorage.setItem('hk-theme', theme);
          localStorage.setItem('hk-language', language);
        },
        { theme, language },
      );
      await page.goto('/');
      const result = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze();
      expect(result.violations).toEqual([]);
    });
  }
}

test('populated cards filter, open accessible details and hide absent or unsafe fields', async ({
  page,
}) => {
  await page.goto('http://127.0.0.1:5173/tests/fixture.html');
  await expect(page.locator('.project-card')).toHaveCount(2);
  await page.getByRole('button', { name: 'AI', exact: true }).click();
  await expect(page.locator('.project-card')).toHaveCount(1);
  const trigger = page.getByRole('button', { name: 'View details' });
  await trigger.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('heading', { name: 'AI test fixture' })).toBeVisible();
  await expect(dialog.getByText('A sample result')).toBeVisible();
  await expect(dialog.getByRole('heading', { name: 'System architecture' })).toHaveCount(0);
  await expect(dialog.getByRole('link', { name: /Documentation/ })).toHaveAttribute(
    'href',
    'https://example.com/docs',
  );
  await expect(dialog.getByRole('link', { name: /Live demo/ })).toHaveCount(0);
  // Native modal traps focus in both directions.
  await dialog.getByRole('button', { name: 'Close details' }).focus();
  await page.keyboard.press('Shift+Tab');
  expect(await dialog.evaluate((element) => element.contains(document.activeElement))).toBe(true);
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
  await page.getByRole('button', { name: 'Software', exact: true }).click();
  await page.getByRole('button', { name: 'View details' }).click();
  await expect(dialog.locator('a')).toHaveCount(0);
  await expect(dialog.getByRole('heading', { name: 'Results', exact: true })).toHaveCount(0);
  await dialog.getByRole('button', { name: 'Close details' }).click();
  await page.getByRole('button', { name: 'Switch language to Korean' }).click();
  await expect(page.getByRole('heading', { name: '테스트 Software test fixture' })).toBeVisible();
  await expect(page.locator('.research-record .status-badge')).toHaveText('탐색 중');
  await expect(page.locator('.research-record .action-links a')).toHaveCount(1);
});

test('capture visual review artifacts', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Switch to light mode' }).click();
  await page.screenshot({ path: 'test-results/desktop-light.png', fullPage: true });
  await page.screenshot({ path: 'test-results/hero-light.png' });
  await page.locator('#main-navigation a[href="#about"]').click();
  await page.screenshot({ path: 'test-results/about-light.png' });
  await page.locator('#main-navigation a[href="#research"]').click();
  await page.screenshot({ path: 'test-results/research-light.png' });
  await page.getByRole('button', { name: 'Switch to dark mode' }).click();
  await page.screenshot({ path: 'test-results/research-dark.png' });
  await page.screenshot({ path: 'test-results/desktop-dark.png', fullPage: true });
  await page.locator('.navbar .wordmark').click();
  await page.screenshot({ path: 'test-results/hero-dark.png' });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole('button', { name: 'Switch language to Korean' }).click();
  await page.screenshot({ path: 'test-results/mobile-ko-dark.png', fullPage: true });
});
