import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import type { PipelineState } from './types';

const STATE_PATH = join(__dirname, 'state', 'last-seen-releases.json');

export function readState(): PipelineState {
  const raw = readFileSync(STATE_PATH, 'utf8');
  return JSON.parse(raw) as PipelineState;
}

export function writeState(state: PipelineState): void {
  writeFileSync(STATE_PATH, JSON.stringify(state, null, 2) + '\n', 'utf8');
}
