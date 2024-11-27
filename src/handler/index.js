import { PACKET_TYPE } from "../constants/header.js";
import { enterTownHandler } from "./game/enter.handler.js";
import { moveHandler } from "./game/move.handler.js";

const Callhandler = {
  //패킷 타입 추가
    [PACKET_TYPE.C_Enter]: { 
      handler: enterTownHandler,
      packetType: 'game.C_Enter',
    },
    [PACKET_TYPE.C_Move]:{
      handler: moveHandler,
      packetType: 'game.C_Move',
    },
}

export const getHandlerByPacketType = (packetType) => {
    if (!Callhandler[packetType] || !Callhandler[packetType].handler) {
      console.error(`handler not found id : ${packetType}`);
    }else{
      console.log(`find handler ${packetType}`);
    };
    return Callhandler[packetType].handler;
};