import { getProtoMessages } from "../../init/loadProtos.js";
import { getGameSession } from "../../sessions/game.session.js";
import { getUserBySocket } from "../../sessions/user.session.js";
import sendResponsePacket from "../../utils/response/createResponse.js";
/*

//request
message C_Enter{
  string nickname = 1;
  int32 class = 2;
}

//response
message S_Enter {
  PlayerInfo player = 1;
}

*/
export const enter = async({socket, payload}) => {
  try{
    const protoMessages = getProtoMessages();
    const GamePacket = protoMessages.game.GamePacket;
    const gamePacket = GamePacket.decode(payload);

    // const enterRequest = gamePacket.enterRequest;
    // const {nickname, job} = enterRequest;
    // console.log(`in data: ${nickname}, ${job}`);

    const {nickname} = payload;
    const characterClass = payload.class;
    const userExist = await getUserBySocket(socket);

    //게임 세션을 가져옴.
    const gameSession = await getGameSession(config.session.townId)

    var curUser;

    if(!userExist){
      // 유저가 없으면(첫 접속) DB에서 유저 정보 불러오기.
      curUser = await getUserInfoFromDB(socket, nickname, characterClass);
    }else{
      // 첫 접속이 아니면 세션을 가져오고 DB에 저장.
      curUser = await getUserInfoFromSession(socket, userExist);
    }
    const playerInfo = curUser.playerInfo;

    //await setPlayerInfo(socket, playerInfo)

    gameSession.addUser(nickname);
    gameSession.transforms[nickname] = curUser.playerInfo.transforms;

    console.log('현재 접속 중인 유저: ', getAllUserNicknames());

    const S_EnterResponse = protoMessages.game.S_EnterResponse;
    const enterResponse = S_EnterResponse.create({
      player
    });
    sendResponsePacket(socket, PAKCET_DATA.S_EnterResponse, {
      enterResponse,
    });

    

  }catch(err){
    console.error(err);
  };

}

const getUserInfoFromDB = async (socket, nickname, characterClass) => {
  // DB에서 user, character 정보 가져오기
  let userInDB = await findUserByUsername(nickname);

  // character 처음 생성하는 거면 character DB에 추가
  let character = await findCharacterByUserIdAndClass(userInDB.userId, characterClass);
  if (!character) {
    await insertCharacter(userInDB, characterClass);
    character = await findCharacterByUserIdAndClass(userInDB.userId, characterClass);
  }

  const jobInfo = await getJobInfo(character.jobId);
  const { baseEffect, singleEffect, wideEffect } = jobInfo;
  const effectCode = { baseEffect, singleEffect, wideEffect };
  if (!character || !character.characterId) {
    throw new Error('Character data is not properly initialized.');
  }

  // const userItemInDB = await getUserItemsByCharacterId(character.characterId);
  // const userItems = [];
  // for (const userItem of userItemInDB) {
  //   const item = new Item(userItem.id, userItem.quantity);
  //   userItems.push(item);
  // }
  // const inven = {};
  // inven.items = userItems;

  // 유저세션에 해당 유저가 존재하면 유저 데이터를 가져오고,
  // 그렇지 않으면 유저세션, 게임세션에 추가한다.
  const curUser = await addUser(socket, effectCode, character);

  const statInfo = {
    level: character.characterLevel,
    hp: character.curHp,
    maxHp: character.maxHp,
    mp: character.curMp,
    maxMp: character.maxMp,
    atk: character.attack,
    def: character.defense,
    magic: character.magic,
    speed: character.speed,
    critRate: character.critical,
    critDmg: character.criticalAttack,
    avoidRate: character.avoidAbility,
    exp: character.experience,
  };

  const equipment = {
    weapon: character.weapon,
    armor: character.armor,
    gloves: character.gloves,
    shoes: character.shoes,
    accessory: character.accessory,
  };

  const transformInfo = {
    posX: Math.random() * 18 - 9 + config.town.spawnAreaPos.x, // -9 ~ 9
    posY: config.town.spawnAreaPos.y,
    posZ: Math.random() * 16 - 8 + config.town.spawnAreaPos.z, // -8 ~ 8
    rot: Math.random() * 360, // 0 ~ 360
  };

  const playerInfo = {
    playerId: curUser.playerId,
    nickname,
    class: characterClass,
    gold: character.gold,
    transform: transformInfo,
    statInfo,
    inven,
    equipment,
  };

  curUser.playerInfo = playerInfo;
  return curUser;
};

const getUserInfoFromSession = async (socket, userExist) => {
  const playerInfo = await getPlayerInfo(socket);
  // user 세션의 items중 quantity 0인 item 삭제
  // for (let i = playerInfo.inven.items.length - 1; i >= 0; i--) {
  //   const item = playerInfo.inven.items[i];
  //   if (item.quantity === 0) {
  //     playerInfo.inven.items.splice(i, 1);
  //   }
  // }

  userExist.playerInfo = playerInfo;

  return userExist;
};