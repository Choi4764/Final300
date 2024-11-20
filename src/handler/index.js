import { PACKET_TYPE } from "../constants/header.js";
import { enter } from "./game/enter.handler.js"

const handlers = {
    [PACKET_TYPE.C_EnterRequest]: {
        handler: enter,
        protoType: 'game.C_EnterRequest'
    },
}

export const getHandlerByPacketType = (packetType) => {
    if (!handlers[packetType]) {
      throw Error();
    }
    return handlers[packetType].handler;
};
  
export const getProtoTypeNameByHandlerId = (packetType) => {
    if (!handlers[packetType]) {
      throw Error();
    }
    return handlers[packetType].protoType;