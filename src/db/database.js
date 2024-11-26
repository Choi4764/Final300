import mysql from 'mysql2/promise';
import { config } from '../config/config.js';

import { formatDate } from './formatDate.js';

const createPool = () => {
  const pool = mysql.createPool({
    ...config.database,
    
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  const originalQuery = pool.query;

  pool.query = (sql, params) => {
    const date = new Date();

    console.log(
      `[${formatDate(date)}] Executing query: ${sql} ${params ? `, ${JSON.stringify(params)}` : ``}`,
    );
    return originalQuery.call(pool, sql, params);
  };

  return pool;
};

const pools = createPool();

export default pools;