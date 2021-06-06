## 課題１
- なぜキャッシュを使うのか
  - ページを表示する際の待ち時間を減らすため
  - ネットワークの通信量を節約するため
  - ユーザーがオフラインでもコンテンツを利用できるようにするため
- キャッシュの種類
  - ブラウザキャッシュ  
    各ユーザーのブラウザに保存されるキャッシュ
  - プロキシキャッシュ  
    プロキシサーバーに保存されるキャッシュ。プロキシサーバーとはクライアントとサーバーのやりとりを中継するサーバーである。  
    ブラウザキャッシュは各ユーザーのデバイスに保存されるのに対し、プロキシキャッシュはプロキシサーバーに保存された一つのデータを複数のユーザーが共用する。

- キャッシュを制御するためのHTTPヘッダ
  - Expires  
    HTTP1.0時代に策定されたヘッダ。Exipresヘッダに日付を設定することで、指定された日付までキャッシュを有効可できる。
  - Cache-Control  
    HTTP1.1で新たに策定されたヘッダ。Expiresよりもキャッシュを細かく制御できる。ExpiresヘッダとCache-Controlヘッダが両方ある場合、Cache-Controlヘッダが優先される。IEはこのヘッダに対応していない。
  - Etag  
    リソースのバージョンを示すヘッダ。クライアントは再リクエストをする際に、以前にレスポンスから受け取ったEtagヘッダの値をIf-None-Matchヘッダに入れてリクエストを行い、サーバはリソースのETag値と送られてきたIf-None-Matchヘッダ内のETag値と比較する。もしETag値が一致すれば、リソースは変わっていないということになるので、サーバは304 Not Modifiedという、リソース本体を含まないレスポンスを返す。一方、ETagが一致しなければ、If-None-Matchのないリクエストと同様、リソースを含んだレスポンスを返す。

- 現行のFirefoxにおいて、容量上限はユーザーのデバイスのストレージの空き容量で変動する。以前はデフォルトで256MBがリミットだった。
  上限に達した場合、古いデータからオリジン単位で削除される。

- Expiresヘッダはキャッシュの有効な期日を指定する機能しかないので、静的なコンテンツのキャッシュには適しているが動的なコンテンツのキャッシュには向いていない。  
  代わりにExpires headerではなくCache-Controlヘッダーを使い、max-age=0またはno-cacheを設定する。


- 実際のキャッシュの使用例のキャプチャはcache_examplesフォルダにあります  
  キャッシュを利用する流れ
  クライアントがサーバーにリクエストを送る  
  ↓  
  サーバーから返されたコンテンツをブラウザにキャッシュとして保存する。  
  ↓  
  同じリソースを再度リクエストする場合、リソースのキャッシュがmax-ageで設定された期限を過ぎていた場合（＝リソースが陳腐化している場合）、サーバーに現在保存されているキャッシュが最新かどうか問い合わせをし(If-None-Macthヘッダ等を使用)、最新でない場合はコンテンツをダウンロードし直す。

## 課題２
task2フォルダにあります。

## 課題４(クイズ)
  1. 以下の記述は正しいでしょうか。  
    Cache-Controlヘッダでmax-age=0が指定されていた場合コンテンツはキャッシュされない。
  2. レスポンスコード200(from memory cache)と304 Not Modifiedの違いは何でしょうか。
  3. public cacheではなくprivate cacheを使った方がいい場合の例を挙げてください。

## 課題の参考にしたもの
- MDN - HTTP Cache  
  https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching
- Caching Tutorial for Web Authors and Webmasters  
  https://www.mnot.net/cache_docs/  
- Heroku - HTTP キャッシュヘッダーを使用したアプリケーションパフォーマンスの向上
  https://devcenter.heroku.com/ja/articles/increasing-application-performance-with-http-cache-headers
- How To Change HTTP Browser Cache Size  
  https://www.c-sharpcorner.com/article/how-to-change-http-browser-cache-size/  
- キャッシング  
  https://almanac.httparchive.org/ja/2019/caching
- Public Cache vs Private Cache  
  https://my.kualo.com/knowledgebase/109_litespeed-cache/1357_public-cache-vs.-private-cache.html  
他

