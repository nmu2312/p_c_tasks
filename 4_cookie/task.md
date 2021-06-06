## 課題１

- 1  
HTTP Cookie (ウェブ Cookie、ブラウザー Cookie) は、サーバーからWebブラウザに送られ、ブラウザに保存される文字列データ。Cookieを使うことでステートレスなHTTPでも状態管理ができるようになる。サーバーはレスポンスヘッダにSet-cookieヘッダを含めることで、ブラウザにCookieを送信する。ブラウザは次回以降同じページを表示する際に、リクエストヘッダでcookieをサーバに返送する。  
https://developer.mozilla.org/ja/docs/Web/HTTP/Cookies

- 2  
送信されない。クッキーはデフォルトではクッキーを発行したドメインに対してのみ送信される。（サブドメインは含まれない。）

- 3  
送信される。クッキーはポート番号では区別されない。

- 4   
デフォルトではサブドメインは除外されるので送信されない。

- 5  
送信される。Domain属性が明示的に指定された場合、サブドメインもCookieの送信先に含まれるようになるため。

- 6  
可能。Set-CookieヘッダーにHttpOnly属性をつける。

- 7  
可能。Set-CookieヘッダーにSecure属性をつける。

- 8  
Expires属性が設定されていない場合は、クッキーはセッションの終了時(ブラウザを閉じたときなど)に削除される。  Expires属性を設定した場合、Expires属性で指定された時刻、またはMax-Ageで指定された期間が経過した後に削除される。

- 9  
サーバーからのクッキーの送信先を制限する。設定値は以下の3種類。  
Strict：同じドメインからのリクエスト時のみ送信を許可する。  
Lax：・トップレベルナビゲーション(実際にページが切り替わり、アドレスバーのURLが変わるリクエスト)かつGETメソッドであれば別ドメインからのリクエストでもクッキーを送信する。  
None：制限なし。  

- 10  
平文のパスワード、メールアドレス、ユーザーIDなど


- 11  
クッキー：。セッションIDなど、サーバーとのやり取りに伴う状態を管理する時に使う。  
ローカルストレージ：フロントエンドのJSからブラウザに何らかのデータを保存したいとき。ユーザーごとのデータを保存したいが、ログイン機能を実装するまでもない時などに使われる。（例：Amazonの「最近見た商品」）
クッキーはHttpOnly属性でJSからのアクセスを制限できるが、ローカルストレージはJSから簡単にアクセスできるので、秘密性の高いデータは入れない方が良い。

- 12  
攻撃者がクッキーを外部に送信するスクリプトを埋め込んだURLを貼る。  
↓  
ユーザーがURLをクリックするとスクリプトが実行されて外部にCookieが送られる。  
対策  
・Set-CookieヘッダにHttpOnly属性をつけ、docment.cookieからCookieを取得できないようにすることでXSSサイト攻撃を緩和できる。  
・Samesite=LaxまたはStrict設定し、別ドメインにcookieが送られないようにする（ajaxでリクエストを外部に送信するコードを埋め込まれた場合は依然としてcookieが漏洩するリスクがあるため（https://www.youtube.com/watch?v=4JREwhSC2dQ））  
・そもそもスクリプトが実行されないようにフォームに忘れずにエスケープ処理を施す。  

参考サイト  
https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/Set-Cookie/SameSite  
https://laboradian.com/same-site-cookies/  
https://numb86-tech.hatenablog.com/entry/2020/01/26/112607  
https://techracho.bpsinc.jp/hachi8833/2019_10_09/80851  
他  

## 課題２  