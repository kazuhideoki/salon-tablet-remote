## MySQLへのプロキシ
  それぞれのフォルダから
  開発(vagrantのsalon-tablet or localのhome)： ./../cloud_sql_proxy -instances=salon-tablet-2:us-central1:salon-tablet-2=tcp:3306
  本番?： ./../cloud_sql_proxy -instances=salon-tablet-2:us-central1:salon-tablet-2=tcp:3306 \
                  -credential_file='./../salon-tablet-294401-bf775dd0fe2d.json' &