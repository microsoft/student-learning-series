// Original "robot / avatar badge" icon for the Agent Personas module tile:
// a rounded badge holding a simple robot-face plate (antenna, dot eyes,
// grille mouth). Plain circles/rects only — no imported icon or logo.
import React from 'react';
import {COLORS} from '../../theme';

export type AgentPersonaGlyphProps = {
  width: number;
  opacity: number;
  accentColor?: string;
  softColor?: string;
};

const VIEW_SIZE = 200;

export const AgentPersonaGlyph = ({
  width,
  opacity,
  accentColor = COLORS.accent,
  softColor = COLORS.accentSoft,
}: AgentPersonaGlyphProps): React.JSX.Element => {
  return (
    <svg
      width={width}
      height={width}
      viewBox={`0 0 ${VIEW_SIZE} ${VIEW_SIZE}`}
      style={{display: 'block', opacity}}
    >
      <circle
        cx={100}
        cy={100}
        r={92}
        fill={softColor}
        stroke={accentColor}
        strokeWidth={4}
      />

      {/* Antenna. */}
      <rect x={94} y={28} width={12} height={26} rx={6} fill={accentColor} />
      <circle cx={100} cy={26} r={9} fill={accentColor} />

      {/* Face plate. */}
      <rect
        x={52}
        y={54}
        width={96}
        height={84}
        rx={20}
        fill={COLORS.surface}
        stroke={accentColor}
        strokeWidth={4}
      />
      <circle cx={80} cy={96} r={9} fill={accentColor} />
      <circle cx={120} cy={96} r={9} fill={accentColor} />
      <rect
        x={74}
        y={118}
        width={52}
        height={12}
        rx={6}
        fill={softColor}
        stroke={accentColor}
        strokeWidth={3}
      />
    </svg>
  );
};
