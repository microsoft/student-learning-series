// Original "server stack with bidirectional data arrows" icon for the MCP
// Servers module tile: three stacked server units (each with an LED and a
// port mark) plus a double-headed vertical arrow standing in for two-way
// data flow. Deliberately drawn as a sibling shape to the Agent Persona
// badge (same tile size/footprint) rather than nested inside it, so the two
// module types read as parallel siblings, not parent/child. Plain
// rects/circles/polygons only — no imported icon or logo.
import React from 'react';
import {COLORS} from '../../theme';

export type McpServerGlyphProps = {
  width: number;
  opacity: number;
  accentColor?: string;
  dataColor?: string;
};

const VIEW_WIDTH = 220;
const VIEW_HEIGHT = 200;
const UNIT_Y = [24, 66, 108];

export const McpServerGlyph = ({
  width,
  opacity,
  accentColor = COLORS.accent,
  dataColor = COLORS.primary,
}: McpServerGlyphProps): React.JSX.Element => {
  const height = width * (VIEW_HEIGHT / VIEW_WIDTH);

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
      style={{display: 'block', opacity}}
    >
      {UNIT_Y.map((y) => (
        <React.Fragment key={y}>
          <rect
            x={20}
            y={y}
            width={130}
            height={34}
            rx={8}
            fill={COLORS.surface}
            stroke={COLORS.line}
            strokeWidth={3}
          />
          <circle cx={36} cy={y + 17} r={6} fill={accentColor} />
          <rect x={126} y={y + 11} width={14} height={12} rx={2} fill={COLORS.line} />
        </React.Fragment>
      ))}

      {/* Bidirectional data arrow: up-arrow, shaft, down-arrow. */}
      <polygon points="175,40 163,62 187,62" fill={dataColor} />
      <rect x={172} y={58} width={6} height={68} fill={dataColor} />
      <polygon points="175,146 163,124 187,124" fill={dataColor} />
    </svg>
  );
};
