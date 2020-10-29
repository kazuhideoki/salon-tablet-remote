import serverlessMysql from "serverless-mysql";

const config = {
  config: {
    host: process.env.NEXT_PUBLIC_MYSQL_HOST,
    database: process.env.NEXT_PUBLIC_MYSQL_DATABASE,
    user: process.env.NEXT_PUBLIC_MYSQL_USER,
    password: process.env.NEXT_PUBLIC_MYSQL_PASSWORD,
  },
};
const mysql = serverlessMysql();

// ※db(``)の返り値は常に[]
export const db = async (query, params?) => {

    console.log('mysqlのconfigは ' + config)
 
    const results = await mysql.query(query, params);
    await mysql.end();
    return results;
};
