import { describe, expect, test } from 'vitest';
import Command from '../Command';

describe('constructor', () => {
  test('Should create with command and vars', () => {
    const cmd = new Command('t', 4022, 50, 'F');
    expect(cmd.command).toBe('t');
    expect(cmd.vars).toEqual([4022, 50, 'F']);
  });
});

describe('nativeCommand', () => {
  test('Should return correct native command string', () => {
    const cmd = new Command('t', 4022, 50, 'F');
    expect(cmd.nativeCommand).toBe('<t 4022 50 F>\n');
  });
});

describe('htmlCommand', () => {
  test('Should return correct html command string', () => {
    const cmd = new Command('t', 4022, 50, 'F');
    expect(cmd.htmlCommand).toBe('&lt;t 4022 50 F&gt;');
  });
});

describe('toString', () => {
  test('Should return correct string representation', () => {
    const cmd = new Command('t', 4022, 50, 'F');
    expect(cmd.toString()).toBe('Command: t 4022 50 F');
  });
});
