/**
 * Apply in PoC mode: the apply workflow with POC_MODE_GUIDANCE always on.
 * `/opsx:apply poc <change>` reaches the same behavior through apply's
 * argument, and both render getApplyInstructions(), so they cannot drift.
 */
import type { SkillTemplate, CommandTemplate } from '../types.js';
import { getApplyInstructions } from './apply-change.js';

export function getApplyPocSkillTemplate(): SkillTemplate {
  return {
    name: 'openspec-apply-poc',
    description: 'Implement tasks from an OpenSpec change in PoC mode - one bounded component at a time, contracts first, with an integration check after each part (Divide and Conquer). Use when the user wants to build a PoC or prototype from a change. Also use when the user says "openspec apply-poc", "opsx apply-poc", or "apply as PoC".',
    instructions: getApplyInstructions({ poc: 'always' }),
    license: 'MIT',
    compatibility: 'Requires openspec CLI.',
    metadata: { author: 'openspec', version: '1.0' },
  };
}

export function getOpsxApplyPocCommandTemplate(): CommandTemplate {
  return {
    name: 'OPSX: Apply PoC',
    description: 'Implement tasks from an OpenSpec change one component at a time (PoC mode)',
    category: 'Workflow',
    tags: ['workflow', 'artifacts', 'poc', 'experimental'],
    content: getApplyInstructions({ poc: 'always' }),
  };
}
