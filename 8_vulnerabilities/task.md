## 課題１（質問）

以下の脆弱性の仕組み、発生し得る被害、対処法を解説してください

### XSS
#### 仕組み
  - 掲示板サイトなどのWebサイトに攻撃用のスクリプトやスクリプトを埋め込んだリンクなどを貼り、ページを閲覧もしくはリンクをクリックしたユーザーに対して攻撃用のスクリプトを実行する。リンクをクリックしたユーザーはcookieを外部に送信されたり、個人情報を入力する偽のフォームに誘導されたりする。
#### 被害
  - Cookieの漏洩、パスワードなどの個人情報の漏洩
#### 対策
  - 文字列のエスケープ
  - SameSite=Laxなどを設定しCookieを別オリジンに送信させない
  - cookieにsecure属性をつけてJSからクッキーにアクセスできないようにする

### コマンドインジェクション
#### 仕組み
　ユーザーからデータや数値の入力を受け付けるようなWebサイトなどにおいて、プログラムに与えるパラメータにOSへの命令文を紛れ込ませて不正に操作する。
#### 被害
  - コンピュータの乗っ取り、情報の漏えい、改ざん、削除、他のコンピュータへの攻撃に利用される、など
  - 
#### 対策
  - コマンドを利用するシステムの実装は避ける
  - 注意が必要な特殊文字はエスケープする。
  - ホワイトリスト設定する。
  - WAFの導入

### SQLインジェクション
#### 仕組み
  - システムが想定しないSQL文を何らかの方法で実行させ、利用しているデータベースを不正に操作する
#### 被害
  - 情報漏洩、改ざん、不正ログイン、システムの乗っ取りなど
#### 対策
  - ユーザーから入力される文字列をエスケープする
  - ORマッパーなどを導入する
  - ライブラリやフレームワークなどは常に最新版を使う
  - WAFを導入する

### CSRF
#### 仕組み
  - 攻撃者の作成したページをユーザーが訪問すると、ユーザーが普段利用しているサイトに対してユーザーの意図しないリクエストが送信される。
#### 被害
  - Webサービスのユーザー情報の不正な変更、不正な送金や商品の購入など
#### 対策
  - サーバー側で同一オリジンからのリクエストか検証する。
  - WebアプリケーションでCSRF対策用のトークンを発行し、正規の経路からのリクエストかどうか検証する。

## 課題２（クイズ）
1. DOM Based XSSの仕組みについて説明してください
2. WAFの役割を説明してください

## 課題３（実演）
- XSS, SQLインジェクション, Commandインジェクション=>attack_dvwaフォルダに結果のキャプチャがあります。
- CSRF => public/index.html　攻撃用のページです。 DVWAにログインした状態でこのページにアクセスするとDVWAのパスワードを勝手に変更されます。