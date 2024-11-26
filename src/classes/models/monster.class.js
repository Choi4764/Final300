class Monster {
  constructor(idx, id, name, hp, attack, exp, critical, speed, criticalAttack) {
    this.idx = idx;
    this.id = id;
    this.name = name;
    this.hp = hp;
    this.attack = attack;
    this.exp = exp;
    this.critical = critical;
    this.speed = speed;
    this.criticalAttack = criticalAttack;
  }
}

export default Monster;
