import { loginHandler } from './user/loginHandler.js'
import { registerHandler } from './user/registerHandler.js'
import { PACKET_TYPE } from '../constants/header.js';

const handlers = {
    //회원가입 및 로그인
    [PACKET_TYPE.REGISTER_REQUEST]: { handler: registerHandler },
    [PACKET_TYPE.LOGIN_REQUEST]: { handler: loginHandler }

}

export const getProtoTypeNameByPacketType = (packetType) => {
    if (!handlers[packetType]) {
        throw Error();
    }
    return handlers[packetType].handler;
};