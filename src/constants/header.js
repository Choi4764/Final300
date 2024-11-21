export const PACKET_TYPE_SIZE = 2;
export const VERSION_LENGTH_SIZE = 1;
export const SEQUENCE_SIZE = 4;
export const PAYLOAD_LENGTH_SIZE = 4;

export const PACKET_TYPE = {
    // 회원가입 및 로그인
    REGISTER_REQUEST: 1,
    REGISTER_RESPONSE: 2,
    LOGIN_REQUEST: 3,
    LOGIN_RESPONSE: 4,

    //상태동기화
    STATE_SYNC_NOTIFICATION: 5,
  
    //파티
    PARTY_REQUEST: 6,
    PARTY_RESPONSE: 7,

    
};