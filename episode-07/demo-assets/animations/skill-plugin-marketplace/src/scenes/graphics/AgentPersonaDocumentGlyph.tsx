// The `rubber-duck.agent.md` document glyph: a paper card (same dog-ear +
// header-stripe language as `DocumentGlyph`'s `SKILL.md`) that makes the
// Agent Persona concept legible as a real, singular file rather than an
// abstract badge. Unlike `SKILL.md`'s body — deliberately abstract bars
// standing in for terse instructions — this card renders real, short
// field/value text, because the origin story ("Build the Rubber Duck Agent
// Persona origin", issue #32) needs to *communicate* what a role/behavior
// profile actually holds: name, role, method, priorities, and boundaries.
// Five short rows, not paragraphs, keep it legible at a glance.
import React from 'react';
import {COLORS, FONT_STACK, MONO_FONT_STACK} from '../../theme';

export type AgentPersonaField = {label: string; value: string};

// The Rubber Duck's role/behavior profile — short enough to read as a
// glance-able summary, not prose. `boundaries` is last and phrased as a
// firm "does not" so the card visibly draws a line as well as a purpose.
export const RUBBER_DUCK_FIELDS: readonly AgentPersonaField[] = [
  {label: 'Name', value: 'Rubber Duck'},
  {label: 'Role', value: 'Listener'},
  {label: 'Method', value: 'Ask, don\u2019t answer'},
  {label: 'Priorities', value: 'Clarity first'},
  {label: 'Boundaries', value: 'Never writes the code'},
] as const;

export type AgentPersonaDocumentGlyphProps = {
  width: number;
  height: number;
  opacity: number;
  fileName?: string;
  fields?: readonly AgentPersonaField[];
  accentColor?: string;
};

export const AgentPersonaDocumentGlyph = ({
  width,
  height,
  opacity,
  fileName = 'rubber-duck.agent.md',
  fields = RUBBER_DUCK_FIELDS,
  accentColor = COLORS.accent,
}: AgentPersonaDocumentGlyphProps): React.JSX.Element => {
  const dogEar = height * 0.14;
  const headerHeight = height * 0.19;
  const padding = width * 0.08;

  const rowAreaHeight = height - headerHeight;
  const topPad = rowAreaHeight * 0.1;
  const rowGap = rowAreaHeight * 0.045;
  const rowHeight =
    (rowAreaHeight - topPad * 1.5 - rowGap * (fields.length - 1)) / fields.length;
  const labelColumnWidth = (width - padding * 2) * 0.4;

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
      {/* Folded corner (dog-ear) — same "document" cue as SKILL.md. */}
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
          color: accentColor,
          display: 'flex',
          fontFamily: MONO_FONT_STACK,
          fontSize: headerHeight * 0.36,
          fontWeight: 700,
          height: headerHeight,
          paddingLeft: padding,
        }}
      >
        {fileName}
      </div>

      <div
        style={{
          left: padding,
          position: 'absolute',
          top: headerHeight + topPad,
          width: width - padding * 2,
        }}
      >
        {fields.map((field, index) => (
          <div
            key={field.label}
            style={{
              alignItems: 'baseline',
              display: 'flex',
              height: rowHeight,
              marginTop: index === 0 ? 0 : rowGap,
            }}
          >
            <div
              style={{
                color: accentColor,
                flexShrink: 0,
                fontFamily: FONT_STACK,
                fontSize: rowHeight * 0.34,
                fontWeight: 700,
                letterSpacing: 0.4,
                textTransform: 'uppercase',
                width: labelColumnWidth,
              }}
            >
              {field.label}
            </div>
            <div
              style={{
                color: COLORS.ink,
                fontFamily: FONT_STACK,
                fontSize: rowHeight * 0.42,
                fontWeight: 600,
              }}
            >
              {field.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
