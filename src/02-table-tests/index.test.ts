// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 1, b: 2, action: Action.Multiply, expected: 2 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 4, b: 2, action: Action.Multiply, expected: 8 },
  { a: 2, b: 2, action: Action.Divide, expected: 1 },
  { a: 10, b: 2, action: Action.Divide, expected: 5 },
  { a: 14, b: 2, action: Action.Divide, expected: 7 },
  { a: 10, b: 2, action: Action.Exponentiate, expected: 100 },
  { a: 10, b: 3, action: Action.Exponentiate, expected: 1000 },
  { a: 10, b: 4, action: Action.Exponentiate, expected: 10000 },
  { a: 10, b: 2, action: Action.Subtract, expected: 8 },
  { a: 10, b: 3, action: Action.Subtract, expected: 7 },
  { a: 10, b: 4, action: Action.Subtract, expected: 6 },
  { a: 'incorrect', b: 4, action: Action.Subtract, expected: null },
  { a: 10, b: 4, action: 'incorrect', expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    `Should return expected result!`,
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
    30000,
  );

  // Consider to use Jest table tests API to test all cases above
});
