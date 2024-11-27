import { PACKET_TYPE } from "../constants/header.js";
import { enterTownHandler } from "./game/enter.handler.js"

const Callhandler = {
    [PACKET_TYPE.C_Enter]: { 
      handler: enterTownHandler,
      packetType: 'game.C_Enter',
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