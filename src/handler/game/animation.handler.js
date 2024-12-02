// message C_AnimationRequest{
//     int32 aniCode = 1;
// }
// message S_AnimationResponse{
//     int32 playerId = 1;
//     int32 aniCode = 2;
// }

import { PACKET_TYPE } from "../../constants/header.js";
import { townSession } from "../../sessions/sessions.js";
import { getUserBySocket } from "../../sessions/town.session.js";
import sendResponsePacket from "../../utils/response/createResponse.js";

export const animationHandler = async ({socket, payload}) => {

  const user = await getUserBySocket(socket);
  if(!user){
    console.error('not found user by animationHandler.');
    return;
  }

  const animationResponse = sendResponsePacket(PACKET_TYPE.S_AnimationResponse, {
    playerId: user.id,
    aniCode: payload.aniCode,
  });

  if(!townSession){
    console.error(`not found townSession by animationHandler.`);
  }
  townSession.users.forEach((targetUser) => {
    try{
        targetUser.socket.write(animationResponse);
    }catch(err){
        console.error(err);
    }
  })
}