## 開発環境でnextjsの起動 MySQLへのプロキシを使って

1. vagrant up
2. vagrant ssh (password: vagrant)
3. cd salon-tablet
4. proxy通す (最初にダウンロード,設定する https://cloud.google.com/sql/docs/mysql/connect-admin-proxy?authuser=2#tcp-sockets_1)

   `./cloud_sql_proxy -instances=salon-tablet-2:asia-northeast1:salon-tablet-db=tcp:3306`
5. 別のターミナルウィンドウから `npm run dev`



  それぞれのフォルダから
  開発(vagrantのsalon-tablet or localのhome)： ./cloud_sql_proxy -instances=salon-tablet-2:asia-northeast1:salon-tablet-db=tcp:3306


  本番?： ./../cloud_sql_proxy -instances=salon-tablet-2:asia-northeast1:salon-tablet-db=tcp:3306 \ -credential_file=~/.ssh/salon-tablet-2-da074a755124.json &
