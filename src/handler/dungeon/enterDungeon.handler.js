import Monster from '../../classes/models/monster.class.js';
import { addDungeon } from '../../sessions/dungeon.session.js';
import { gameSessions } from '../../sessions/sessions.js';
import { getUserBySocket } from '../../sessions/user.session.js';
import sendResponsePacket from '../../utils/response/createResponse.js';

const enterDungeonHandler = async ({ socket, payload }) => {
  try {
    const { dungeonCode } = payload;
    console.log(dungeonCode);

    const user = await getUserBySocket(socket); // 현재 소켓에 연결되 유저를 불러옵니다.
    // console.log(user);
    const dungeon = addDungeon(dungeonCode);

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
        monsterId: monsterId,
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
      // monsters: monsterStatus,
    };
    console.log(dungeonInfo);
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

    const enterDungeonResponse = sendResponsePacket(PACKET_TYPE.S_EnterDungeonResponse, {
      dungeonInfo,
      playerStatus,
      screenText,
      battleLog,
    });
    console.log(dungeon);
    socket.write(enterDungeonResponse);
    const despawnTownResponse = sendResponsePacket(PACKET_TYPE.S_DespawnNotification, {
      playerIds: [user.playerId],
    });
  } catch (err) {
    console.error;
  }
};

export default enterDungeonHandler;
