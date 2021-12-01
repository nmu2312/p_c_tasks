/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { mocked } from 'ts-jest/utils';
import axios from 'axios';
import { isZipCode, printFortune, getPerson, Person } from '../functions';
import { mockRandom } from 'jest-mock-random';
jest.mock('axios');

describe('isZipCode()', () => {
  beforeAll(() => {
    mocked(axios.get).mockResolvedValue({ data: { results: { foo: 'bar' } } });
  });
  describe('[正常系]正しい形式の郵便番号が与えられた際にtrueを返す', () => {
    test.each(['111-1111', '000-0000', '501-1111'])('第一引数：”%s”', async (str) => {
      expect(await isZipCode(str)).toBe(true);
    });
  });
  describe('[異常系]正しい形式の郵便番号でない文字列が与えられた際にfalseを返す', () => {
    test.each(['hello', '1112222'])('第一引数：”%s”', async (str) => {
      expect(await isZipCode(str)).toBe(false);
    });
  });
  afterAll(() => {
    mocked(axios.get).mockClear();
  });
});

describe('printFortune()', () => {
  let mockConsoleLog: jest.SpyInstance;
  beforeAll(() => {
    mockRandom([...Array(4).keys()].map((n) => n / 4));
    mockConsoleLog = jest.spyOn(console, 'log');
    mockConsoleLog.mockImplementation((arg: string) => arg);
  });
  describe('[正常系]4種類の結果の中から１つをランダムにログに出力する', () => {
    test.each(['大吉', '吉', '中吉', '凶'])('結果：”%s”', (expected) => {
      printFortune();
      expect(console.log).toHaveReturnedWith(expected);
    });
  });
  afterAll(() => {
    mockConsoleLog.mockRestore();
  });
});

describe('class Person', () => {
  const age = 20;
  const firstName = 'Taro';
  const lastName = 'Yamada';
  let person: Person;
  beforeEach(() => {
    person = new Person(age, firstName, lastName);
  });
  test('get age', () => {
    expect(person.age).toBe(20);
  });
  describe('set age', () => {
    test('[正常系]age=21 を設定', () => {
      person.age = 21;
      expect(person.age).toBe(21);
    });
    test.each([0, 200])('[異常系]age=%d でエラーになる', (n) => {
      expect(() => {
        person.age = n;
      }).toThrow('The age is invalid');
    });
  });
  test('get fullName', () => {
    expect(person.getFullName()).toBe(`${firstName} ${lastName}`);
  });
});

describe('getPerson()', () => {
  const age = 20;
  const firstName = 'Taro';
  const lastName = 'Yamada';
  let person: Person;
  beforeAll(() => {
    // eslint-disable-next-line @typescript-eslint/camelcase
    mocked(axios.get).mockResolvedValue({ data: { first_name: firstName, last_name: lastName } });
    person = new Person(age, firstName, lastName);
  });
  test('[正常系]第一引数に年齢の数値を入れると、APIから取得した姓名を持つPersonクラスのインスタンスを返す', async () => {
    expect(await getPerson(age)).toStrictEqual(person);
  });
  afterAll(() => {
    mocked(axios.get).mockClear();
  });
});
