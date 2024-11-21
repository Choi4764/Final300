import { PACKET_SIZE_LENGTH, PACKET_ID_SIZE } from '../constants/header.js';
import { getHandlerByPacketType } from '../handler/index.js';

export const onData = (socket) => async (data) => {
  socket.buffer = Buffer.concat([socket.buffer, data]);
  // const initialHeaderLength = TOTAL_LENGTH;

  // while (socket.buffer.length > initialHeaderLength) {
  //   console.log(socket.buffer);

  //   const packetType = socket.buffer.readUInt16BE(0);
  //   console.log(`packetType: ${PACKET_ID[packetType]}`);

    const totalHeaderLength = PACKET_SIZE_LENGTH + PACKET_ID_SIZE;

    while (socket.buffer.length > totalHeaderLength) {

      
      // 패킷의 전체 길이 (헤더와 payload 길이를 포함)
      const length = socket.buffer.readUInt32BE(0);
      if (socket.buffer.length >= length) {
        // 헤더부터 끝까지
        const payloadStart = totalHeaderLength;
        let payload = socket.buffer.subarray(payloadStart, length);

        socket.buffer = socket.buffer.subarray(length);
        try {
          const handler = getHandlerByPacketType(packetType);
          handler({ socket, payload });
        } catch (error) {
          console.error(error);
        }
      } else {
        break;
      }
      break;
    }
  //}
};
