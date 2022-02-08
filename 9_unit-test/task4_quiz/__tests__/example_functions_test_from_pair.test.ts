// ペアからの回答
import {
  extractOddNumbers,
  isPalindrome,
  generateAddressFromZipcode,
} from '../functions';
import fetch from 'node-fetch';
jest.mock('node-fetch');
const { Response } = jest.requireActual('node-fetch');

describe('extractOddNumbers', () => {
  it('奇数のみを返すこと', () => {
    expect(extractOddNumbers(...[-2, -1, 0, 1, 2])).toStrictEqual([-1, 1])
  })

  it('少数を含む場合、整数の奇数のみを返すこと', () => {
    expect(extractOddNumbers(...[1.1, 2, 3.1, 4, 5])).toStrictEqual([5])
  })

  it('空配列を渡した場合、空配列を返すこと', () => {
    expect(extractOddNumbers(...[])).toStrictEqual([])
  })
})

describe('isPalindrom', () => {
  // 日本語
  it('ひらがなのみ、回文の場合、trueを返すこと', () => {
    expect(isPalindrome('たけやぶやけた')).toStrictEqual(true)
  })
  it('ひらがなのみ、回文ではない場合、falseを返すこと', () => {
    expect(isPalindrome('あいうえお')).toStrictEqual(false)
  })
  it('ひらがな以外が含まれる場合、例外が発生すること', () => {
    expect(() => { isPalindrome('竹藪焼ケタ') }).toThrow('許可されていない文字が含まれています。日本語の場合はカタカナ、漢字は使用しないでください。')
  })

  // 英語
  it('回文の場合、trueを返すこと', () => {
    expect(isPalindrome('Was it a cat I saw')).toStrictEqual(true)
  })
  it('回文じゃない場合、falseを返すこと', () => {
    expect(isPalindrome('I saw a cat')).toStrictEqual(false)
  })

  // 日本語、英語以外
  it('日本語と英語以外の場合、例外が発生すること', () => {
    expect(() => { isPalindrome('Борщ') }).toThrow('許可されていない文字が含まれています。日本語の場合はカタカナ、漢字は使用しないでください。')
  })

  it.skip('空文字の場合', () => {
    expect(isPalindrome('')).toStrictEqual(true)
  })
})

describe('generateAddressFromZipcode', () => {
  beforeEach(() => {
    (fetch as jest.MockedFunction<typeof fetch>).mockClear()
  })

  // 正常値
  it('ハイフン有りの場合、正しい住所を取得できること', async () => {
    (fetch as jest.MockedFunction<typeof fetch>)
      .mockResolvedValue(
        new Response(
          JSON.stringify({
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
          })
        )
      )

    expect(await generateAddressFromZipcode('0790177')).toBe("北海道美唄市上美唄町協和");
    expect(fetch).toHaveBeenCalledTimes(1);
  })
  it('ハイフン無しの場合、正しい住所を取得できること', async () => {
    (fetch as jest.MockedFunction<typeof fetch>)
      .mockResolvedValue(
        new Response(
          JSON.stringify({
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
          })
        )
      )

    expect(await generateAddressFromZipcode('079-0177')).toBe("北海道美唄市上美唄町協和");
    expect(fetch).toHaveBeenCalledTimes(1);
  })

  // 異常値
  it('200以外のステータスコードの場合、エラーが発生すること', async () => {
    (fetch as jest.MockedFunction<typeof fetch>).mockReturnValue(
      Promise.resolve(new Response(JSON.stringify({
        message: 'パラメータ「郵便番号」の桁数が不正です。',
        results: null,
        status: 400,
      })))
    )
    expect(
      async () => await generateAddressFromZipcode('aaaaa')
    ).rejects.toThrow('パラメータ「郵便番号」の桁数が不正です。');
    expect(fetch).toHaveBeenCalledTimes(1);
  })
})
