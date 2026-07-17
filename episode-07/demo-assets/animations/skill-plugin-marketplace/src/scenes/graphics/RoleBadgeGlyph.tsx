// Original "role badge" icon for the Rubber Duck Agent Persona origin story
// ("Build the Rubber Duck Agent Persona origin", issue #32): a round pin
// badge holding a simple rubber-duck silhouette (round head, oval body,
// pointed bill, dot eye). This is the concrete role being assigned to the
// neutral AI figure (`AgentPersonaGlyph`) before it resolves into the
// `rubber-duck.agent.md` artifact — the badge itself never appears again
// once that resolve happens. Plain circles/ellipses/polygons only — no
// imported icon, logo, or third-party mascot artwork.
import React from 'react';
import {COLORS} from '../../theme';

export type RoleBadgeGlyphProps = {
  width: number;
  opacity: number;
  accentColor?: string;
  softColor?: string;
};

const VIEW_SIZE = 120;

export const RoleBadgeGlyph = ({
  width,
  opacity,
  accentColor = COLORS.accent,
  softColor = COLORS.accentSoft,
}: RoleBadgeGlyphProps): React.JSX.Element => {
  return (
    <svg
      width={width}
      height={width}
      viewBox={`0 0 ${VIEW_SIZE} ${VIEW_SIZE}`}
      style={{display: 'block', opacity}}
    >
      {/* Pin rim. */}
      <circle
        cx={60}
        cy={60}
        r={54}
        fill={COLORS.surface}
        stroke={accentColor}
        strokeWidth={5}
      />

      {/* Duck body + wing shading. */}
      <ellipse cx={65} cy={76} rx={32} ry={23} fill={accentColor} />
      <ellipse cx={74} cy={80} rx={14} ry={9} fill={softColor} opacity={0.7} />

      {/* Duck head + bill (a lighter cutout so it reads distinctly from the head). */}
      <circle cx={42} cy={47} r={19} fill={accentColor} />
      <polygon
        points="16,44 42,38 42,54"
        fill={softColor}
        stroke={accentColor}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <circle cx={47} cy={43} r={3.5} fill={COLORS.surface} />
    </svg>
  );
};
