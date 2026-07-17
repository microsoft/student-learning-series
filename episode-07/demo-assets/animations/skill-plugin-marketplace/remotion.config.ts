import fs from 'node:fs';
import {Config} from '@remotion/cli/config';

Config.setCodec('h264');
Config.setMuted(true);
Config.setPixelFormat('yuv420p');
Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);

// The bundled chrome-headless-shell binary lives under this worktree's deep
// `copilot-worktrees\...` path, which exceeds Windows' legacy MAX_PATH
// (260 chars) and fails to spawn (ENOENT / 0xfffffffe) even though the file
// exists. Fall back to the system Edge install (a short, stable path) so
// rendering still works from this worktree location.
const EDGE_CANDIDATES = [
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
];
const edgePath = EDGE_CANDIDATES.find((candidate) => fs.existsSync(candidate));
if (edgePath) {
  Config.setBrowserExecutable(edgePath);
}
