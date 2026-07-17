// The production opening sequence, shared by both the modular (60s) and
// extended (90s) compositions: "Build the workflow-to-Skill formation
// sequence" (issue #31). Four abstract, unlabeled workflow steps appear
// connected as a readable sequence, compress/morph into the first four
// instruction lines inside a forming SKILL.md document, the optional
// scripts/references/assets companion folders join it, and then a Skill
// folder forms around the complete contents — settling into the same
// intact, centered Skill-folder hold that "Build sharing and the Plugin
// transformation" (issue #23, the next scene ticket) continues from. This
// replaces the earlier file-browser-first opening (issue #22) while keeping
// that scene's exported hand-off contract (`HERO_WIDTH`/`HERO_HEIGHT`, a
// centered folder + "Skill" label) pixel-identical.
//
// All shapes are original SVG/CSS — no third-party icons, logos, or branded
// OS chrome. A single content group (the workflow steps / SKILL.md panel)
// fades and scales down toward canvas center while a separate folder layer
// grows to enclose it and then settles to the small hero size, so the
// "folder forms around the contents" beat reads as one continuous collapse
// rather than a hard cut.
import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {HEIGHT, WIDTH} from '../contract';
import {
  buildSchedule,
  EASE_OUT,
  ENTRANCE_FRAMES,
  LABEL_FADE_FRAMES,
  MIN_HOLD_FRAMES,
  MORPH_FRAMES,
  easedColor,
  easedRange,
} from '../motion';
import {COLORS, FONT_STACK} from '../theme';
import {computeDocumentBodyLineRect} from './graphics/DocumentGlyph';
import {FolderGlyph} from './graphics/FolderGlyph';
import {
  DOC_HEIGHT,
  DOC_LEFT_OFFSET,
  DOC_TOP_OFFSET,
  DOC_WIDTH,
  SKILL_PANEL_HEIGHT,
  SKILL_PANEL_WIDTH,
  SkillContentsPanel,
} from './graphics/SkillContentsPanel';
import {WorkflowStepNode, WorkflowSteps} from './graphics/WorkflowSteps';

export type OpeningSequenceProps = {
  /** Frames allotted to this scene within the current cut (duration-aware). */
  durationInFrames: number;
};

const CANVAS_CENTER_X = WIDTH / 2;
const CANVAS_CENTER_Y = HEIGHT / 2;

const PANEL_LEFT = (WIDTH - SKILL_PANEL_WIDTH) / 2;
const PANEL_TOP = (HEIGHT - SKILL_PANEL_HEIGHT) / 2;
const DOC_ABS_LEFT = PANEL_LEFT + DOC_LEFT_OFFSET;
const DOC_ABS_TOP = PANEL_TOP + DOC_TOP_OFFSET;

const STEP_COUNT = 4;
const STEP_NODE_SIZE = 130;
const STEP_ROW_SPACING = 260;
const STEP_ENTRANCE_STAGGER = 9;
// Centered, evenly-spaced row: [-1.5, -0.5, 0.5, 1.5] * spacing.
const STEP_ROW_OFFSETS = [-1.5, -0.5, 0.5, 1.5] as const;

const COMPANION_LABELS = ['scripts', 'references', 'assets'] as const;
const COMPANION_ENTRANCE_STAGGER = 9;

// Exported so "Build sharing and the Plugin transformation" (issue #23) can
// reproduce this exact hero size when it continues from this scene's final
// hold, keeping the handoff between the two scenes pixel-seamless.
export const HERO_WIDTH = 340;
export const HERO_HEIGHT = 260;

// The folder briefly grows large enough to visually enclose the formed
// Skill contents panel before collapsing to the hero size — this is the
// "Skill folder forms around the contents" beat.
const FOLDER_ENCLOSING_WIDTH = SKILL_PANEL_WIDTH + 80;
const FOLDER_ENCLOSING_HEIGHT = SKILL_PANEL_HEIGHT + 80;
const FOLDER_APPEAR_FRAMES = 8;

export const OpeningSequence = ({
  durationInFrames,
}: OpeningSequenceProps): React.JSX.Element => {
  const frame = useCurrentFrame();

  const schedule = buildSchedule(durationInFrames, [
    {
      name: 'stepsEntrance',
      kind: 'fixed',
      frames: ENTRANCE_FRAMES + (STEP_COUNT - 1) * STEP_ENTRANCE_STAGGER,
    },
    {name: 'stepsHold', kind: 'flex', weight: 1},
    {name: 'stepsCompress', kind: 'fixed', frames: MORPH_FRAMES},
    {name: 'docChromeFade', kind: 'fixed', frames: LABEL_FADE_FRAMES},
    {name: 'companionsEntrance', kind: 'fixed', frames: ENTRANCE_FRAMES * 2},
    {name: 'readHold', kind: 'flex', weight: 3},
    {name: 'folderForm', kind: 'fixed', frames: MORPH_FRAMES},
    {name: 'heroLabelFade', kind: 'fixed', frames: LABEL_FADE_FRAMES},
    {name: 'finalHold', kind: 'flex', weight: 2},
  ]);

  if (schedule.finalHold.frames < MIN_HOLD_FRAMES) {
    // A future scene ticket compressing this opening's share of the cut
    // should see this in dev tooling rather than silently clip the hold that
    // the next scene is meant to continue from.
    // eslint-disable-next-line no-console
    console.warn(
      `OpeningSequence final hold (${schedule.finalHold.frames}f) is shorter ` +
        `than the motion grammar's minimum hold (${MIN_HOLD_FRAMES}f).`,
    );
  }

  // --- Workflow steps: entrance, connected hold, then compress into SKILL.md lines ---
  const connectorFadeInStart = schedule.stepsEntrance.end - LABEL_FADE_FRAMES;
  const connectorOpacity = interpolate(
    frame,
    [
      connectorFadeInStart,
      schedule.stepsEntrance.end,
      schedule.stepsCompress.start,
      schedule.stepsCompress.start + MORPH_FRAMES / 2,
    ],
    [0, 1, 1, 0],
    {easing: EASE_OUT, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );

  const stepNodes = STEP_ROW_OFFSETS.map((offsetMultiplier, index) => {
    const entranceStart = schedule.stepsEntrance.start + index * STEP_ENTRANCE_STAGGER;
    const entranceEnd = entranceStart + ENTRANCE_FRAMES;
    const opacity = easedRange(frame, entranceStart, entranceEnd, 0, 1);
    const translateY = easedRange(frame, entranceStart, entranceEnd, 24, 0);

    const rowCenterX = CANVAS_CENTER_X + offsetMultiplier * STEP_ROW_SPACING;
    const targetLine = computeDocumentBodyLineRect(DOC_WIDTH, DOC_HEIGHT, index);
    const targetCenterX = DOC_ABS_LEFT + targetLine.x + targetLine.width / 2;
    const targetCenterY = DOC_ABS_TOP + targetLine.y + targetLine.height / 2;

    const centerX = easedRange(
      frame,
      schedule.stepsCompress.start,
      schedule.stepsCompress.end,
      rowCenterX,
      targetCenterX,
    );
    const centerY = easedRange(
      frame,
      schedule.stepsCompress.start,
      schedule.stepsCompress.end,
      CANVAS_CENTER_Y,
      targetCenterY,
    );
    const width = easedRange(
      frame,
      schedule.stepsCompress.start,
      schedule.stepsCompress.end,
      STEP_NODE_SIZE,
      targetLine.width,
    );
    const height = easedRange(
      frame,
      schedule.stepsCompress.start,
      schedule.stepsCompress.end,
      STEP_NODE_SIZE,
      targetLine.height,
    );
    const cornerRadius = easedRange(
      frame,
      schedule.stepsCompress.start,
      schedule.stepsCompress.end,
      STEP_NODE_SIZE / 2,
      6,
    );
    const numeralOpacity = easedRange(
      frame,
      schedule.stepsCompress.start,
      schedule.stepsCompress.start + MORPH_FRAMES / 2,
      1,
      0,
    );
    const fill = easedColor(
      frame,
      schedule.stepsCompress.start,
      schedule.stepsCompress.end,
      COLORS.primary,
      COLORS.primarySoft,
    );

    return {
      centerX,
      centerY,
      cornerRadius,
      fill,
      height,
      numeralOpacity,
      opacity,
      translateY,
      width,
    };
  }) as [WorkflowStepNode, WorkflowStepNode, WorkflowStepNode, WorkflowStepNode];

  // --- SKILL.md forming around the settled lines, then companions joining ---
  const showInstructionLines = frame >= schedule.stepsCompress.end;
  const panelOpacity = easedRange(
    frame,
    schedule.docChromeFade.start,
    schedule.docChromeFade.end,
    0,
    1,
  );

  const companionOpacities = COMPANION_LABELS.map((_, index) => {
    const entranceStart =
      schedule.companionsEntrance.start + index * COMPANION_ENTRANCE_STAGGER;
    return easedRange(frame, entranceStart, entranceStart + ENTRANCE_FRAMES, 0, 1);
  }) as [number, number, number];
  const companionTranslateY = COMPANION_LABELS.map((_, index) => {
    const entranceStart =
      schedule.companionsEntrance.start + index * COMPANION_ENTRANCE_STAGGER;
    return easedRange(frame, entranceStart, entranceStart + ENTRANCE_FRAMES, 24, 0);
  }) as [number, number, number];

  // --- The whole content group (steps-turned-lines + SKILL.md panel)
  //     collapses toward canvas center as the Skill folder forms around it. ---
  const contentGroupOpacity = easedRange(
    frame,
    schedule.folderForm.start,
    schedule.folderForm.end,
    1,
    0,
  );
  const contentGroupScale = easedRange(
    frame,
    schedule.folderForm.start,
    schedule.folderForm.end,
    1,
    0.3,
  );

  // --- The Skill folder itself: appears large enough to enclose the
  //     contents, then settles to the hero size the next scene expects. ---
  const folderOpacity = easedRange(
    frame,
    schedule.folderForm.start,
    schedule.folderForm.start + FOLDER_APPEAR_FRAMES,
    0,
    1,
  );
  const folderWidth = easedRange(
    frame,
    schedule.folderForm.start,
    schedule.folderForm.end,
    FOLDER_ENCLOSING_WIDTH,
    HERO_WIDTH,
  );
  const folderHeight = easedRange(
    frame,
    schedule.folderForm.start,
    schedule.folderForm.end,
    FOLDER_ENCLOSING_HEIGHT,
    HERO_HEIGHT,
  );
  const labelOpacity = easedRange(
    frame,
    schedule.heroLabelFade.start,
    schedule.heroLabelFade.end,
    0,
    1,
  );

  return (
    <AbsoluteFill style={{backgroundColor: COLORS.canvas}}>
      {/* Content group: the workflow steps (which become SKILL.md's first
          four instruction lines) plus the forming panel around them. */}
      <AbsoluteFill
        style={{
          opacity: contentGroupOpacity,
          transform: `scale(${contentGroupScale})`,
          transformOrigin: '50% 50%',
        }}
      >
        <WorkflowSteps nodes={stepNodes} connectorOpacity={connectorOpacity} />

        <div style={{left: PANEL_LEFT, position: 'absolute', top: PANEL_TOP}}>
          <SkillContentsPanel
            opacity={panelOpacity}
            showInstructionLines={showInstructionLines}
            companionOpacities={companionOpacities}
            companionTranslateY={companionTranslateY}
          />
        </div>
      </AbsoluteFill>

      {/* Skill folder layer: forms around the content group above, then
          settles into the exact hero size/position the next scene expects. */}
      <div
        style={{
          left: CANVAS_CENTER_X - folderWidth / 2,
          opacity: folderOpacity,
          position: 'absolute',
          top: CANVAS_CENTER_Y - folderHeight / 2,
        }}
      >
        <FolderGlyph
          width={folderWidth}
          height={folderHeight}
          fill={COLORS.primarySoft}
          tabFill={COLORS.primary}
          strokeColor={COLORS.primary}
        />
        <div
          style={{
            color: COLORS.ink,
            fontFamily: FONT_STACK,
            fontSize: 40,
            fontWeight: 700,
            left: 0,
            opacity: labelOpacity,
            position: 'absolute',
            textAlign: 'center',
            top: folderHeight + 14,
            width: folderWidth,
          }}
        >
          Skill
        </div>
      </div>
    </AbsoluteFill>
  );
};
