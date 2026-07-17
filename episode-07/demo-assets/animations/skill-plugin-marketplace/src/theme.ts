// Shared visual tokens for the production scene system.
//
// This is a light neutral editorial palette — calm, polished, lightly
// playful — distinct from the dark "Signal Path" palette explored in the
// prototype ("Prototype the neutral storyboard and motion system", issue
// #21). The production opening scene ("Build the Skill folder and SKILL.md
// reveal", issue #22) renders on a light canvas per its own visual brief, so
// later scenes should keep reading from these tokens rather than the
// prototype's dark ones.
export const COLORS = {
  canvas: '#f7f7f5',
  surface: '#ffffff',
  surfaceMuted: '#eef0f3',
  line: '#d8dce2',
  ink: '#242424',
  inkMuted: '#6b7280',
  primary: '#5b5fc7',
  primarySoft: '#e4e4f7',
  accent: '#2f9e8f',
  accentSoft: '#dff3f0',
  // A third, warm-neutral accent used only to keep multiple Marketplace
  // Plugin cards ("Build the Marketplace storefront and plugin catalog",
  // issue #24) visually distinct from one another and from Skill/Plugin's
  // existing primary/accent pairing, while staying inside the same calm,
  // lightly playful light-neutral palette.
  highlight: '#c9863f',
  highlightSoft: '#f5e4cf',
} as const;

export const FONT_STACK =
  '"Segoe UI Variable", "Segoe UI", Arial, sans-serif';
export const MONO_FONT_STACK =
  '"Cascadia Code", "Consolas", "Courier New", monospace';
