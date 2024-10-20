// Uncomment the code below and write your tests
import {  simpleCalculator, Action } from './index';

const testCases = [
    { a: 1, b: 2, action: Action.Add, expected: 3 },
    { a: 2, b: 2, action: Action.Add, expected: 4 },
    { a: 3, b: 2, action: Action.Add, expected: 5 },
    { a: 3, b: 2, action: Action.Subtract, expected: 1 },
    { a: 3, b: 2, action: Action.Multiply, expected: 6 },
    { a: 3, b: 2, action: Action.Divide, expected: 1.5 },
    { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
    { a: 3, b: 2, action: "&", expected: null },
    { a: 'F', b: '5', action: Action.Exponentiate, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)('should give a correct result', ({a, b, action, expected}) => {
    const result = simpleCalculator({a: a, b: b, action: action})
    expect(result).toBe(expected);
  });
});
