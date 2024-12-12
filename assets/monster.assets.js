import { getDungeonMonster, getMonster } from '../db/game/game.db.js';

// 몬스터 ID로 데이터 가져오기
export const getMonsterById = async (monsterId) => {
  if (monsterId !== 0) {
    const monsterData = await getMonster(); // getMonster()는 전체 몬스터 데이터를 가져옵니다.
    return monsterData.find((monster) => monster.monsterId === monsterId);
  }
};

// 던전 ID로 몬스터 가져오기
export const getMonsterByDungeonId = async (dungeonId) => {
  const dungeonMonsterData = await getDungeonMonster(); // 전체 던전 몬스터 데이터를 가져옵니다.
  return dungeonMonsterData.filter((dungeon) => dungeon.dungeonId === dungeonId);
};
