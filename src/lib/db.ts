import serverlessMysql from "serverless-mysql";

const config =
  process.env.NODE_ENV === "production"
    ? {
        config: {

          database: "test_salon_tablet",
          user: "root",
          password: "root",
          // socketPath: `/cloudsql/${process.env.CLOUD_SQL_CONNECTION_NAME}`,
          socketPath: "/cloudsql/salon-tablet-2:us-central1:salon-tablet-2",
        },
      }
    : {
        config: {
          host: "localhost",
          database: "test_salon_tablet",
          user: "root",
          password: "root",
          // port: 3306,
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
