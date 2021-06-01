# 6

## 課題1

- 1  
オリジン間リソース共有Cross-Origin Resource Sharing (CORS)は、異なるオリジンでリソースを共有するための仕組みである。  
ウェブアプリケーションは、自分とは異なるオリジン (ドメイン、プロトコル、ポート番号) にあるリソースをリクエストするとき、オリジン間 HTTP リクエストを実行する。  
リクエストを受ける側のレスポンスヘッダでAccess-Control-Allow-Originを設定することにより、リクエストを許可するオリジンを設定することができる。値にワイルドカード(*)を設定すると、あらゆるオリジンからのリクエストを許可する。  
オリジン間リクエストが行われる場合、ブラウザーは実際のリクエストを送る前にリクエスト先に対してpreflight request（先行して送るリクエスト）を行い(HTTPのOPTIONメソッドを使用)、サーバーが実際のリクエストを許可するかどうかあらかじめ確認したうえで実際のリクエストを行う。  
実際に送られるリクエストが副作用の心配が少ない"simple request"に該当する場合、プリフライトリクエストを送らずにそのまま実際のリクエストを送る。  

- 2  
第三者からのスクリプトによるリクエストによって、外部に公開してはいけない情報がAPI経由で漏洩するリスクがある。

### シンプルなリクエスト
- 3  
  シンプルなリクエストの条件
  1.  メソッドはGET, POST, HEADのどれか
  2.  手動で設定しているヘッダは下記に書かれたものだけ  
    - Accept  
    - Accept-Language  
    - Content-Language  
    - Content-Type (但し、３の要件を満たすもの)  
    - DPR  
    - Downlink  
    - Save-Data  
    - Viewport-Width  
    - Width  
  3. Content-Type ヘッダーの以下の値が以下のうちどれか  
    - application/x-www-form-urlencoded
    - multipart/form-data
    - text/plain
  4. XMLHttpRequestオブジェクトを使用する場合、XMLHttpRequest.uploadプロパティにイベントリスナーが登録されていない
  5. リクエストにReadableStreamオブジェクトを使用していない

- 4  
  リクエストがブロックされるので、コンソールにエラーメッセージが出る。  
  Chromeの場合"Access to fetch at 'http://example.com' from origin 'http://xxxxxxxx' has been blocked by CORS policy"というエラーメッセージがでる。

- 5    
  XMLHttpRequestオブジェクトのwithCredentialsプロパティにtrueを設定する。　　
  <pre>
  const xhr = new XMLHttpRequest();　　
  xhr.withCredentials = true;　　
  </pre>　　

## 課題2
  ### クイズ
  1. 以下のリクエストは単純リクエストに該当するでしょうか。  
    - formに入力したデータをFormDataオブジェトでラップした上で、そのデータをJSの非同期通信でPOSTする。
  2. XMLHttpRequestの代わりにFetch APIを使用してCookieを含めたリクエストを送信したい場合、どのようなオプションを追加する必要がありますか。また、Cookieの送信を同一オリジンに制限する場合はどのようなオプションにすればよいでしょうか。
  3. Access-Control-Request-Headersの役割はなんでしょうか。

## 課題3
  task3/README.mdにファイルの説明があります。

## 課題4
curlコマンドでのリクエストにCORS制約は適用されない。  
CORSの対象になるのはブラウザーのスクリプトによって実行されるリクエスト（＝XMLHttpRequestやFetch APIによるリクエスト）であるため。  
参考：  
auth0のサイトにあるCORS Tutorialという記事より。  
"Note: The call using curl works just fine, as CORS only affects XMLHttpRequest calls in the browser."  
(https://auth0.com/blog/cors-tutorial-a-guide-to-cross-origin-resource-sharing/)  