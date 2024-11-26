import { getProtoMessages } from "../../init/loadProtos.js"



export const createGameData = (socket) => {
    const protoMessages = getProtoMessages();
    const PlayerInfo = protoMessages.game.PlayerInfo;

    const playerInfo = PlayerInfo.create({
        //game.seesion에 playerstate만들기, constants/playerInfo값넣기(TDREMASTER참고) 
    })
}