import { PACKET_TYPE } from "../../constants/header.js";
import { getAllUserExceptMyself, getUserBySocket } from "../../sessions/town.session.js";
import sendResponsePacket from "../../utils/response/createResponse.js";


// message C_Move{
//     TransformInfo transform = 1;
// }
// message S_Move{
//     int32 playerId = 1;
//     TransformInfo transform = 2;
// }


export const moveHandler = async({socket, payload}) => {
    const {transform} = payload;

    const user = await getUserBySocket(socket);
    if(!user){
        console.error(`not Found User.`);
        return;
    }

    user.position.posX = transform.posX;
    user.position.posY = transform.posY;
    user.position.posZ = transform.posZ;
    user.position.rot = transform.rot;

    // S_Move 데이터
    const playerMove = {
        playerId: user.id,
        transform: {
            posX: user.position.posX,
            posY: user.position.posY,
            posZ: user.position.posZ,
            rot: user.position.rot,
        },
    };

    const moveResponse = sendResponsePacket(PACKET_TYPE.S_Move,{
        playerMove,
    });

    const otherPlayers = await getAllUserExceptMyself(user.id);
    //다른 플레이어가 존재하면 해당 플레이어에게도 moveResponse를 쏴줌.
    for(const otherPlayer of otherPlayers){
        otherPlayer.socket.write(moveResponse);
    }
}