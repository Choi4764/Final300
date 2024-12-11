import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mysql from 'mysql2/promise';
import pools from '../database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const createSchema = async () => {
    const sqlDir = path.join(__dirname, '../sql');

    try {
        // db.sql 파일 읽기
        const sql = fs.readFileSync(sqlDir + '/db.sql', 'utf8');

        // 쿼리 나누기 및 필터링
        const queries = sql.split(';')
            .map((query) => query.trim())
            .filter((query) => query.length > 0);


        // 각 쿼리 실행
        for (const query of queries) {
            console.log(`Executing query: ${query}`);
            await pools.query(query);
        }

        console.log('마이그레이션 완료!!');
        await connection.end(); // 연결 종료
    } catch (e) {
        console.error('DB 마이그레이션 에러', e);
    }
};

// 스크립트 실행
createSchema();