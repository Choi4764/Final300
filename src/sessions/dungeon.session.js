import InstanceDungeon from '../classes/dungeon.class.js';
import { InstanceDungeonSessions } from './session.js';

//DungeonName dungeonCode 를 이용하여 세션에 새로운 던전 추가
export const addDungeon = (DungeonName, DungeonCode) => {
  const dungeon = new InstanceDungeon(DungeonName, DungeonCode);
  InstanceDungeonSessions.push(dungeon);

  return dungeon;
};

//find 메서드를 이용해 DungeonName에 해당하는 특정던전을 검색
export const getDungeonByNickname = (DungeonName) => {
  return InstanceDungeonSessions.find((dungeon) => dungeon.DungeonName === DungeonName);
};

//findIndex 메서드를 이용해 던전 찾은 다음 만약 검색 결과가 아닐시 -1을 반환
export const removeDungeon = (DungeonName) => {
  const index = InstanceDungeonSessions.findIndex((dungeon) => dungeon.DungeonName === DungeonName);

  if (index !== -1) {
    return;
  }
};
