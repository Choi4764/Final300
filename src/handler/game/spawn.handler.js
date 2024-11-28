import { PACKET_TYPE } from "../../constants/header.js";
import { getAllUserExceptMyself } from "../../sessions/town.session.js"
import { playerData } from "../../utils/packet/playerPacket.js";
import sendResponsePacket from "../../utils/response/createResponse.js";

// OTHERS
// message S_Spawn {
//     repeated PlayerInfo players = 1;
// }

export const spawnOtherPlayerHandler = async (newUser) => {
    const otherPlayers = await getAllUserExceptMyself(newUser.id);

    const newPlayerData = playerData(newUser);

    const spawnResponse = sendResponsePacket(PACKET_TYPE.S_Spawn, {
        players: [newPlayerData]
    });
    // 다른플레이어 정보가 있으면 spawnResponse전송
    for(const user of otherPlayers){
        user.socket.write(spawnResponse);
    }
}