import {
  sumOfArray,
  asyncSumOfArray,
  asyncSumOfArraySometimesZero,
  getFirstNameThrowIfLong,
} from '../functions';
import { DatabaseMock } from '../util/index';
import { NameApiService } from '../nameApiService';
import { mocked } from 'ts-jest/utils';
import { MockedObjectDeep } from 'ts-jest/dist/utils/testing';
jest.mock('../util/index');
jest.mock('../nameApiService');

describe('sumOfArray()', () => {
  test.each([
    [[1, 1], 2],
    [[1, 2, 3], 6],
    [[1, -2, 3, -3], -1],
  ])(
    '[正常系]第一引数の配列内の数字を合計して返す. %j => %d',
    (numbers, expected) => {
      expect(sumOfArray(numbers)).toBe(expected);
    }
  );

  test.each([
    [[0.1, 0.4], 0.5],
    [[1, 0.05, -1.08], -0.03],
  ])(
    '[正常系]第一引数の配列内の数字(小数含む)を合計して返す. %j => %d',
    (numbers, expected) => {
      expect(sumOfArray(numbers)).toBeCloseTo(expected);
    }
  );

  /** Modified for task 3 */
  // test('throws an error if its argument is an empty array', () => {
  //   expect(() => sumOfArray([])).toThrow();
  // });
  test('[異常系]第一引数が空の配列の場合はゼロを返す', () => {
    expect(sumOfArray([])).toBe(0);
  });
});

describe('asyncSumOfArray()', () => {
  test('[正常系]第一引数の配列内の数字を合計して返す', async () => {
    expect(await asyncSumOfArray([1, 2, 3])).toBe(6);
    expect(await asyncSumOfArray([1, 2, 3, 4])).toBe(10);
  });
  test('[異常系]第一引数が空の配列の場合はゼロを返す', async () => {
    expect(await asyncSumOfArray([])).toBe(0);
  });
});

describe('asyncSumOfArraySometimesZero()', () => {
  afterEach(() => {
    mocked(DatabaseMock).mockClear();
  });

  test('[異常系]第一引数が空の配列の場合はゼロを返す', async () => {
    const mockedDatabaseMock: MockedObjectDeep<DatabaseMock> = mocked(
      new DatabaseMock(),
      true
    );
    mockedDatabaseMock.save.mockImplementation(() => {});
    expect(await asyncSumOfArraySometimesZero([], mockedDatabaseMock)).toBe(0);
  });

  test('[異常系]Database.saveメソッドが失敗した場合にゼロを返す', async () => {
    const mockedDatabaseMock = mocked(new DatabaseMock(), true);
    mockedDatabaseMock.save.mockImplementation(() => {
      throw new Error('fail!');
    });

    expect(
      await asyncSumOfArraySometimesZero([1, 2, 3], mockedDatabaseMock)
    ).toBe(0);
  });

  test('[正常系]Database.save成功した場合、第一引数の配列の数字を合計した値を返す', async () => {
    const mockedDatabaseMock = mocked(new DatabaseMock(), true);
    mockedDatabaseMock.save.mockImplementation(() => {});
    expect(
      await asyncSumOfArraySometimesZero([1, 2, 3], mockedDatabaseMock)
    ).toBe(6);
  });
});

describe('getFirstNameThrowIfLong()', () => {
  let mockedNameApiService: MockedObjectDeep<NameApiService>;
  // let nameApiService: NameApiService;
  beforeAll(() => {
    mockedNameApiService = mocked(new NameApiService(), true);
    mockedNameApiService.getFirstName.mockResolvedValue('Jack');

    // nameApiService = new NameApiService();
    // mocked(nameApiService.getFirstName, true).mockResolvedValue('Jack');
  });

  test('[正常系]APIから取得した文字列の長さ<=第一引数の数値 の場合にAPIから取得した文字列を返す', async () => {
    expect(await getFirstNameThrowIfLong(4, mockedNameApiService)).toBe('Jack');
    expect(await getFirstNameThrowIfLong(80, mockedNameApiService)).toBe(
      'Jack'
    );
  });

  test('[異常系]APIから取得した文字列の長さ>第一引数の数値 の場合にエラーを投げる', () => {
    expect(
      async () => await getFirstNameThrowIfLong(1, mockedNameApiService)
    ).rejects.toThrow('first_name too long');
    expect(
      async () => await getFirstNameThrowIfLong(3, mockedNameApiService)
    ).rejects.toThrow('first_name too long');
  });
});
