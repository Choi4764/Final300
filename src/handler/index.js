import { PACKET_TYPE } from "../constants/header.js";
import { EquipItemHandler, UnequipItemHandler } from "./character/ItemEquip.handler.js";
import { BuyItemHandler, SellItemHandler } from "./shop/Shop.handler.js";
import { enterTownHandler } from "./game/enter.handler.js"

//패킷 타입이 핸들러를 호출 할 수 있게 연결함
const  CallHandler = {
    [PACKET_TYPE.C_EnterRequest]: { handler: enterTownHandler },
    [PACKET_TYPE.C_BuyItemRequest]:{ handler: BuyItemHandler },
    [PACKET_TYPE.C_SellItemRequest]:{ handler: SellItemHandler },
    [PACKET_TYPE.C_EquipItemRequest]:{ handler: EquipItemHandler },
    [PACKET_TYPE.C_UnequipItemRequest]:{ handler: UnequipItemHandler },

    }

export const getHandlerByPacketType = (PacketType) => {
    if (!CallHandler[PacketType] || !handler[packetType].handler) {
      throw Error();
    }
    return CallHandler[packetType].handler;
};
  // 콘솔 로그 호출용
export const getProtoTypeNameByHandlerId = (PacketType) => {
    if (!CallHandler[PacketType]) {
      throw Error();
    }
    return CallHandler[packetType].protoType;
};