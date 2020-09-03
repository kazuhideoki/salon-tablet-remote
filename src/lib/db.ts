import serverlessMysql from "serverless-mysql";

const mysql = serverlessMysql({
  config: {
    
    host: process.env.NEXT_PUBLIC_MYSQL_HOST,
    database: process.env.NEXT_PUBLIC_MYSQL_DATABASE,
    user: process.env.NEXT_PUBLIC_MYSQL_USER,
    password: process.env.NEXT_PUBLIC_MYSQL_PASSWORD,
  },
});

// ※db(``)の返り値は常に[]
export const db = async (query, params?) => {
 
    const results = await mysql.query(query, params);
    await mysql.end();
    return results;
};
