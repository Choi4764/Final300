import pools from '../database.js';
import { SQL_QUERIES } from './user.queries.js';
import { toCamelCase } from '../../utils/transformCase.js';

export const findUserNickname = async (username) => {
  const [rows] = await pools.query(SQL_QUERIES.FIND_USER_BY_NICKNAME, [username]);

  return toCamelCase(rows[0]);
};

export const createUser = async (playerId, nickname, job, level, maxHp, maxMp, hp, mp, atk, def, magic, speed, critical, critical_attack) => {
  await pools.query(SQL_QUERIES.CREATE_USER, [
    playerId,
    nickname,
    job,
    level,
    maxHp,
    maxMp,
    hp,
    mp,
    atk,
    def,
    magic,
    speed,
    critical,
    critical_attack,
  ]);
  return {playerId, nickname, job, level, maxHp, maxMp, hp, mp, atk, def, magic, speed, critical, critical_attack};
};

export const updateUserLogin = async (id) => {
  await pools.query(SQL_QUERIES.UPDATE_USER_LOGIN, [id]);
}