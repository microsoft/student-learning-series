// The SKILL.md document glyph: a paper card with a folded corner, a header
// stripe labeled "SKILL.md", and a handful of short, varied-width bars
// standing in for concise instruction lines (front-matter + terse steps) —
// deliberately not full-width paragraph blocks, so the shape itself reads as
// "instructions" rather than "prose" even at a glance.
//
// The first four body lines double as the landing spots for the opening's
// four workflow steps ("Build the workflow-to-Skill formation sequence",
// issue #31): OpeningSequence morphs the numbered step nodes into exactly
// these four rects (via `computeDocumentBodyLineRect`, pure geometry so both
// sides always agree), then renders this glyph with `visibleFromIndex={4}`
// so the glyph only draws its own chrome plus the two trailing static lines
// — the morphed step nodes themselves are what the viewer sees occupying the
// first four line slots, with no duplicate draw and no cross-fade seam.
import React from 'react';
import {COLORS, MONO_FONT_STACK} from '../../theme';

export type DocumentGlyphProps = {
  width: number;
  height: number;
  opacity: number;
  /** Body line indices below this are not drawn by this glyph (left to an external, already-positioned element instead). */
  visibleFromIndex?: number;
};

export const BODY_LINE_WIDTHS = [0.82, 0.55, 0.68, 0.4, 0.6, 0.3] as const;
export const INSTRUCTION_LINE_COUNT = 4;

export type DocumentLineRect = {x: number; y: number; width: number; height: number};

/**
 * Pure geometry for a given body line's rect, in the glyph's own local
 * coordinate space (0,0 at the glyph's top-left corner). Mirrors the layout
 * math below exactly, so callers can compute an absolute morph target for a
 * body line without needing a browser layout pass.
 */
export const computeDocumentBodyLineRect = (
  width: number,
  height: number,
  index: number,
): DocumentLineRect => {
  const headerHeight = height * 0.16;
  const padding = width * 0.08;
  const bodyAreaHeight = height - headerHeight;
  const lineHeight = bodyAreaHeight * 0.08;
  const gap = bodyAreaHeight * 0.07;
  const topPad = bodyAreaHeight * 0.12;

  return {
    height: lineHeight,
    width: (width - padding * 2) * BODY_LINE_WIDTHS[index],
    x: padding,
    y: headerHeight + topPad + index * (lineHeight + gap),
  };
};

export const DocumentGlyph = ({
  width,
  height,
  opacity,
  visibleFromIndex = 0,
}: DocumentGlyphProps): React.JSX.Element => {
  const dogEar = height * 0.14;
  const headerHeight = height * 0.16;
  const padding = width * 0.08;

  return (
    <div
      style={{
        background: COLORS.surface,
        borderRadius: 14,
        boxShadow: '0 24px 60px rgba(36, 36, 36, 0.14)',
        height,
        opacity,
        position: 'relative',
        width,
      }}
    >
      {/* Folded corner (dog-ear) — reads as "document", not "photo/app". */}
      <div
        style={{
          background: COLORS.surfaceMuted,
          clipPath: 'polygon(100% 0, 0 0, 100% 100%)',
          height: dogEar,
          position: 'absolute',
          right: 0,
          top: 0,
          width: dogEar,
        }}
      />

      <div
        style={{
          alignItems: 'center',
          borderBottom: `2px solid ${COLORS.line}`,
          color: COLORS.primary,
          display: 'flex',
          fontFamily: MONO_FONT_STACK,
          fontSize: headerHeight * 0.42,
          fontWeight: 700,
          height: headerHeight,
          paddingLeft: padding,
        }}
      >
        SKILL.md
      </div>

      {/* Each line is placed at its own absolute rect (rather than a flex
          column) so skipping the first `visibleFromIndex` lines — the ones
          the opening's morphed workflow steps already occupy — never
          reflows the remaining lines. */}
      {BODY_LINE_WIDTHS.map((_, index) => {
        if (index < visibleFromIndex) {
          return null;
        }

        const rect = computeDocumentBodyLineRect(width, height, index);
        return (
          <div
            key={index}
            style={{
              background:
                index < INSTRUCTION_LINE_COUNT ? COLORS.primarySoft : COLORS.surfaceMuted,
              borderRadius: 6,
              height: rect.height,
              left: rect.x,
              position: 'absolute',
              top: rect.y,
              width: rect.width,
            }}
          />
        );
      })}
    </div>
  );
};
