//example tests made by n.m.
import {
  extractOddNumbers,
  isPalindrome,
  generateAddressFromZipcode,
} from '../functions';
import fetch from 'node-fetch';
import { mocked } from 'ts-jest/utils';
jest.mock('node-fetch');
const { Response } = jest.requireActual('node-fetch');

describe('extractOddNumbers()', () => {
  test('works with natural numbers', () => {
    expect(extractOddNumbers(0, 1, 3, 4, 107, 200)).toStrictEqual([1, 3, 107]);
    expect(extractOddNumbers(2, 4, 6, 8)).toStrictEqual([]);
  });

  test('works with negative numbers included', () => {
    const nums = [-7, -6, 8, 8379];
    expect(extractOddNumbers(...nums)).toStrictEqual([-7, 8379]);
  });

  test('works with floating point numbers included', () => {
    expect(extractOddNumbers(0.01, 0.8, 3)).toStrictEqual([3]);
  });
});

describe('isPalindrome()', () => {
  test('works with a Hiragana sentence', () => {
    expect(isPalindrome('よわいわよ、はんしんはよわいわよ。')).toBe(true);
    expect(isPalindrome('よわいわよーはんしんはよわいわよ。')).toBe(false);
    expect(isPalindrome('るーる')).toBe(true);
    expect(isPalindrome('「よわいわよ！！」　はんしんはよわいわよ？')).toBe(
      true
    );
    expect(isPalindrome('いまうんどうかい、すいか、うどん、うまい')).toBe(true);
    expect(isPalindrome('わがはいは、ねこである')).toBe(false);
  });

  test('works with an English sentence', () => {
    expect(isPalindrome('I am the walrus.')).toBe(false);
    expect(isPalindrome('Was it a car or a cat I saw?')).toBe(true);
    expect(isPalindrome('Was it a car or a cat I just saw?')).toBe(false);
    expect(
      isPalindrome(';W-a-s i-t //a "c-a-r" o-r   a c-a-t I s-a-w!?:;')
    ).toBe(true);
    expect(
      isPalindrome(
        'Are we not pure? “No, sir!” Panama’s moody Noriega brags. “It is garbage!” Irony dooms a man—a prisoner up to new era.'
      )
    ).toBe(true);
  });

  test('throws an error if the sentence includes unpermitted letters such as katakana or kanji', () => {
    const errorMessage =
      '許可されていない文字が含まれています。日本語の場合はカタカナ、漢字は使用しないでください。';

    expect(() => isPalindrome('トマト')).toThrow(errorMessage);
    expect(() => isPalindrome('弱いわよ、阪神は弱いわよ')).toThrow(
      errorMessage
    );
  });
});

describe('generateAddressFromZipcode()', () => {
  const mockFetchedData = {
    message: null,
    results: [
      {
        address1: '北海道',
        address2: '美唄市',
        address3: '上美唄町協和',
        kana1: 'ﾎｯｶｲﾄﾞｳ',
        kana2: 'ﾋﾞﾊﾞｲｼ',
        kana3: 'ｶﾐﾋﾞﾊﾞｲﾁｮｳｷｮｳﾜ',
        prefcode: '1',
        zipcode: '0790177',
      },
    ],
    status: 200,
  };

  const addressToReturn =
    mockFetchedData.results[0].address1 +
    mockFetchedData.results[0].address2 +
    mockFetchedData.results[0].address3;

  afterEach(() => {
    mocked(fetch).mockClear();
  });

  test('works with a zipcode without "-"', async () => {
    mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify(mockFetchedData))
    );
    expect(await generateAddressFromZipcode('0790177')).toBe(addressToReturn);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test('works with a zipcode with "-"', async () => {
    mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify(mockFetchedData))
    );
    expect(await generateAddressFromZipcode('079-0177')).toBe(addressToReturn);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test('throws an error if the url is given an invalid parameter', () => {
    const mockLameFetchedData = {
      message: 'パラメータ「郵便番号」の桁数が不正です。',
      results: null,
      status: 400,
    };
    mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify(mockLameFetchedData))
    );
    expect(
      async () => await generateAddressFromZipcode('123456678')
    ).rejects.toThrow(mockLameFetchedData.message);
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
