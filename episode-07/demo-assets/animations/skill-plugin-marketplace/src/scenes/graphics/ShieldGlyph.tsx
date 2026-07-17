// A plain shield outline, used alongside MagnifierGlyph as the extended
// cut's review-before-install trust cue. Deliberately an unfilled outline
// with no checkmark, lock, or seal mark inside it — it reads as "currently
// under review," not as a certified/guaranteed-safe badge. Per "Build the
// Marketplace storefront and plugin catalog" (issue #24), this must not
// imply that Marketplace listing guarantees safety.
import React from 'react';
import {COLORS} from '../../theme';

export type ShieldGlyphProps = {
  width: number;
  opacity: number;
};

const VIEW_WIDTH = 100;
const VIEW_HEIGHT = 116;

export const ShieldGlyph = ({width, opacity}: ShieldGlyphProps): React.JSX.Element => {
  const height = width * (VIEW_HEIGHT / VIEW_WIDTH);

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
      style={{display: 'block', opacity}}
    >
      <path
        d="M50 4 L92 20 V54 C92 82 74 102 50 112 C26 102 8 82 8 54 V20 Z"
        fill={COLORS.surface}
        stroke={COLORS.inkMuted}
        strokeWidth={6}
      />
    </svg>
  );
};
