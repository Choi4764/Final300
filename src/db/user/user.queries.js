export const SQL_QUERIES = {
    FIND_USER_BY_NICKNAME: 'SELECT * FROM User WHERE nickname = ?',
    CREATE_USER:
      'INSERT INTO Character (playerId, nickname, job, level, maxHp, maxMp, hp, mp, atk, def, magic, speed, critical, critical_attack) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    UPDATE_USER_LOGIN: 'UPDATE Character SET updateAt = CURRENT_TIMESTAMP WHERE username = ?',
   };
  