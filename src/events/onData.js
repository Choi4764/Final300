import { config } from '../config/config.js';
import { packetParser } from '../utils/parser/packetParser.js';
import { getHandlerByPacketType } from '../handler/index.js';

export const onData = (socket) => (data) => {

  // 기존 socket.buffer에 data를 넣겠다.
  socket.buffer = Buffer.concat([socket.buffer, data]);
  // 무한루프 반복문
  while(true){
    // 버퍼의 길이가 최소 패킷 크기보다 작다면
    if(socket.buffer.length < config.packet.packetHeaderLength){
      break;
    }

    let offset = 0;

    // PacketSize 읽기(리틀 엔디안, PacketSize = 4byte)
    const packetSize = socket.buffer.readUInt32LE(offset);
    offset += config.packet.packetSizeLength;
    
    // 패킷사이즈가 0보다 작을 때 유효성검사
    if(packetSize <= 0){
      console.error(`Invalid packet size: ${packetSize}`);
      socket.buffer = socket.buffer.subarray(offset);
      continue;
    }

    // 전체 패킷 크기 = PacketSizeLength(4byte) + packetSize
    const totalPacketLength = config.packet.packetSizeLength + packetSize;
    console.log(`totalpacketlength : ${totalPacketLength}`);
    console.log(`config : ${config.packet.packetSizeLength}`);
    console.log(`packetsize : ${packetSize}`);
    console.log(`scoketbuffer : ${socket.buffer}`);
    // 버퍼의 길이가 전체 패킷보다 작다면(아직 전체 패킷이 도착하지 않았다면)
    if(socket.buffer.length > totalPacketLength){
      break;
    }
    // PacketId 읽기(PacketId = 1byte)
    const packetId = socket.buffer.readUInt8(offset);
    offset += config.packet.packetIdLength;

    // 패킷은 Protobuf 로 제작되며 
    // 앞에 4바이트는 패킷의 사이즈,
    //그 다음 1바이트는 패킷의 아이디가 담기며,
    //이 후 패킷데이터가 포함됩니다. 

    // PacketData 가져오기
    // PacketData의 길이 = PacketId를 제외한 패킷의 크기
    const dataLength = packetSize - config.packet.packetIdLength;
    const packetData = socket.buffer.subarray(offset, offset + dataLength);

    // 다음 패킷을 위해 버퍼 업데이트
    socket.buffer = socket.buffer.subarray(totalPacketLength);

    try{
      const messageData = packetParser(packetId, packetData);

      // 패킷ID에 맞는 핸들러 가져오기
      const handler = getHandlerByPacketType(packetId);

      if(handler){
        handler({socket, payload: messageData});
      }else{
        console.error(`Handler not found: PacketId ${packetId}`);
      }
    } catch (err){
      console.error(err);
    }

  }
};