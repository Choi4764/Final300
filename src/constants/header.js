export const TOTAL_LENGTH = 4;
export const PACKET_TYPE_LENGTH = 1;

export const PACKET_TYPE = {
    C_EnterRequest: 0,
    S_EnterResponse: 1,

    S_SpawnNotification: 2,
    S_DespawnNotification: 5,

    C_MoveRequest: 6,
    S_MoveResponse: 7,

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

