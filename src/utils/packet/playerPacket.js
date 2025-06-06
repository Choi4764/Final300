export const playerData = (user) => {
    const playerInfo = {
      playerId: user.id,
      nickname: user.nickname,
      class: user.job,
      transform: {
        posX: user.position.posX,
        posY: user.position.posY,
        posZ: user.position.posZ,
        rot: user.position.rot,
      },
      statInfo: {
        level: user.level,
        hp: user.stat.hp,
        maxHp: user.stat.maxHp,
        mp: user.stat.mp,
        maxMp: user.stat.maxMp,
        atk: user.stat.atk,
        def: user.stat.def,
        magic: user.stat.magic,
        speed: user.stat.speed,
        critical: user.stat.critical,
        critical_attack: user.stat.critical_attack,
      },
    };
  
    return playerInfo;
  };