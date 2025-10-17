import { describe, expect, test } from 'vitest';
import LimitedArray from '../LimitedArray';

describe('LimitedArray constructor', () => {
  test('Should create with a limit and initial elements', () => {
    const arr = new LimitedArray(3, 1, 2);
    expect(arr.length).toBe(2);
    expect(arr[0]).toBe(1);
    expect(arr[1]).toBe(2);
  });

  test('Should trim initial elements to the limit', () => {
    const arr = new LimitedArray(2, 1, 2, 3, 4);
    expect(arr.length).toBe(2);
    expect(arr[0]).toBe(3);
    expect(arr[1]).toBe(4);
  });
});

describe('LimitedArray.push', () => {
  test('should add elements when limit is not hit', () => {
    const arr = new LimitedArray(5, 1, 2);
    expect(arr.push(3)).toBe(3);
    expect(arr.length).toBe(3);
    expect(arr[0]).toBe(1);
    expect(arr[1]).toBe(2);
    expect(arr[2]).toBe(3);
  });

  test('should trim elements when limit is exceeded', () => {
    const arr = new LimitedArray(2, 1, 2);
    arr.push(3);
    expect(arr.length).toBe(2);
    expect(arr[0]).toBe(2);
    expect(arr[1]).toBe(3);
  });
});

describe('LimitedArray.unshift', () => {
  test('should add elements when limit is not hit', () => {
    const arr = new LimitedArray(4, 2, 3);
    expect(arr.unshift(1)).toBe(3);
    expect(arr.length).toBe(3);
    expect(arr[0]).toBe(1);
    expect(arr[1]).toBe(2);
    expect(arr[2]).toBe(3);
  });

  test('should trim elements when limit is exceeded', () => {
    const arr = new LimitedArray(2, 2, 3);
    arr.unshift(1);
    expect(arr.length).toBe(2);
    expect(arr[0]).toBe(1);
    expect(arr[1]).toBe(2);
  });
});
