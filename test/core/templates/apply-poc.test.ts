import { describe, expect, it } from 'vitest';

import {
  getApplyChangeSkillTemplate,
  getApplyInstructions,
  getApplyPocSkillTemplate,
  getOpsxApplyPocCommandTemplate,
} from '../../../src/core/templates/skill-templates.js';
import { POC_MODE_GUIDANCE } from '../../../src/core/templates/workflows/poc-mode.js';

describe('apply PoC mode', () => {
  it('always enables PoC mode on /opsx:apply-poc', () => {
    for (const body of [
      getApplyPocSkillTemplate().instructions,
      getOpsxApplyPocCommandTemplate().content,
    ]) {
      expect(body).toContain(POC_MODE_GUIDANCE);
      expect(body).toContain('Always on for this workflow');
      expect(body).not.toContain('/opsx:apply ');
    }
  });

  it('enables PoC mode on /opsx:apply only through the poc argument', () => {
    const body = getApplyChangeSkillTemplate().instructions;
    expect(body).toContain(POC_MODE_GUIDANCE);
    expect(body).toContain('If the first argument is the literal word `poc`');
    expect(body).toContain('## PoC mode (only when enabled)');
    expect(body).not.toContain('/opsx:apply-poc');
  });

  it('forbids git and asks before moving files to assessment/ on every entry point', () => {
    for (const body of [
      getApplyPocSkillTemplate().instructions,
      getOpsxApplyPocCommandTemplate().content,
      getApplyChangeSkillTemplate().instructions,
    ]) {
      expect(body).toContain('Do not run any git command');
      expect(body).toContain('`assessment/`');
      expect(body).toContain('Ask first and wait for the answer');
    }
  });

  it('shares the same apply steps across both entry points', () => {
    const stepsOf = (body: string) => body.slice(body.indexOf('**Steps**'), body.indexOf('## PoC mode'));
    expect(stepsOf(getApplyInstructions({ poc: 'always' })).replaceAll('/opsx:apply-poc', '/opsx:apply'))
      .toBe(stepsOf(getApplyInstructions()));
  });
});
