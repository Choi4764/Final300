import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mysql from 'mysql2/promise';
import pools from '../database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createSchema = async () => {
    const sqlDir = path.join(__dirname, '../sql'); // SQL 파일 경로

    try {
        // db.sql 파일 읽기
        const sql = fs.readFileSync(path.join(sqlDir, 'db.sql'), 'utf8');

        // 쿼리 나누기 및 필터링
        const queries = sql
            .split(';') // 쿼리 구분
            .map((query) => query.trim()) // 양쪽 공백 제거
            .filter((query) => query.length > 0); // 빈 쿼리 필터링

        // MySQL 연결 가져오기
        const connection = await pools.getConnection();

        // 각 쿼리 실행
        for (const query of queries) {
            console.log(`Executing query: ${query}`);
            await connection.query(query); // 쿼리 실행
        }

        console.log('마이그레이션 완료!!');
        connection.release(); // 연결 반환 (pools 사용 시)
    } catch (e) {
        console.error('DB 마이그레이션 에러:', e);
    }
};

// 스크립트 실행
createSchema();
