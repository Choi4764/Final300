export const PACKET_SIZE_LENGTH = 4; // 패킷의 사이즈(4byte)
export const PACKET_ID_LENGTH = 1; // 패킷의 아이디 (1byte)
export const PACKET_HEADER_LENGTH = 5; // 헤더의 길이 (4+1)

export const PACKET_TYPE = {
    C_Enter: 0,
    S_Enter: 1,

    S_Spawn: 2,
    S_Despawn: 5,

    C_Move: 6,
    S_Move: 7,

    C_AnimationRequest: 8,
    S_AnimationResponse: 9,
    
    C_EquipItemRequest: 41,
    S_EquipItemResponse: 42,

    C_UnequipItemRequest: 43,
    S_UnequipItemResponse: 44,

    C_BuyItemRequest: 45,
    S_BuyItemResponse: 46,

    C_SellItemRequest: 47,
    S_SellItemResponse: 48,


}