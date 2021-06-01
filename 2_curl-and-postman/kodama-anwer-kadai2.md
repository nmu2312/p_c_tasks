## review
* 課題2-3と課題2-4が逆？(途中で入れ替わった？)
* 課題2-3で、postmanのurlが `http://0.0.0.0:80/post?name=hoge` になりませんか？(ならない？)

## quiz
### curl
1. レスポンスにステータスコードを必ず表示させたい場合、curlコマンドにどのようなオプションをつければよいでしょうか。
    * `--include` オプションを付与する
    ```
    curl http://0.0.0.0/headers --include
    ```
2.  課題の「問題２」において、bodyのデータをコマンドラインに入力する代わりにuser.jsonというようなJSONファイルから読み込んで送信したい場合、どのようなcurlコマンドを書いたらよいでしょうか。
    * @のあとにファイル名を指定してあげる
    ```
    curl --request POST --header "Content-Type: application/json" --data @./name.json 'http://0.0.0.0:80/post'
    ```
3. 下記のURLの画像を、praha_challenge_logo.svgというファイル名でダウンロードするためには、どのようなcurlコマンドを打てばよいでしょうか。
https://storage.googleapis.com/studio-design-assets/projects/ogO09B0Eq2/s-320x136_069c4f91-1e66-42d6-8d55-bf3d377a531e.svg
    ```
    curl -o ./praha_challenge_logo.svg https://storage.googleapis.com/studio-design-assets/projects/ogO09B0Eq2/s-320x136_069c4f91-1e66-42d6-8d55-bf3d377a531e.svg
    ```

### postman
1. Postmanでは作成したリクエストをテストする機能がついています。レスポンスのステータスコードが200であることを確かめるテストコードをPostman上で作成すると、どのようなテストコードが作成されるでしょうか。
    * `Tests` タブに以下のコードを入力し `Test Results` をチェック
    ```
    pm.test("Status code is 200", () => {
        pm.response.to.have.status(200);
    });
    ```
2. Postmanでは繰り返し使う値を環境変数として登録することができます。任意の名前の環境変数を登録してリクエストのURLの"https://httpbin.org"という部分を、登録した環境変数に置き換えてください。
    * url入力欄にて環境変数登録したい文字列を選択 ⇒ `Set as varianble` から登録できる。 `httpbin`に置き換えると
    ```
    {{httpbin}}/post?name=hoge
    ```
    * 参考リンク
        * https://learning.postman.com/docs/sending-requests/variables/
