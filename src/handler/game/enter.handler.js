import { createUser, findUserNickname } from '../../db/user/user.db.js';
import User from '../../classes/models/user.class.js';
import { PACKET_TYPE } from '../../constants/header.js';
import { getJobById } from '../../init/loadAssets.js';
import { addUserAtTown, getAllUserExceptMyself } from '../../sessions/town.session.js';
import { playerData } from '../../utils/packet/playerPacket.js';
import sendResponsePacket from '../../utils/response/createResponse.js';
import { spawnOtherPlayerHandler } from './spawn.handler.js';

export const enterTownHandler = async ({socket, payload}) => {

  const {nickname, class: jobClass} = payload;

  const pickJob = getJobById(1002);
  if (!pickJob) {
    console.error(`존재하지 않는 직업입니다. ${jobClass}`);
    return;
  }

  let newPlayer;
  const existingPlayer = await findUserNickname(nickname);
  // 새 유저가 아니고 기존 유저인 경우 기존 정보 불러오기
  if(existingPlayer){
    newPlayer = existingPlayer;
  }else{ // 기존유저가 아니고 새 유저인 경우 새로운 사용자 생성 및 DB에 저장.
    await createUser(
      pickJob.playerId,//null,  // playerId
      nickname, // nickname
      pickJob.id, // job
      1, // level
      pickJob.maxHp,
      pickJob.maxMp,
      pickJob.hp,
      pickJob.mp,
      pickJob.atk,
      pickJob.def,
      pickJob.magic,
      pickJob.speed,
      pickJob.critical,
      pickJob.critical_attack,
    );
    newPlayer = await findUserNickname(nickname);
  };

  const user = new User(
    socket,
    newPlayer.id,
    nickname,
    // playerInfo
    newPlayer.maxHp,
    newPlayer.maxMp,
    newPlayer.atk,
    newPlayer.def,
    newPlayer.magic,
    newPlayer.speed,
    newPlayer.critical,
    newPlayer.critical_attack,
  );
  user.job = newPlayer.job;
  user.level = newPlayer.level;

  //position
  user.position.posX = 0;
  user.position.posY = 1;
  user.position.posZ = 0;
  user.position.rot = 0;

  // stat
  user.stat.hp = newPlayer.hp;
  user.stat.maxHp = newPlayer.maxHp;
  user.stat.mp = newPlayer.mp;
  user.stat.maxMp = newPlayer.maxMp;
  user.stat.atk = newPlayer.atk;
  user.stat.def = newPlayer.def;
  user.stat.magic = newPlayer.magic;
  user.stat.speed = newPlayer.speed;
  user.stat.critical = newPlayer.critical;
  user.stat.critical_attack = newPlayer.critical_attack; 

  await addUserAtTown(user);

  const enterData = playerData(user);

  const enterResponse = sendResponsePacket(PACKET_TYPE.S_Enter, {
    player: enterData,
  });

  
  socket.write(enterResponse);
  if(enterResponse){
    console.log(`!!send response!! ${enterResponse}`);
  }

  const otherPlayers = await getAllUserExceptMyself(user.id);

  // 다른 플레이어가 있을때 새로운 플레이어에게 기존 플레이어들의 정보 전송
  if(otherPlayers.length > 0){
    const otherPlayersData = otherPlayers.map((u) => playerData(u));

    const spawnResponse = sendResponsePacket(PACKET_TYPE.S_Spawn, {
      players: otherPlayersData,
    });
    socket.write(spawnResponse);
  }

  // 기존 플레이어들에게 새로운 플레이어 정보 전송
  await spawnOtherPlayerHandler(user);
}