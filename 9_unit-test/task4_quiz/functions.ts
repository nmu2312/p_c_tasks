import fetch from 'node-fetch';

/**
 * 引数で与えられた数値の中から奇数を抽出して配列として返す関数。
 */
export const extractOddNumbers = (...numbers: number[]): number[] =>
  numbers.filter((n) => n % 2 === 1 || n % 2 === -1);

/**
 * 文が回文かどうか判定する関数。ひらがなで書かれた日本文と英文に対応。
 */
export const isPalindrome = (sentence: string): boolean => {
  const condensedSentence = sentence
    .toLowerCase()
    .replace(/\s|,|"|“|”|’|'|\.|!|\?|:|;|\-|—|\/|。|、|！|？|「|」/g, '');

  if (new RegExp(/^[a-zぁ-んー]*$/).test(condensedSentence)) {
    return (
      condensedSentence === condensedSentence.split('').reduce((a, b) => b + a)
    );
  } else {
    throw new Error(
      '許可されていない文字が含まれています。日本語の場合はカタカナ、漢字は使用しないでください。'
    );
  }
};

/**
 * 郵便番号から住所を生成する関数。外部のAPI使用
 * APIのドキュメント: http://zipcloud.ibsnet.co.jp/doc/api
 */
export const generateAddressFromZipcode = async (
  zipcode: string
): Promise<string> => {
  const data = await fetch(
    `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zipcode}&limit=1`
  ).then((response) => response.json());

  if (data.status !== 200) {
    throw new Error(data.message);
  }

  return (
    data.results[0].address1 +
    data.results[0].address2 +
    data.results[0].address3
  );
};
