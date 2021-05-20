## curl
1. curl https://httpbin.org/headers -H "X-Test: hello"
2. curl -X POST https://httpbin.org/post -H "Content-Type: application/json" -d '{"name": "hoge"}'
4. curl -X POST https://httpbin.org/post -H "Content-Type: application/x-www-form-urlencoded" -d 'name=hoge'
3. curl -X POST https://httpbin.org/post -H "Content-Type: application/json" -d '{"userA": {"name": "hoge", "age": 29}}'

## Potman
task2-2_postmanディレクトリにPostmanのキャプチャがあります。

## クイズ

### curl

1. レスポンスにステータスコードを必ず表示させたい場合、curlコマンドにどのようなオプションをつければよいでしょうか。
2.  課題の「問題２」において、bodyのデータをコマンドラインに入力する代わりにuser.jsonというようなJSONファイルから読み込んで送信したい場合、どのようなcurlコマンドを書いたらよいでしょうか。
3. 下記のURLの画像を、praha_challenge_logo.svgというファイル名でダウンロードするためには、どのようなcurlコマンドを打てばよいでしょうか。
https://storage.googleapis.com/studio-design-assets/projects/ogO09B0Eq2/s-320x136_069c4f91-1e66-42d6-8d55-bf3d377a531e.svg


### Postman
1. Postmanでは作成したリクエストをテストする機能がついています。レスポンスのステータスコードが200であることを確かめるテストコードをPostman上で作成すると、どのようなテストコードが作成されるでしょうか。
2. Postmanでは繰り返し使う値を環境変数として登録することができます。任意の名前の環境変数を登録してリクエストのURLの"https://httpbin.org"という部分を、登録した環境変数に置き換えてください。
