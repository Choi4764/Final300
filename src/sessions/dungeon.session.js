import InstanceDungeon from '../classes/models/dungeon.class.js';
import { InstanceDungeonSessions } from './sessions.js';

//DungeonName dungeonCode 를 이용하여 세션에 새로운 던전 추가
export const addDungeon = (DungeonCode) => {
  const dungeon = new InstanceDungeon(DungeonCode);
  InstanceDungeonSessions.push(DungeonCode);

  return dungeon;
};

//find 메서드를 이용해 DungeonName에 해당하는 특정던전을 검색
export const getDungeonByCode = (DungeonCode) => {
  return InstanceDungeonSessions.find((dungeon) => dungeon.DungeonCode === DungeonCode);
};

//findIndex 메서드를 이용해 던전 찾은 다음 만약 검색 결과가 아닐시 -1을 반환
export const removeDungeon = (DungeonCode) => {
  const index = InstanceDungeonSessions.findIndex((dungeon) => dungeon.DungeonCode === DungeonCode);

  if (index !== -1) {
    return;
  }
};
