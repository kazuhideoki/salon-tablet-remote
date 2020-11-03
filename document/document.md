## MySQLへのプロキシ
  それぞれのフォルダから
  開発(vagrant)： ./../cloud_sql_proxy -instances=salon-tablet-294401:asia-northeast1:salon-tablet=tcp:3306
  本番： ./../cloud_sql_proxy -instances=salon-tablet-294401:asia-northeast1:salon-tablet=tcp:3306 \
                  -credential_file='./../salon-tablet-294401-bf775dd0fe2d.json' &