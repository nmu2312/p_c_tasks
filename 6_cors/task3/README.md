# 課題3
## ファイルの説明
- app_api.js => APIサーバ(localhost:8080) 
- app_client.js => リクエストを発行するWebページをホストするためのサーバ(ngrokでドメイン名を割り当て)
- public/index.html => ブラウザからリクエストを発行するためのスクリプトが埋め込まれたWebページ
- result_images/request_result.PNG  
　=> 実際にリクエストを送信した結果のキャプチャ。エンドポイントjsonへのリクエストに対してpreflightリクエストが発生している。