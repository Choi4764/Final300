import Monster from '../../classes/monster.class.js';
import { addDungeon } from '../../session/dungeon.session.js';
import { gameSessions } from '../../sessions/sessions.js';

const enterDungeonHandler = async ({ socket, payload }) => {
  try {
    const { dungeonCode } = payload;
    const user = await getUserBySocket(socket); // 현재 소켓에 연결되 유저를 불러옵니다.
    const userPlayerInfo = await getPlayerInfo(socket); // 유저의 정보또한 불러옵니다.

    const dungeon = addDungeon(user.name, dungeonCode);

    const monsterStatus = [];
    //db에서 몬스터3마리를 랜덤하게 가지고 옵니다.
    for (let i = 0; i < 3; i++) {
      const monsterDB = monsters[Math.floor(Math.random() * monsters.length)].monsterId;
      const {
        monsterId,
        monsterName,
        monsterHp,
        monsterAttack,
        monsterSpeed,
        monsterCritical,
        monsterCriticalAttack,
      } = await getMonsterById(monsterDB);

      const monster = {
        monsterIdx: i,
        monsterModel: monsterId,
        monsterName: monsterName,
        monsterHp: monsterHp,
      };
      monsterStatus.push(monster);

      dungeon.addMonster(
        monsterId,
        monsterName,
        monsterHp,
        monsterAttack,
        monsterSpeed,
        monsterCritical,
        monsterCriticalAttack,
      );
    }

    const dungeonInfo = {
      dungeonCode: dungeonCode,
      monsters: monsterStatus,
    };
    const playerStatus = {
      playerClass: user.class,
      playerLevel: user.level,
      playerName: user.name,
      playerFullHp: user.maxHp,
      playerFullMp: user.maxMp,
      playerCurHp: user.hp,
      playerCurMp: user.mp,
    };

    const screenTextAlignment = {
      x: 1,
      y: 1,
    };
    const textColor = {
      r: 1,
      g: 1,
      b: 1,
    };
    const screenColor = {
      r: 1,
      g: 1,
      b: 1,
    };
    const message = `${user.name}님이 던전에 입장하셨습니다.`;

    const screenText = {
      msg: message,
      typingAnimation: false,
      alignment: screenTextAlignment,
      textColor: textColor,
      screenColor: screenColor,
    };
    const btns = {
      msg: 'btn',
      enable: false,
    };

    const battleLog = {
      msg: 'battleLog',
      typingAnimation: false,
      btns,
    };

    const enterDungeonResponse = createResponse('response', 'S_EnterDungeonResponse', {
      dungeonInfo,
      playerStatus,
      screenText,
      battleLog,
    });

    socket.write(enterDungeonResponse);
    const despawnTownResponse = createResponse('response', 'S_Despawn', {
      playerIds: [user.playerId],
    });
  } catch (err) {
    console.error;
  }
};

export default enterDungeonHandler;
