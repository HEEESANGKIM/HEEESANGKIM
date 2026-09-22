import { useId, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import type { GraphicKind } from '../data/types';
import './system-visual.css';

function CarWheel({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`matrix(.92 .45 0 1 ${x} ${y})`}>
      <circle r="24" className="sdv-tire" />
      <circle r="15.5" className="sdv-wheel-rim" />
      <g className="sdv-wheel-rotation">
        <path d="M0-13v26m-11.3-19.5 22.6 13m-22.6 0 22.6-13" className="sdv-wheel-spokes" />
      </g>
      <circle r="4.5" className="sdv-wheel-center" />
    </g>
  );
}

// A filled walking-person pictogram for the perception illustration.
function Pedestrian({
  x,
  y,
  width,
  height,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
}) {
  return (
    <svg x={x} y={y} width={width} height={height} viewBox="0 0 36 64" aria-hidden="true">
      <g className="robotics-pedestrian">
        <circle cx="21" cy="6" r="5.5" />
        <path
          d="M15 14c3-2 7-1 8 2l5 9 6 3c2 1 2 3 1 4s-2 2-4 1l-8-4-3-5-2 10 7 9c1 1 1 2 1 3l4 13c1 2-1 4-3 4s-3-1-4-3l-4-12-7-8-3 10-6 11c-1 2-3 2-5 1s-2-3-1-5l6-11 4-16 2-9-6 4-1 9c0 2-2 3-3 3s-3-2-3-4l1-11c0-1 1-3 2-3l10-6c2-1 3-1 5 0Z"
          transform="translate(4 0) scale(.88 1)"
        />
      </g>
    </svg>
  );
}

export function SystemVisual() {
  const { t } = useLanguage();
  const id = useId().replace(/:/g, '');
  const [motionPaused, setMotionPaused] = useState(false);

  return (
    <figure
      className={`system-visual robotics-visual sdv-visual${motionPaused ? ' is-paused' : ''}`}
    >
      <div className="visual-corner top-left" aria-hidden="true" />
      <div className="visual-corner bottom-right" aria-hidden="true" />
      <div className="visual-topline">
        <span className="eyebrow">01 / {t.hero.figure}</span>
        <button
          type="button"
          className="sdv-motion-toggle"
          onClick={() => setMotionPaused((paused) => !paused)}
          aria-label={motionPaused ? t.hero.resumeMotion : t.hero.pauseMotion}
          title={motionPaused ? t.hero.resumeMotion : t.hero.pauseMotion}
        >
          {motionPaused ? (
            <Play size={13} aria-hidden="true" />
          ) : (
            <Pause size={13} aria-hidden="true" />
          )}
        </button>
      </div>
      <svg
        viewBox="0 0 520 390"
        fill="none"
        aria-hidden="true"
        className="hero-diagram robotics-scene sdv-scene"
      >
        <defs>
          <pattern id={`sdv-grid-${id}`} width="26" height="26" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r=".7" className="robotics-grid-dot" />
          </pattern>
          <linearGradient
            id={`sdv-paint-${id}`}
            x1="195"
            y1="125"
            x2="285"
            y2="282"
            gradientUnits="userSpaceOnUse"
          >
            <stop className="sdv-paint-light" />
            <stop offset="1" className="sdv-paint-shade" />
          </linearGradient>
          <linearGradient
            id={`sdv-glass-${id}`}
            x1="183"
            y1="115"
            x2="281"
            y2="224"
            gradientUnits="userSpaceOnUse"
          >
            <stop className="sdv-glass-light" />
            <stop offset="1" className="sdv-glass-shade" />
          </linearGradient>
        </defs>
        <rect width="520" height="390" fill={`url(#sdv-grid-${id})`} />

        {/* Backward-moving lane markings keep the car centered while conveying forward travel. */}
        <path d="M35 229 205 137 485 282 315 374Z" className="sdv-road" />
        <g className="sdv-lane-markings">
          <path d="M57 217 337 362" />
          <path d="M183 149 463 294" />
        </g>
        <path
          d="m65 230 224 116 129-70-224-116Z"
          className="sdv-car-shadow"
          transform="matrix(1.15 0 0 1.15 -36 -32)"
        />

        {/* A passenger sedan, with a low roof, glazing, wheel arches, and front fascia. */}
        <g className="sdv-car" transform="matrix(1.15 0 0 1.15 -36 -32)">
          <CarWheel x={346} y={231} />
          <path
            d="m98 164 56-33q13-7 29 1l48 23 51 19 91 49q15 8 14 26l-4 17-66 37-30-5-181-91q-13-7-13-21v-12q0-7 5-10Z"
            className="sdv-car-body"
            fill={`url(#sdv-paint-${id})`}
          />
          <path
            d="m98 164 53 25 62 25 45 17 57 30q8 5 5 18l-3 24-21-10-1-19c-2-19-16-36-30-37s-23 9-21 26l1 6-80-40-1-21c-1-17-14-33-27-35s-23 8-22 25l1 5-10-5q-13-7-13-21v-12q0-7 5-10Z"
            className="sdv-car-side"
          />
          <CarWheel x={141} y={205} />
          <CarWheel x={271} y={270} />
          <path
            d="m124 177 24-43q5-9 15-14l38-20q9-5 20 0l53 26q12 6 23 19l34 47-73 40-45-18-62-25Z"
            className="sdv-car-body"
            fill={`url(#sdv-paint-${id})`}
          />
          <path d="m159 132 48-25q5-3 12 0l52 26q8 4 14 11l-50 27Z" className="sdv-roof" />
          <path
            d="m154 141-17 34 108 53-15-50Z"
            fill={`url(#sdv-glass-${id})`}
            className="sdv-glazing"
          />
          <path
            d="m243 177 49-27 27 39-61 33Z"
            fill={`url(#sdv-glass-${id})`}
            className="sdv-glazing"
          />
          <path d="m196 160-2 43m-35-54-13 25m112 7 33-18" className="sdv-window-trim" />
          <path d="m202 208 1 45m42-24 3 33m-77-55 13 6m30 10 14 7" className="sdv-body-detail" />
          <path d="m307 206 58 30m-91-11 36 20m-86 17-49-25" className="sdv-body-highlight" />
          <path d="m237 211-13-5q-5-2-7 2l-2 6 17 9 8-4Z" className="sdv-side-mirror" />
          <path d="m315 261 72-39v20l-67 38Z" className="sdv-front-fascia" />
          <path d="m326 267 49-27-1 13-48 27Z" className="sdv-grille" />
          <path d="m321 262 16-9m32-17 13-7" className="sdv-headlights" />
          <path d="m322 287 57-31M98 181l12 6" className="sdv-body-detail" />
          <path d="m99 173 11 5" className="sdv-tail-light" />

          {/* An integrated compute overlay connects the car to its software stack. */}
          <g className="sdv-vehicle-network">
            <path d="m300 228-15-8m27 11 34 19m-49-14-29 16m33-22 24-13" />
            <circle cx="285" cy="220" r="2.5" />
            <circle cx="346" cy="250" r="2.5" />
            <circle cx="268" cy="252" r="2.5" />
            <circle cx="325" cy="217" r="2.5" />
            <path d="m292 231 16-9 17 9-16 9Z" className="sdv-compute-chip" />
            <path d="m301 231 7-4 8 4-7 4Z" />
          </g>
        </g>
        <g className="sdv-software-link">
          <path d="M320.5 225.6V173l10.5-15V99h16" />
          <circle cx="320.5" cy="225.6" r="3" />
        </g>
        <g className="sdv-software-stack">
          <path d="M411 79v7m0 27v7" />
          <rect x="347" y="52" width="130" height="27" rx="5" />
          <rect x="347" y="86" width="130" height="27" rx="5" className="sdv-os-layer" />
          <rect x="347" y="120" width="130" height="27" rx="5" />
          <path d="m359 61 4 4-4 4m9-8v8M358 95h10v9h-10m2-11v2m5-2v2m-5 9v2m5-2v2M358 129h10v9h-10m3-6h4v3h-4" />
          <text x="378" y="69">
            AUTONOMY
          </text>
          <text x="378" y="103">
            VEHICLE OS
          </text>
          <text x="378" y="137">
            COMPUTE
          </text>
        </g>
        <g className="sdv-callouts">
          <text x="347" y="37" className="sdv-label-accent">
            SOFTWARE-DEFINED
          </text>
          <path d="M160.7 104.9 145 76H53" />
          <circle cx="160.7" cy="104.9" r="2.5" />
          <text x="53" y="66">
            CONNECTED VEHICLE
          </text>
          <path d="M381.5 282 403 314h66" />
          <circle cx="381.5" cy="282" r="2.5" />
          <text x="379" y="330">
            AUTONOMOUS DRIVING
          </text>
        </g>
      </svg>
      <div className="visual-pipeline robotics-pipeline">
        <span>{t.hero.input}</span>
        <span className="pipeline-line" aria-hidden="true" />
        <span>{t.hero.model}</span>
        <span className="pipeline-line" aria-hidden="true" />
        <span>{t.hero.output}</span>
      </div>
      <figcaption>
        <span className="tiny-dot" aria-hidden="true" />
        {t.hero.figureNote}
      </figcaption>
    </figure>
  );
}

function EdgeComputingGraphic() {
  return (
    <>
      <g className="robotics-research-wires">
        <path d="M60 56h33l27 16m-60 43h34l27-16M197 69h30V45h33m-62 54h29v24h33" />
        <circle cx="60" cy="56" r="3" />
        <circle cx="60" cy="115" r="3" />
        <circle cx="260" cy="45" r="3" />
        <circle cx="260" cy="123" r="3" />
      </g>
      <path d="m105 84 56-31 69 37-57 31Z" className="robotics-board" />
      <path d="m105 84 68 37v9l-68-37Zm68 37 57-31v9l-57 31Z" className="robotics-board-edge" />
      <g className="robotics-research-wires">
        <path d="m118 80 20 11m-12-16 20 11m-13-15 20 11m-12-15 20 11m38 19 16-9m-8 14 16-9m-23-20 14 8" />
      </g>
      <path d="m137 61 34-19 36 19-34 19Z" className="robotics-module-top" />
      <path d="m137 61 36 19v21l-36-19Zm36 19 34-19v21l-34 19Z" className="robotics-module-side" />
      <path
        d="m147 60 24 13m-16-18 24 13m-16-18 24 13m-16-18 24 13"
        className="robotics-heatsink"
      />
      <g className="robotics-research-accent">
        <rect x="35" y="45" width="23" height="17" rx="3" />
        <circle cx="46.5" cy="53.5" r="4" />
        <path d="M38 109h19v12H38Zm228-70h19v12h-19m5 68 6-8-1 9h6l-7 11 1-12Z" />
      </g>
      <g className="robotics-research-labels">
        <text x="28" y="82">
          SENSORS
        </text>
        <text x="131" y="149">
          ON-DEVICE AI
        </text>
        <text x="240" y="72">
          INFERENCE
        </text>
      </g>
    </>
  );
}

function PerceptionGraphic() {
  return (
    <>
      <rect x="49" y="22" width="222" height="115" rx="5" className="robotics-viewfinder" />
      <g className="robotics-scene-lines">
        <path d="M50 88h220M108 136l32-48m61 48-27-48m-17 7-1 12m-1 10-1 13" />
        <path d="M61 87V56h28v31m-19-31V41h14v15m129 31V42h22v45m7 0V61h17v26M93 87V68h26v19" />
        <path d="M218 51h12m-12 10h12m-12 10h12M66 66h17m-17 10h17m31-1h-16" />
      </g>
      <g className="robotics-perception-car">
        <path d="m127 94 8-17h31l9 17v19h-48Z" />
        <path d="m135 81-5 13h41l-7-13Zm-7 22h9m27 0h9M133 113v5m36-5v5" />
      </g>
      <Pedestrian x={197} y={85} width={20} height={36} />
      <g className="robotics-detection">
        <path d="M121 85V71h16m44 35v18h-16M194 90v-9h11m16 29v16h-10" />
        <rect
          x="121"
          y="71"
          width="60"
          height="53"
          rx="2"
          strokeDasharray="2 4"
          className="robotics-detection-faint"
        />
        <rect
          x="194"
          y="81"
          width="27"
          height="45"
          rx="2"
          strokeDasharray="2 4"
          className="robotics-detection-faint"
        />
      </g>
      <g className="robotics-research-labels">
        <text x="60" y="36">
          CAMERA / 01
        </text>
        <text x="122" y="65">
          VEHICLE
        </text>
        <text x="194" y="75">
          PERSON
        </text>
        <text x="107" y="153">
          SCENE UNDERSTANDING
        </text>
      </g>
      <circle cx="258" cy="32" r="2.5" className="robotics-solid" />
    </>
  );
}

function MobilityGraphic() {
  return (
    <>
      <path
        d="M67 39c0-9 12-15 31-15s31 6 31 15v87c0 11-12 17-31 17s-31-6-31-17Z"
        className="robotics-vehicle-shell"
      />
      <path
        d="m76 53 5-13h34l5 13-5 13H81Zm4 57h36l4 17H76ZM75 72v29m46-29v29"
        className="robotics-vehicle-window"
      />
      <g className="robotics-vehicle-wheels">
        <path d="M65 49v21m0 36v21m66-78v21m0 36v21" />
      </g>
      <g className="robotics-research-wires">
        <path d="M98 46v33m0 23v22m-15-37h30m-41-34h12v28m40-28h-12v28m-40 40h12V96m40 25h-12V96M115 88h48m15-36h-15v72h15" />
      </g>
      <rect x="84" y="75" width="28" height="26" rx="3" className="robotics-vehicle-compute" />
      <path d="M92 83h12v10H92Z" className="robotics-module-top" />
      <g className="robotics-system-layers">
        <rect x="178" y="37" width="92" height="27" rx="4" />
        <rect x="178" y="74" width="92" height="27" rx="4" />
        <rect x="178" y="111" width="92" height="27" rx="4" />
        <path d="M224 64v10m0 27v10" />
      </g>
      <g className="robotics-research-labels">
        <text x="224" y="54" textAnchor="middle">
          APPLICATIONS
        </text>
        <text x="224" y="91" textAnchor="middle">
          VEHICLE OS
        </text>
        <text x="224" y="128" textAnchor="middle">
          HARDWARE
        </text>
      </g>
      <g className="robotics-points">
        <circle cx="98" cy="38" r="3" />
        <circle cx="98" cy="133" r="3" />
        <circle cx="72" cy="53" r="2.5" />
        <circle cx="124" cy="53" r="2.5" />
        <circle cx="72" cy="121" r="2.5" />
        <circle cx="124" cy="121" r="2.5" />
      </g>
    </>
  );
}

export function ResearchGraphic({ kind }: { kind: GraphicKind }) {
  return (
    <svg
      className={`research-graphic robotics-research ${kind}`}
      viewBox="0 0 320 166"
      fill="none"
      aria-hidden="true"
    >
      <g className="robotics-research-grid">
        {[36, 68, 100, 132].map((y) => (
          <path key={`h${y}`} d={`M16 ${y}h288`} />
        ))}
        {[32, 64, 96, 128, 160, 192, 224, 256, 288].map((x) => (
          <path key={`v${x}`} d={`M${x} 12v142`} />
        ))}
      </g>
      {kind === 'systems' && <EdgeComputingGraphic />}
      {kind === 'perception' && <PerceptionGraphic />}
      {kind === 'mobility' && <MobilityGraphic />}
    </svg>
  );
}
