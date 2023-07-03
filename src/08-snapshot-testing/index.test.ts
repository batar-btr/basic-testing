// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  const expectedList = {
    next: {
      next: {
        next: {
          next: null,
          value: null,
        },
        value: 3,
      },
      value: 2,
    },
    value: 1,
  };

  test('should generate linked list from values 1', () => {
    expect(generateLinkedList([1, 2, 3])).toStrictEqual(expectedList);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    expect(generateLinkedList([1, 2, 3])).toMatchSnapshot();
  });
});
