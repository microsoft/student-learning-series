// The formed Skill contents panel: a titled card holding SKILL.md (its
// first four instruction lines supplied externally by OpeningSequence's
// morphed workflow-step nodes — see "Build the workflow-to-Skill formation
// sequence", issue #31) plus the optional "scripts" / "references" /
// "assets" companion folders.
//
// Every offset below is an explicit constant (not CSS grid/flex-computed)
// so OpeningSequence can derive the exact absolute position of SKILL.md's
// body lines — the workflow steps' morph target — without a browser layout
// pass. Only OpeningSequence renders this panel, so these constants are the
// single source of truth for both sides of that handoff.
import React from 'react';
import {COLORS, FONT_STACK} from '../../theme';
import {CompanionCard} from './CompanionCard';
import {DocumentGlyph, INSTRUCTION_LINE_COUNT} from './DocumentGlyph';

export const SKILL_PANEL_WIDTH = 1500;
export const SKILL_PANEL_HEIGHT = 650;
export const PANEL_PADDING_X = 48;
export const PANEL_TITLE_HEIGHT = 96;
export const DOC_WIDTH = 780;
export const DOC_HEIGHT = 490;
/** SKILL.md's offset from the panel's own top-left corner. */
export const DOC_LEFT_OFFSET = PANEL_PADDING_X;
export const DOC_TOP_OFFSET = PANEL_TITLE_HEIGHT;

const COMPANION_GAP = 58;
const COMPANION_WIDTH = 470;
const COMPANION_HEIGHT = 116;
const COMPANION_ROW_GAP = 18;
const COMPANION_HEADING_HEIGHT = 42;

const COMPANION_LABELS = ['scripts', 'references', 'assets'] as const;

export type SkillContentsPanelProps = {
  opacity: number;
  /** Whether SKILL.md's own first four lines should render (false while the morphed step nodes are still occupying those slots). */
  showInstructionLines: boolean;
  companionOpacities: readonly [number, number, number];
  companionTranslateY: readonly [number, number, number];
};

export const SkillContentsPanel = ({
  opacity,
  showInstructionLines,
  companionOpacities,
  companionTranslateY,
}: SkillContentsPanelProps): React.JSX.Element => (
  <div
    style={{
      background: COLORS.surface,
      border: `2px solid ${COLORS.line}`,
      borderRadius: 28,
      boxShadow: '0 30px 70px rgba(36, 36, 36, 0.12)',
      boxSizing: 'border-box',
      height: SKILL_PANEL_HEIGHT,
      opacity,
      position: 'relative',
      width: SKILL_PANEL_WIDTH,
    }}
  >
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        gap: 14,
        height: PANEL_TITLE_HEIGHT,
        left: PANEL_PADDING_X,
        position: 'absolute',
        top: 0,
      }}
    >
      <div style={{background: COLORS.primary, borderRadius: 6, height: 38, width: 9}} />
      <div style={{color: COLORS.primary, fontFamily: FONT_STACK, fontSize: 44, fontWeight: 700}}>
        Skill
      </div>
    </div>

    <div style={{left: DOC_LEFT_OFFSET, position: 'absolute', top: DOC_TOP_OFFSET}}>
      <DocumentGlyph
        width={DOC_WIDTH}
        height={DOC_HEIGHT}
        opacity={1}
        visibleFromIndex={showInstructionLines ? 0 : INSTRUCTION_LINE_COUNT}
      />
    </div>

    <div
      style={{
        left: DOC_LEFT_OFFSET + DOC_WIDTH + COMPANION_GAP,
        position: 'absolute',
        top: DOC_TOP_OFFSET,
        width: COMPANION_WIDTH,
      }}
    >
      <div
        style={{
          color: COLORS.inkMuted,
          fontFamily: FONT_STACK,
          fontSize: 24,
          fontWeight: 650,
          height: COMPANION_HEADING_HEIGHT,
        }}
      >
        Companion folders
      </div>
      <div style={{display: 'flex', flexDirection: 'column', gap: COMPANION_ROW_GAP}}>
        {COMPANION_LABELS.map((label, index) => (
          <CompanionCard
            key={label}
            label={label}
            width={COMPANION_WIDTH}
            height={COMPANION_HEIGHT}
            opacity={companionOpacities[index]}
            translateY={companionTranslateY[index]}
          />
        ))}
      </div>
    </div>
  </div>
);
