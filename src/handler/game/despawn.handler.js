import { PACKET_TYPE } from "../../constants/header.js";
import { getAllUserExceptMyself, removeUser } from "../../sessions/town.session.js"
import { getUserBySocket } from "../../sessions/user.session.js";
import sendResponsePacket from "../../utils/response/createResponse.js";

// message S_DespawnNotification{
//     repeated int32 playerIds = 1;
// }

export const despawnHandler = async (socket) => {
  const user = await getUserBySocket(socket);

  //despawnUser에 id값 넣어주기
  const despawnUser = [];
  despawnUser.push(user.id);
 
  try{
    const otherPlayers = await getAllUserExceptMyself(user.id);
    const despawnNotification = sendResponsePacket(PACKET_TYPE.S_DespawnNotification, {
      playerIds: despawnUser,
    });

    for(const session of otherPlayers){
      session.socket.write(despawnNotification);
    }

    //타운세션에서 유저 삭제
    await removeUser(user.id)
  }catch(err){
    console.error(err);
  }
}