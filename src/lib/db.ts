import serverlessMysql from "serverless-mysql";

const config =
  process.env.NODE_ENV === "production"
    ? {
        config: {
          // host: process.env.NEXT_PUBLIC_MYSQL_HOST,
          // database: process.env.NEXT_PUBLIC_MYSQL_DATABASE,
          // user: process.env.NEXT_PUBLIC_MYSQL_USER,
          // password: process.env.NEXT_PUBLIC_MYSQL_PASSWORD,
          // // socketPath: `/cloudsql/${process.env.CLOUD_SQL_CONNECTION_NAME}`,
          // socketPath: `/cloudsql/${process.env.CLOUD_SQL_CONNECTION_NAME}`,
          host: 'localhost',
          // host: "34.84.102.102",
          database: "test_salon_tablet",
          user: "root",
          password: "root",
          // port: 3306,
          // socketPath: `/cloudsql/${process.env.CLOUD_SQL_CONNECTION_NAME}`,
          socketPath: "/cloudsql/salon-tablet-294401:asia-northeast1:salon-tablet",
        },
      }
    : {
        config: {
          host: "localhost",
          database: "test_salon_tablet",
          user: "root",
          password: "root",
          port: 3306,
        },
      };

const mysql = serverlessMysql(config)

// ※db(``)の返り値は常に[]
export const db = async (query, params?) => {


    console.log('mysqlのconfigは ' + JSON.stringify(config))
 
    const results = await mysql.query(query, params);
    await mysql.end();
    return results;
};
