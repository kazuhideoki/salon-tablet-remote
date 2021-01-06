import serverlessMysql from 'serverless-mysql';

const config = {
  config: {
    host: process.env.NEXT_PUBLIC_MYSQL_HOST,
    database: process.env.NEXT_PUBLIC_MYSQL_DATABASE,
    user: process.env.NEXT_PUBLIC_MYSQL_USER,
    password: process.env.NEXT_PUBLIC_MYSQL_PASSWORD,
    socketPath: undefined as undefined | string,
  },
};
config.config.socketPath =
  process.env.NODE_ENV === 'production'
    ? process.env.CLOUD_SQL_CONNECTION_NAME
    : undefined;

const mysql = serverlessMysql(config);

export const db = async (query: string, params?: any): Promise<unknown> => {
  const results = await mysql.query(query, params);
  await mysql.end();
  return results;
};
