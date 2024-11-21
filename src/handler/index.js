
import { PACKET_TYPE } from "../constants/header.js";
import { enter } from "./game/enter.handler.js";
import { loginHandler } from './user/loginHandler.js';
import { registerHandler } from './user/registerHandler.js';
import { PACKET_TYPE } from '../constants/header.js';

const handlers = {
    [PACKET_TYPE.C_EnterRequest]: {
        handler: enter,
        protoType: 'game.C_EnterRequest'
    },
    //회원가입 및 로그인
    [PACKET_TYPE.REGISTER_REQUEST]: { handler: registerHandler },
    [PACKET_TYPE.LOGIN_REQUEST]: { handler: loginHandler }

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