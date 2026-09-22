import { useId } from 'react';
import { useLanguage } from '../context/LanguageContext';
import type { GraphicKind } from '../data/types';

export function SystemVisual() {
  const { t } = useLanguage();
  const id = useId().replace(/:/g, '');
  return (
    <figure className="system-visual">
      <div className="visual-corner top-left" />
      <div className="visual-corner bottom-right" />
      <div className="visual-topline">
        <span className="eyebrow">01 / {t.hero.figure}</span>
        <span className="crosshair" aria-hidden="true">
          +
        </span>
      </div>
      <svg viewBox="0 0 520 390" fill="none" aria-hidden="true" className="hero-diagram">
        <defs>
          <pattern id={`grid-${id}`} width="26" height="26" patternUnits="userSpaceOnUse">
            <path d="M26 0H0V26" className="svg-grid" strokeWidth="0.7" />
          </pattern>
          <linearGradient
            id={`plane-${id}`}
            x1="100"
            y1="90"
            x2="380"
            y2="350"
            gradientUnits="userSpaceOnUse"
          >
            <stop className="plane-start" />
            <stop offset="1" className="plane-end" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="520" height="390" fill={`url(#grid-${id})`} />
        <g className="diagram-back">
          <ellipse cx="260" cy="221" rx="212" ry="113" strokeDasharray="3 7" />
          <path d="M34 226h452M260 29v323" strokeDasharray="3 7" />
        </g>
        <path
          d="M82 260 260 164 438 260 260 356Z"
          fill={`url(#plane-${id})`}
          className="diagram-plane"
        />
        <g className="diagram-thin">
          <path d="m126 284 178-96m-134 120 178-96m-133 120 178-96M126 236l178 96m-134-120 178 96m-133-120 178 96" />
          <path d="M82 260v-72m356 72v-72M260 356v-72" strokeDasharray="4 5" />
        </g>
        <path d="M82 188 260 92 438 188 260 284Z" className="diagram-middle" />
        <g className="point-cloud">
          {Array.from({ length: 39 }, (_, i) => (
            <circle
              key={i}
              cx={145 + ((i * 43) % 221)}
              cy={150 + ((i * 29) % 74)}
              r={i % 5 === 0 ? 2.5 : 1.4}
            />
          ))}
        </g>
        <path d="M116 154 260 76 404 154 260 232Z" className="diagram-top" />
        <g className="diagram-node">
          <path d="m217 139 43-23 43 23-43 24Z" />
          <path d="M217 139v31l43 24 43-24v-31M260 163v31" />
          <path d="m242 139 18-10 18 10-18 10Z" className="node-fill" />
        </g>
        <g className="diagram-connections">
          <path d="m217 155-51 28m137-28 51 28m-94 11v50" />
          <circle cx="166" cy="183" r="5" />
          <circle cx="354" cy="183" r="5" />
          <circle cx="260" cy="244" r="5" />
        </g>
        <g className="diagram-labels">
          <path d="M305 132h64l33-35h59M158 195h-50l-35 27H30M293 299h61l25 25h69" />
          <text x="369" y="87">
            AI / COMPUTE
          </text>
          <text x="21" y="243">
            SENSOR INPUT
          </text>
          <text x="375" y="344">
            EDGE / SYSTEM
          </text>
        </g>
        <g className="diagram-boxes">
          <path d="M125 151v-18h21m-21 38v17h21M374 160v-18h-21m21 38v17h-21" />
          <circle cx="260" cy="76" r="3" />
          <circle cx="82" cy="260" r="3" />
          <circle cx="438" cy="260" r="3" />
        </g>
      </svg>
      <div className="visual-pipeline">
        <span>{t.hero.input}</span>
        <span className="pipeline-line" />
        <span>{t.hero.model}</span>
        <span className="pipeline-line" />
        <span>{t.hero.output}</span>
      </div>
      <figcaption>
        <span className="tiny-dot" />
        {t.hero.figureNote}
      </figcaption>
    </figure>
  );
}

export function ResearchGraphic({ kind }: { kind: GraphicKind }) {
  return (
    <svg
      className={`research-graphic ${kind}`}
      viewBox="0 0 320 140"
      fill="none"
      aria-hidden="true"
    >
      <g className="graphic-grid">
        {[30, 65, 100, 135].map((y) => (
          <path key={`h${y}`} d={`M0 ${y}h320`} />
        ))}
        {[20, 60, 100, 140, 180, 220, 260, 300].map((x) => (
          <path key={`v${x}`} d={`M${x} 0v140`} />
        ))}
      </g>
      {kind === 'systems' && (
        <g className="graphic-main">
          <rect x="133" y="45" width="54" height="50" rx="5" />
          <rect x="146" y="57" width="28" height="26" rx="2" />
          <path d="M80 34h27v36h26m54 0h30V34h25M80 110h27V70m80 0h30v40h25M150 45V27m20 18V27m-20 68v18m20-18v18" />
          <circle cx="73" cy="34" r="7" />
          <circle cx="249" cy="34" r="7" />
          <rect x="66" y="103" width="14" height="14" rx="3" />
          <rect x="242" y="103" width="14" height="14" rx="3" />
        </g>
      )}
      {kind === 'perception' && (
        <g className="graphic-main">
          <path d="M88 47V25h25m-25 67v22h25m119-67V25h-25m25 67v22h-25" />
          <rect x="119" y="46" width="38" height="48" strokeDasharray="3 3" />
          <rect x="174" y="63" width="30" height="31" />
          <path d="M105 101h108M161 30v80M103 70h114" className="graphic-faint" />
          {Array.from({ length: 19 }, (_, i) => (
            <circle key={i} cx={99 + ((i * 41) % 120)} cy={37 + ((i * 19) % 65)} r="1.3" />
          ))}
        </g>
      )}
      {kind === 'mobility' && (
        <g className="graphic-main">
          <rect x="132" y="16" width="56" height="27" rx="4" />
          <rect x="72" y="86" width="48" height="32" rx="4" />
          <rect x="200" y="86" width="48" height="32" rx="4" />
          <path d="M160 43v23H96v20m64-20h64v20m-128 16h24m92 0h24M146 29h28" />
          <circle cx="160" cy="66" r="4" />
          <path d="M127 102h66" strokeDasharray="3 5" />
        </g>
      )}
    </svg>
  );
}
