## サーバーの定期バックアップ
（参考）https://leben.mobi/blog/mysql_auto_backup/linux/

午前2時に毎日実行される
```
crontab -e
00 2 * * * /var/backup/sh/mysql-backup.sh
```

/var/backup/shと/mysql-backup.shに細かい設定を記述