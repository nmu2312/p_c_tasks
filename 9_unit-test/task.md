## 課題2
task2ディレクトリにあります。

## 課題3

- 関数の中でインスタンス化されているオブジェクトの値をテスト時に制御できないため。
- 依存性の注入とは  
　あるオブジェクトがオブジェクト内で別のオブジェクトを呼び出す必要がある場合、オブジェクト内でインスタンス化をするのではなく、インスタンスを外部から引数として注入する。
- 依存性の注入を行うことによって、モジュール同士の結合度の強さは弱くなる（疎結合になる）

## 課題4(クイズ)
## 関数のテストを書くクイズ
- task4_quizフォルダにあります。  
- __tests__/example_functions.test.jsは僕が確認のために自分で書いたテストです。

### jestに関するクイズ
1. 特定のテストをスキップしたいときに使うメソッドは何でしょうか。
2. 以下のテストは成功するでしょうか。
<pre>
class IceCream {
  constructor(flavor) {
    this.flavor = flavor;
  }
}
test('foo', () => {
  expect(new IceCream('vanilla')).toStrictEqual({flavor: 'vanilla'});
});
</pre>
3. 以下のサンプルコードのようにTypeScriptでmyFunctionsという関数のモック関数を作成すると、型名は何になるでしょうか。※＊＊＊に型名が入ります。
<pre>
import { myFunction } from "./library";
jest.mock("./library");
const mockMyFunction = myFunction as ＊＊＊;
</pre>

## 参考
- @types/jestの型定義  
  https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/jest/index.d.ts
- fetchメソッドのMock
  https://jestjs.io/ja/docs/next/bypassing-module-mocks