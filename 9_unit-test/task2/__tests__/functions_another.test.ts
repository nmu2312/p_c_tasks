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

  test('[異常系]一引数が空の配列の場合はゼロを返す', async () => {
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

describe('getFirstNameThrowIfLong()　パターン１：コンストラクタ(ES&クラス)のメソッドにモックを実装する', () => {
  let mockedNameApiService: NameApiService;
  beforeAll(() => {
    /** OK CODE
     *  jest.spyOnを使ってコンストラクタ(ES6クラス)の指定したメソッドにモックを実装
     * 例
     * https://jestjs.io/ja/docs/jest-object#jestspyonobject-methodname
     * https://qiita.com/yuma-ito-bd/items/38c929eb5cccf7ce501e#%E3%82%AF%E3%83%A9%E3%82%B9%E3%81%AE%E4%B8%80%E9%83%A8%E3%81%A0%E3%81%91%E3%83%A2%E3%83%83%E3%82%AF%E3%81%AB%E3%81%97%E3%81%9F%E3%81%84
     * */
    jest
      .spyOn(NameApiService.prototype, 'getFirstName')
      .mockResolvedValue('Jack');
    mockedNameApiService = new NameApiService();

    /** NG CODE
     * オブジェクト形式でコンストラクタのメソッドのモックを定義する方法
     * オブジェクトの構成をコンストラクタのメンバと一致させる必要があるため、コンストラクタにprivateのメンバがある場合は型エラーを回避することができない。
     * 例
     * https://jestjs.io/ja/docs/es6-class-mocks#mockimplementation-%E3%81%BE%E3%81%9F%E3%81%AF-mockimplementationonce-%E3%82%92%E4%BD%BF%E7%94%A8%E3%81%97%E3%81%9F%E3%83%A2%E3%83%83%E3%82%AF%E3%82%92%E7%BD%AE%E3%81%8D%E6%8F%9B%E3%81%88%E3%82%8B
     * https://qiita.com/yuma-ito-bd/items/38c929eb5cccf7ce501e#%E3%82%AF%E3%83%A9%E3%82%B9%E4%B8%B8%E3%81%94%E3%81%A8%E3%83%A2%E3%83%83%E3%82%AF%E3%81%AB%E3%81%97%E3%81%9F%E3%81%84
     */
    // mocked(NameApiService).mockImplementation(() => {
    //   return {
    //     getFirstName: () => {
    //       return Promise.resolve('Jack');
    //     },
    //     MAX_LENGTH: 4 //本来privateでなければならないメンバのためこれが書いてあってもなくても型エラーになる
    //   };
    // });
    // mockedNameApiServce = new NameApiService();
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

describe('getFirstNameThrowIfLong()　パターン２：インスタンスのメソッドにモックを実装する', () => {
  let mockedNameApiService: MockedObjectDeep<NameApiService>;
  beforeAll(() => {
    /** OK CODE */
    mockedNameApiService = mocked(new NameApiService(), true);
    mockedNameApiService.getFirstName.mockResolvedValue('Jack');
    // /* or */ mockedNameApiService.getFirstName.mockReturnValue(Promise.resolve('Jack'));
    // /* or */ mockedNameApiService.getFirstName.mockImplementation(() =>
    //            Promise.resolve('Jack')
    //          );

    /** NG CODE
     * パターン１にあるようにコンストラクタ(ES6クラス)にはmockImplementationができたが、
     * インスタンスにはmockImplementationすることはできない
     */
    // mockedNameApiService = mocked(new NameApiService(), true);
    // mocked(mockedNameApiService, true).mockImplementation(() => {
    //   return {
    //     getFirstName: () => {
    //       return Promise.resolve('Jack');
    //     },
    //   };
    // });
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
