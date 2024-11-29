import { EquipItemHandler, UnequipItemHandler } from "./character/ItemEquip.handler.js";
import { BuyItemHandler, SellItemHandler } from "./shop/Shop.handler.js";
import { PACKET_TYPE } from '../constants/header.js';
import { enterTownHandler } from "./game/enter.handler.js"
import { moveHandler } from "./game/move.handler.js";
import { ChatHandler } from './character/chat.handler.js';/*
import { RegisterHandler } from './user/registerHandler.js';
import { LoginHandler } from './user/loginHandler.js';
*/
//패킷 타입이 핸들러를 호출 할 수 있게 연결함

const CallHandler = {
    [PACKET_TYPE.C_EnterRequest]: { handler: enterTownHandler, packetType: 'game.C_EnterRequest' },
    [PACKET_TYPE.C_MoveRequest]: { handler: moveHandler, packetType: 'game.C_MoveRequest' },
    /*    //회원가입 및 로그인
        [PACKET_TYPE.C_registerRequest]: { handler: RegisterHandler },
        [PACKET_TYPE.C_loginRequest]: { handler: LoginHandler },
    */
    [PACKET_TYPE.C_ChatRequest]: { handler: ChatHandler },
    [PACKET_TYPE.C_BuyItemRequest]: { handler: BuyItemHandler },
    [PACKET_TYPE.C_SellItemRequest]: { handler: SellItemHandler },
    [PACKET_TYPE.C_EquipItemRequest]: { handler: EquipItemHandler },
    [PACKET_TYPE.C_UnequipItemRequest]: { handler: UnequipItemHandler },
}

export const getHandlerByPacketType = (packetType) => {
    if (!CallHandler[packetType] || !CallHandler[packetType].handler) {
        console.error(`handler not found id : ${packetType}`);
    } else {
        console.log(`find handler ${packetType}`);
    };
    return CallHandler[packetType].handler;
};

export const getProtoTypeNameByHandlerId = (packetType) => {
    if (!CallHandler[packetType]) {
        throw Error();
    }
    return handlers[packetType].protoType;
}