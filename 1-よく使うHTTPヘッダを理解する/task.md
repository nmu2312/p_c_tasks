## 課題１

### HTTPヘッダー
- Host  
Hostリクエストヘッダーはリクエストが送信される先のサーバーのホスト名およびポート番号を指定する。
ポート番号が指定されなかった場合は、要求されたサービスの既定のポート（例えばHTTPSのURLであれば443、HTTPのURLであれば80）が指定される。

- Content-type  
Content-Typeレスポンスヘッダーはクライアントに返されたコンテンツがどのような種類のものかを示す。
Content-TypeリクエストヘッダーはクライアントからのリクエストにおいてはPOST または PUT などで、クライアントからサーバーにどのような種類のデータが実際に送られたかをサーバーに伝える。

- User-agent  
User-agentリクエストヘッダーはクライアントのソフトエア情報(OSやブラウザなど)の文字列をサーバーに伝える。

- Accept  
Acceptリクエストヘッダーはクライアントが受け取ることができるデータの種類をサーバーに通知する。

- Referer  
Refererリクエストヘッダーは現在リクエストされているページのクリック元のURLを示す。

- Accept-Encoding  
Accept-Encodingリクエストヘッダーは、クライアントが受け取ることのできるコンテンツのエンコーディング（ふつうは圧縮アルゴリズム）の形式を示す。

- Authorization  
Authorization リクエストヘッダーは、ユーザーエージェントが認証するための認証情報を持つ。

- Location  
Locationレスポンスヘッダーはリダイレクト時のリダイレクト先のURLを示す。 

### referer
- rel=noreferrerを設定していない場合、リンク先のページからリンク元のページに対して「window.opener」オブジェクト経由でJavaScriptを実行できるが、この状態はセキュリティ上の問題がある。  
rel=noreferrerを設定することにより、リンク先のページにリンク元の情報(リファラ)が送られなくなるので、window.openerオブジェクトからリンク元のページにアクセスすることもできなくなる。

- リンク先にサイトに悪意のあるJavascriptが記載されていた場合に、リンク元のサイトのページが不正に改ざんされることがある。

- "Referrer-Policy: origin-when-cross-origin"を追加する

## 課題2
1. http://example.com からのクロスドメイン通信を許可したい場合、HTTPレスポンスヘッダーにどのような値を追加したらよいでしょうか。
  * (コダマ回答) 
  * `Access-Control-Allow-Origin: http://example.com/*` 
2. PUTメソッドとPATCHメソッドの違いを簡単に説明してください。
  * PUTは指定URLのリソースをまるごと置換する (SQLでいうDELETE+INSERT)
  * PATCHは一部変更する (SQLでいうUPDATE)
3. フォームでファイル送信する場合、form要素の属性にenctype="multipart/form-data"を設定する必要があるのはなぜでしょうか。
  * サーバ側に添付ファイルと認識させるため
  * バイナリを送ってファイルと認識させている？
    * https://stackoverflow.com/questions/4526273/what-does-enctype-multipart-form-data-mean
