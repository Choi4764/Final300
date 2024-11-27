import { LoginHandler } from './user/loginHandler.js';
import { RegisterHandler } from './user/registerHandler.js';
import { ChatHandler } from './character/chat.handler.js';
import { EquipItemHandler, UnequipItemHandler } from "./character/ItemEquip.handler.js";
import { BuyItemHandler, SellItemHandler } from "./shop/Shop.handler.js";
import { PACKET_TYPE } from '../constants/header.js';
import { enterTownHandler } from "./game/enter.handler.js"

//패킷 타입이 핸들러를 호출 할 수 있게 연결함
const  CallHandler = {
    [PACKET_TYPE.C_EnterRequest]: { handler: enterTownHandler },
    //회원가입 및 로그인
    [PACKET_TYPE.C_registerRequest]: { handler: RegisterHandler },
    [PACKET_TYPE.C_loginRequest]: { handler: LoginHandler },
      
    [PACKET_TYPE.C_chatHandler]: { handler: ChatHandler },
    [PACKET_TYPE.C_BuyItemRequest]:{ handler: BuyItemHandler },
    [PACKET_TYPE.C_SellItemRequest]:{ handler: SellItemHandler },
    [PACKET_TYPE.C_EquipItemRequest]:{ handler: EquipItemHandler },
    [PACKET_TYPE.C_UnequipItemRequest]:{ handler: UnequipItemHandler },

}

export const getHandlerByPacketType = (packetType) => {
    if (!CallHandlers[packetType]) {
        throw Error();
    }
    return handlers[packetType].handler;
};

export const getProtoTypeNameByHandlerId = (packetType) => {
    if (!CallHandlers[packetType]) {
        throw Error();
    }
    return handlers[packetType].protoType;
}