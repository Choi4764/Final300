import mysql from 'mysql2/promise';
import { formatDate } from './formatDate';

const createPool = () => {
    const pool = mysql.createPool({
        ...config.database,
        waitForConeections: true,
        coneectionLimit: 10,
        queueLimit: 0,
    });

    const originalQuery = pool.query;

    pool.query = (sql, params) => {
        const date = new Date();
        console.log(`${formatDate(date)}] excuting query :${sql} ${params ? `, ${JSON.stringify(params)}` : ``} `);

        return originalQuery.call(pool, sql, params);
    };
    return pool;
};

const dbpool = createPool();
export default dbpool;