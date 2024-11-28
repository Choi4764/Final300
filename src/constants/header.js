export const PACKET_SIZE_LENGTH = 4; // 패킷의 사이즈(4byte)
export const PACKET_ID_LENGTH = 1; // 패킷의 아이디 (1byte)
export const PACKET_HEADER_LENGTH = 5; // 헤더의 길이 (4+1)

export const PACKET_TYPE = {
    C_EnterRequest: 0,
    S_EnterResponse: 1,

    S_SpawnNotification: 2,
    S_DespawnNotification: 5,

    C_MoveRequest: 6,
    S_MoveResponse: 7,

    C_AnimationRequest: 8,
    S_AnimationResponse: 9,

    C_ChatRequest: 20,
    S_ChatResponse: 21,

    C_EquipItemRequest: 41,
    S_EquipItemResponse: 42,

    C_UnequipItemRequest: 43,
    S_UnequipItemResponse: 44,

    C_BuyItemRequest: 45,
    S_BuyItemResponse: 46,

    C_SellItemRequest: 47,
    S_SellItemResponse: 48,

}
