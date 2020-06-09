import serverlessMysql from "serverless-mysql";

const mysql = serverlessMysql({
  config: {
    // host: process.env.MYSQL_HOST,
    // database: process.env.MYSQL_DATABASE,
    // user: process.env.MYSQL_USER,
    // password: process.env.MYSQL_PASSWORD,

    // .envファイル読み込めずとりあえず直接設定
    host: "localhost",
    database: "salon_tablet",
    user: "root",
    password: "root",
  },
});

export const db = async (query, params?) => {
 
    const results = await mysql.query(query, params);
    await mysql.end();
    return results;
};
