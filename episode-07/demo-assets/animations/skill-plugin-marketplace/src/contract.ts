// Shared composition contract for the Skill -> Plugin -> Marketplace animation.
// Both cuts render the same shared scene at these dimensions, frame rate, and
// silence; only the duration (and therefore the beat timing derived from it)
// differs between the modular and extended compositions.
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const FPS = 30;

export const COMPOSITION_ID_MODULAR = 'SkillPluginMarketplaceModular';
export const MODULAR_DURATION_IN_FRAMES = 1800; // 60s at 30fps

export const COMPOSITION_ID_EXTENDED = 'SkillPluginMarketplaceExtended';
export const EXTENDED_DURATION_IN_FRAMES = 2700; // 90s at 30fps
