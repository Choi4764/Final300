import Monster from './monster.class.js';

class InstanceDungeon {
  constructor(DungeonCode, DungeonMonsterId, DungeonItemId, DungeonName, RequireLevel) {
    this.DungeonCode = DungeonCode;
    this.DungeonMonsterId = DungeonMonsterId;
    this.DungeonItemId = DungeonItemId;
    this.DungeonName = DungeonName;
    this.RequireLevel = RequireLevel;
    this.monsters = [];
  }

  addMonster(idx, id, hp, attack, name, speed, critical, criticalAttack) {
    const monster = new Monster(idx, id, hp, attack, name, speed, critical, criticalAttack);
    this.monsters.push(monster);
  }

  removeMonster(idx) {
    const target = this.monsters.findIndex((monster) => monster.idx == idx);
    this.monsters.splice(target, 1);
  }
}

export default InstanceDungeon;
