// Centralized timing/motion helpers shared by every production scene.
//
// The frame constants below (entrance, morph, label-fade, hold) come from
// the motion grammar locked in "Prototype the neutral storyboard and motion
// system" (issue #21): 18f entrances, 24f morphs, 12f label fades, and a
// closing hold, all eased with the same no-bounce cubic-bezier curve. Reusing
// them here keeps every scene ticket (this one and later ones) speaking the
// same motion vocabulary instead of inventing new easing per scene.
import {Easing, interpolate} from 'remotion';

// cubic-bezier(0.16, 1, 0.3, 1) — eases out, no bounce or overshoot.
export const EASE_OUT = Easing.bezier(0.16, 1, 0.3, 1);

export const ENTRANCE_FRAMES = 18;
export const MORPH_FRAMES = 24;
export const LABEL_FADE_FRAMES = 12;
export const MIN_HOLD_FRAMES = 54;

/**
 * Eased interpolation over an explicit [from, to] frame window, clamped
 * outside that window. A thin wrapper so scenes don't re-specify the easing
 * curve and clamp behavior at every call site.
 */
export const easedRange = (
  frame: number,
  fromFrame: number,
  toFrame: number,
  fromValue: number,
  toValue: number,
): number => {
  if (toFrame <= fromFrame) {
    return frame >= toFrame ? toValue : fromValue;
  }

  return interpolate(frame, [fromFrame, toFrame], [fromValue, toValue], {
    easing: EASE_OUT,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
};

const hexToRgb = (hex: string): [number, number, number] => {
  const normalized = hex.replace('#', '');
  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);
  return [r, g, b];
};

/**
 * Eased interpolation between two `#rrggbb` colors over an explicit
 * [from, to] frame window, clamped outside that window. Used where a shape
 * itself needs to recolor mid-morph (e.g. a workflow step node fading from
 * its solid entrance fill to the softer tone of the instruction line it
 * becomes) rather than cross-fading two separately-colored elements.
 */
export const easedColor = (
  frame: number,
  fromFrame: number,
  toFrame: number,
  fromColor: string,
  toColor: string,
): string => {
  const [fr, fg, fb] = hexToRgb(fromColor);
  const [tr, tg, tb] = hexToRgb(toColor);
  const r = Math.round(easedRange(frame, fromFrame, toFrame, fr, tr));
  const g = Math.round(easedRange(frame, fromFrame, toFrame, fg, tg));
  const b = Math.round(easedRange(frame, fromFrame, toFrame, fb, tb));
  return `rgb(${r}, ${g}, ${b})`;
};

export type ScheduleSegment =
  | {name: string; kind: 'fixed'; frames: number}
  | {name: string; kind: 'flex'; weight: number};

export type ScheduledSegment = {
  name: string;
  start: number;
  end: number;
  frames: number;
};

/**
 * Lays out a named sequence of segments across a total frame budget.
 * `fixed` segments always take their exact frame count (the motion-grammar
 * beats above); `flex` segments split whatever frames remain, proportional
 * to their weight. Because the remainder grows with the total duration, flex
 * segments (holds, reading time) naturally breathe longer on longer cuts
 * without the fixed motion beats changing pace — this is what makes a scene
 * "duration-aware" without hand-tuning two separate timings per cut.
 */
export const buildSchedule = (
  totalFrames: number,
  segments: ScheduleSegment[],
): Record<string, ScheduledSegment> => {
  const fixedFrames = segments.reduce(
    (sum, segment) => sum + (segment.kind === 'fixed' ? segment.frames : 0),
    0,
  );
  const flexWeightTotal = segments.reduce(
    (sum, segment) => sum + (segment.kind === 'flex' ? segment.weight : 0),
    0,
  );
  const flexFrameBudget = Math.max(totalFrames - fixedFrames, 0);

  const result: Record<string, ScheduledSegment> = {};
  let cursor = 0;

  for (const segment of segments) {
    const frames =
      segment.kind === 'fixed'
        ? segment.frames
        : Math.round(
            flexWeightTotal > 0
              ? (segment.weight / flexWeightTotal) * flexFrameBudget
              : 0,
          );
    result[segment.name] = {
      name: segment.name,
      start: cursor,
      end: cursor + frames,
      frames,
    };
    cursor += frames;
  }

  return result;
};
