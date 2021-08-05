# 13 E2E Testing

## 課題1
E22テストはmy-app/cypress/integration/my-app  
その他テストはmy-app/src/\_\_tests\_\_

## 課題2（質問）

### E2Eテストのメリット  
- 本番の稼働に近い動きでテストができる
### E2Eテストのデメリット  
- 壊れやすい
- 実行速度が遅い

## テストを選ぶ基準

自動テストのアプローチとしてはTest Pyramidというテストモデルがおそらく最も一般的である。ユニットテスト→統合テスト→E2Eテストの優先順位でテストを書き、テストの数がユニットテスト＞統合テスト>E2Eテストとなるようにテストを書くことが推奨される。  
しかし、最近では別のテストもモデルも提唱されている。  
まずフロントエンドでは費用対効果の観点からユニットテストをあまり書かず、代わりに、統合テストを多く書くことが良い結果をもたらすことが多い。統合テストに最も力を入れるパターンは、Kent C. Dodds.が[The Testing Trophy](https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications)と名付けている。  
また、マイクロサービスアーキテクチャで作られたアプリケーションの自動テストにおいては、SpotifyのエンジニアであるAndré Schafferが[the Testing Honeycomb](https://engineering.atspotify.com/2018/01/11/testing-of-microservices/)というモデルを推奨している。こちらのテストモデルも、統合テストに重点を置くものである。  


## 課題３（クイズ）
代表的なE2EテストツールはCypress以外にもPuppeteerがありますが、機能的にCypressがPuppeteerより優れている点はどんなものがあるでしょうか。


参考
https://medium.com/@mateuszroth/why-the-test-pyramid-is-a-bullshit-guide-to-testing-towards-modern-frontend-and-backend-apps-4246e89b87bd  



他