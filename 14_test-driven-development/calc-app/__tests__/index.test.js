import { add, substract, multiply, devide } from '../index';

describe('add', () => {
  describe('[正常系]引数の数字を足して返す', () => {
    test('引数に1を渡したら1が返ってくる', () => {
      expect(add(1)).toBe(1);
    });
    test('引数に1と2を渡したら3が返ってくる', () => {
      expect(add(1, 2)).toBe(3);
    });
  });

  describe('[正常系]計算結果が1000を超える場合、too bigと文字列が返る', () => {
    test('引数に1000と0.001を渡すと文字列too bigが返ってくる', () => {
      expect(add(1000, 1)).toBe('too big');
    });
  });

  describe('[正常系]1~30個までの引数を受け取ることができる', () => {
    test('引数が1x31個のときエラーが発生する', () => {
      expect(() => add(...Array(31).fill(1))).toThrow();
    });
    test('引数が0個のときエラーが発生する', () => {
      expect(() => add()).toThrow();
    });
  });

  describe('[異常系]引数が数字意外だとエラーが発生する', () => {
    test('文字列"1"を渡すとエラーが発生する', () => {
      expect(() => add('1')).toThrow();
    });
    test('配列[1, 2]を渡すとエラーが発生する', () => {
      expect(() => add([1, 2])).toThrow();
    });
  });
});

describe('substract', () => {
  describe('[正常系] 引数の数字を引いて返す', () => {
    test('引数に2と1を渡したら1が返ってくる', () => {
      expect(substract(2, 1)).toBe(1);
    });
    test('引数に2と-1を渡したら1が返ってくる', () => {
      expect(substract(2, -1)).toBe(3);
    });
  });
  describe('[正常系] 計算結果がマイナスの場合はnegative numberと文字列が返る', () => {
    test('引数に1と2を渡すとnegative numberと文字列が返る', () => {
      expect(substract(1, 2)).toBe('negative number');
    });
    test('引数に1000と0.0001を渡すとnegative numberと文字列が返る', () => {
      expect(substract(0, 0.0001)).toBe('negative number');
    });
  });

  describe('[正常系]1~30個までの引数を受け取ることができる', () => {
    test('引数が1x31個のときエラーが発生する', () => {
      expect(() => substract(...Array(31).fill(1))).toThrow();
    });
    test('引数が0個のときエラーが発生する', () => {
      expect(() => substract()).toThrow();
    });
  });

  describe('[異常系]引数が数字意外だとエラーが発生する', () => {
    test('文字列"1"を渡すとエラーが発生する', () => {
      expect(() => substract('1')).toThrow();
    });
    test('配列[1, 2]を渡すとエラーが発生する', () => {
      expect(() => substract([1, 2])).toThrow();
    });
  });
});

describe('multiply', () => {
  describe('[正常系] 引数の数字を掛け算して返す', () => {
    test('引数に2と1を渡したら6が返ってくる', () => {
      expect(multiply(2, 3)).toBe(6);
    });
  });
  describe('[正常系] 計算結果が1000を超える場合はbig big numberが返ってくる', () => {
    test('引数に1000と1.000001を渡すとbig big numberが返ってくる', () => {
      expect(multiply(1000, 1.000001)).toBe('big big number');
    });
  });

  describe('[正常系]1~30個までの引数を受け取ることができる', () => {
    test('引数が1x31個のときエラーが発生する', () => {
      expect(() => multiply(...Array(31).fill(1))).toThrow();
    });
    test('引数が0個のときエラーが発生する', () => {
      expect(() => multiply()).toThrow();
    });
  });

  describe('[異常系]引数が数字意外だとエラーが発生する', () => {
    test('文字列"1"を渡すとエラーが発生する', () => {
      expect(() => multiply('1')).toThrow();
    });
    test('配列[1, 2]を渡すとエラーが発生する', () => {
      expect(() => multiply([1, 2])).toThrow();
    });
  });
});

describe('devide', () => {
  describe('[正常系] 引数の数字を掛け算して返す', () => {
    test('引数に4と2を渡したら2が返ってくる', () => {
      expect(devide(4, 2)).toBe(2);
    });
  });
  describe('[正常系] 結果は小数第5位で四捨五入し、小数第4位まで表示', () => {
    test('引数に1と3を渡すと0.3333が返ってくる', () => {
      expect(devide(1, 3)).toBe(0.3333);
    });
  });

  describe('[正常系]1~30個までの引数を受け取ることができる', () => {
    test('引数が1x31個のときエラーが発生する', () => {
      expect(() => devide(...Array(31).fill(1))).toThrow();
    });
    test('引数が0個のときエラーが発生する', () => {
      expect(() => devide()).toThrow();
    });
  });

  describe('[異常系]引数が数字意外だとエラーが発生する', () => {
    test('文字列"1"を渡すとエラーが発生する', () => {
      expect(() => devide('1')).toThrow();
    });
    test('配列[1, 2]を渡すとエラーが発生する', () => {
      expect(() => devide([1, 2])).toThrow();
    });
  });
});
