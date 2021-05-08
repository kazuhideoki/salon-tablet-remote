# Get Started

## ◆gcloud の設定

### アカウント、プロジェクト確認

```
$ gcloud config list

（略）
[core]
account = ***@***.jp
disable_usage_reporting = True
project = ****
```

### アカウント切り替え

`$ gcloud auth login` -> cutterkaz@gmail.com (kazuhideoki)

### ※プロジェクトの切り替え

```
$ gcloud config set project [PROJECT_ID]
Updated property [core/project].
```

## ◆ 立ち上げ

### Cloud SQL の Proxy 起動 (ローカルからデータベースに接続できるようにする)

`$ ./proxy/mac_cloud_sql_proxy -instances=salon-tablet-2:asia-northeast1:salon-tablet-db=tcp:3306`

### next 起動

`npm run dev`

### MySQL への接続

`mysql -u root -p --host 127.0.0.1`
パスワード `root`

本番環境 `use salon_tablet`
テスト環境 `use test_salon_tablet`
