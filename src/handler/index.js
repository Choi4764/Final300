import { C_loginHandler } from './user/loginHandler.js';
import { C_registerHandler } from './user/registerHandler.js';
import { C_enterRequest } from "./game/enter.handler.js";
import { C_chatHandler } from './character/chat.handler.js';
import { PACKET_TYPE } from '../constants/header.js';

const handlers = {
    [PACKET_TYPE.C_enterRequest]: { handler: enterHandler },
    //회원가입 및 로그인
    [PACKET_TYPE.C_registerRequest]: { handler: registerHandler },
    [PACKET_TYPE.C_loginRequest]: { handler: loginHandler },
    [PACKET_TYPE.C_chatHandler]: { handler: chatHandler }

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
}