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

}

export const PACKET_ID = {
    0: 'C_Enter',
    1: 'S_Enter',
    2: 'S_SpawnNotification',
    5: 'S_DespawnNotification',
    6: 'C_MoveRequest',
    7: 'S_MoveResponse',
    8: 'C_AnimationRequest',
    9: 'S_AnimationResponse',
    14: 'erqwerqass',
}