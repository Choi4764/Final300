class InstanceDungeon {
  constructor(DungeonName, dungeonCode) {
    this.DungeonName = DungeonName;
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
