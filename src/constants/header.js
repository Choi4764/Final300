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
}

export const PACKET_ID = {
    0: 'C_EnterRequest',
    1: 'S_EnterResponse',
    2: 'S_SpawnNotification',
    5: 'S_DespawnNotification',
    6: 'C_MoveRequest',
    7: 'S_MoveResponse',
    8: 'C_AnimationRequest',
    9: 'S_AnimationResponse',
}