// A plain magnifying-glass glyph (circle + handle), used only as the
// extended cut's review-before-install trust cue. Purely geometric — no
// imported icon, no checkmark, no lock. Built for "Build the Marketplace
// storefront and plugin catalog" (issue #24).
import React from 'react';
import {COLORS} from '../../theme';

export type MagnifierGlyphProps = {
  width: number;
  opacity: number;
};

const VIEW_SIZE = 120;

export const MagnifierGlyph = ({width, opacity}: MagnifierGlyphProps): React.JSX.Element => {
  return (
    <svg
      width={width}
      height={width}
      viewBox={`0 0 ${VIEW_SIZE} ${VIEW_SIZE}`}
      style={{display: 'block', opacity}}
    >
      <circle cx={50} cy={50} r={34} fill="none" stroke={COLORS.ink} strokeWidth={7} />
      <line x1={74} y1={74} x2={104} y2={104} stroke={COLORS.ink} strokeWidth={9} strokeLinecap="round" />
    </svg>
  );
};
