// Original "person at a computer" pictogram: a generic head-and-shoulders
// silhouette (no gender, age, or skin-tone markers) sitting behind a plain
// monitor-on-a-desk shape. Used in pairs to represent an unnamed sender and
// recipient sharing a Skill folder. Built from plain circles/paths/rects —
// no third-party icon set, logo, or branded device chrome.
import React from 'react';
import {COLORS} from '../../theme';

export type PersonAtComputerGlyphProps = {
  width: number;
  opacity: number;
  accentColor?: string;
  accentSoft?: string;
};

const VIEW_WIDTH = 240;
const VIEW_HEIGHT = 330;

export const PersonAtComputerGlyph = ({
  width,
  opacity,
  accentColor = COLORS.primary,
  accentSoft = COLORS.primarySoft,
}: PersonAtComputerGlyphProps): React.JSX.Element => {
  const height = width * (VIEW_HEIGHT / VIEW_WIDTH);

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
      style={{display: 'block', opacity}}
    >
      {/* Head + shoulders silhouette, deliberately featureless/neutral. */}
      <circle cx={120} cy={55} r={42} fill={COLORS.inkMuted} />
      <path
        d="M40,200 C40,120 85,84 120,84 C155,84 200,120 200,200 L200,235 L40,235 Z"
        fill={COLORS.inkMuted}
      />

      {/* Monitor + desk, drawn in front so the person reads as sitting
          behind it. */}
      <rect
        x={40}
        y={195}
        width={160}
        height={100}
        rx={12}
        fill={COLORS.surface}
        stroke={COLORS.line}
        strokeWidth={3}
      />
      <rect x={56} y={215} width={90} height={10} rx={4} fill={accentSoft} />
      <circle cx={181} cy={220} r={6} fill={accentColor} />
      <rect x={56} y={237} width={128} height={10} rx={4} fill={COLORS.surfaceMuted} />
      <rect x={56} y={259} width={70} height={10} rx={4} fill={COLORS.surfaceMuted} />
      <rect x={112} y={295} width={16} height={18} fill={COLORS.line} />
      <rect x={85} y={313} width={70} height={8} rx={4} fill={COLORS.line} />
    </svg>
  );
};
