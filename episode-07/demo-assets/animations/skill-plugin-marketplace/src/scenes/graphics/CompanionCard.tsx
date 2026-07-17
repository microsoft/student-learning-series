// A small companion-resource card (used for the optional "scripts",
// "references", and "assets" folders shown beside SKILL.md). Reuses the same
// folder glyph at a smaller size so the visual vocabulary stays consistent.
import React from 'react';
import {COLORS, FONT_STACK} from '../../theme';
import {FolderGlyph} from './FolderGlyph';

export type CompanionCardProps = {
  label: string;
  width: number;
  height: number;
  opacity: number;
  translateY: number;
};

export const CompanionCard = ({
  label,
  width,
  height,
  opacity,
  translateY,
}: CompanionCardProps): React.JSX.Element => {
  const glyphWidth = height * 0.58;

  return (
    <div
      style={{
        alignItems: 'center',
        background: COLORS.surfaceMuted,
        border: `2px solid ${COLORS.line}`,
        borderRadius: 16,
        boxSizing: 'border-box',
        display: 'flex',
        gap: 24,
        height,
        opacity,
        padding: '18px 26px',
        transform: `translateY(${translateY}px)`,
        width,
      }}
    >
      <FolderGlyph
        width={glyphWidth}
        height={glyphWidth * 0.78}
        fill={COLORS.primarySoft}
        tabFill={COLORS.primary}
        strokeColor={COLORS.primary}
      />
      <div
        style={{
          color: COLORS.ink,
          fontFamily: FONT_STACK,
          fontSize: 28,
          fontWeight: 600,
        }}
      >
        {label}
      </div>
    </div>
  );
};
