import { describe, it, expect } from 'vitest';
import { toFils, splitEqually } from '../src/lib/money';

describe('money', () => {
  it('converts dinars to fils', () => {
    expect(toFils(45)).toBe(45000);
    expect(toFils(0.1 + 0.2)).toBe(300);
  });

  it('splits equally and always sums to the total', () => {
    expect(splitEqually(10000, 3)).toEqual([3334, 3333, 3333]);
    expect(splitEqually(10000, 4)).toEqual([2500, 2500, 2500, 2500]);
    const parts = splitEqually(12345, 7);
    expect(parts.reduce((a, b) => a + b, 0)).toBe(12345);
  });

  it('throws on invalid input', () => {
    expect(() => splitEqually(100, 0)).toThrow();
  });
});