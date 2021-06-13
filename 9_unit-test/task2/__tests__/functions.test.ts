import {
  sumOfArray,
  asyncSumOfArray,
  asyncSumOfArraySometimesZero,
  getFirstNameThrowIfLong,
} from '../functions';
import { DatabaseMock } from '../util/index';
import { NameApiService } from '../nameApiService';
jest.mock('../util/index');
jest.mock('../nameApiService');
const MockedDatabaseMock = DatabaseMock as jest.MockedClass<
  typeof DatabaseMock
>;
const MockedNameApiServie = NameApiService as jest.Mock;

describe('sumOfArray()', () => {
  test('sums up numbers in the array in the argument', () => {
    expect(sumOfArray([1, 1])).toBe(2);
    expect(sumOfArray([1, 2, 3])).toBe(6);
    expect(sumOfArray([1, -2, 3, -3])).toBe(-1);
    expect(sumOfArray([0.1, 0.4])).toBeCloseTo(0.5);
  });

  /** Modified for task 3 */
  // test('throws an error if its argument is an empty array', () => {
  //   expect.assertions(1);
  //   expect(() => sumOfArray([])).toThrow();
  // });
  test('returns 0 if its argument is an empty array', () => {
    expect(sumOfArray([])).toBe(0);
  });
});

describe('asyncSumOfArray()', () => {
  test('sums numbers in the array given as the first argument', async () => {
    expect(await asyncSumOfArray([1, 2, 3])).toBe(6);
    expect(await asyncSumOfArray([1, 2, 3, 4])).toBe(10);
  });
  test('returns 0 if its argument is an empty array', async () => {
    expect(await asyncSumOfArray([])).toBe(0);
  });
});

describe('asyncSumOfArraySometimesZero()', () => {
  beforeEach(() => {
    MockedDatabaseMock.mockClear();
  });

  test('returns 0 if its argument is an empty array', async () => {
    expect(
      await asyncSumOfArraySometimesZero([], new MockedDatabaseMock())
    ).toBe(0);
  });

  test('returns zero if Databse.save method throws an error', async () => {
    MockedDatabaseMock.mockImplementation(() => {
      return {
        save: () => {
          throw new Error('fail!');
        },
      };
    });
    expect(
      await asyncSumOfArraySometimesZero([1, 2, 3], new MockedDatabaseMock())
    ).toBe(0);
  });

  test('sums up numbers if Database.save method succeeds', async () => {
    MockedDatabaseMock.mockImplementation(() => {
      return {
        save: () => {},
      };
    });
    expect(
      await asyncSumOfArraySometimesZero([1, 2, 3], new MockedDatabaseMock())
    ).toBe(6);
  });
});

describe('getFirstNameThrowIfLong()', () => {
  beforeAll(() => {
    MockedNameApiServie.mockImplementation(() => {
      return {
        getFirstName: () => {
          return 'Jack';
        },
      };
    });
  });

  test("returns a string when the string's length is less than or equal to the number in the first argument", async () => {
    expect(await getFirstNameThrowIfLong(4, new MockedNameApiServie())).toBe(
      'Jack'
    );
    expect(await getFirstNameThrowIfLong(80, new MockedNameApiServie())).toBe(
      'Jack'
    );
  });

  test("throws an error when the fetched string's length exceeds the number in the first argument", () => {
    expect(
      async () => await getFirstNameThrowIfLong(1, new MockedNameApiServie())
    ).rejects.toThrow('first_name too long');
    expect(
      async () => await getFirstNameThrowIfLong(3, new MockedNameApiServie())
    ).rejects.toThrow('first_name too long');
  });
});
