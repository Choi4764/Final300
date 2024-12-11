import pools from '../../db/database.js';

const testConnection = async (pool) => {
  try {
    const [rows] = await pools.query(`SELECT 1 + 1 AS solution`);
    console.log(`테스트 쿼리 결과: ${rows[0].solution}`);
  } catch (err) {
    console.error(`테스트 쿼리 실행 오류, `, err);
  }
};

export default testConnection;