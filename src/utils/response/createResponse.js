import { getProtoMessagesById } from '../../init/loadProtos.js';
import { config } from '../../config/config.js'

const sendResponsePacket = (packetId, data = null) => {
  const messageType = getProtoMessagesById(packetId);

  // packetData 인코딩
  let packetData;
  try {
    packetData = messageType.encode(data).finish();
  } catch (err) {
    console.error('Error sending response packet', err);
  }

  // packetSize 계산(PacketSize(4byte) + PacketId(1byte) + PacketData)
  const packetSize = config.packet.packetSizeLength + config.packet.packetIdLength + packetData.length;

  // PacketSize 쓰기(빅 엔디안, PacketSize = 4byte)
  const packetSizeBuffer = Buffer.alloc(config.packet.packetSizeLength);
  packetSizeBuffer.writeUInt32BE(packetSize, 0);

  // PacketId 쓰기(1byte)
  const pacektIdBuffer = Buffer.alloc(config.packet.packetIdLength);
  pacektIdBuffer.writeUInt8(packetId, 0);

  // 패킷 합치기(PacketSize + PacketId + PacketData)
  const responsePacketBuffer = Buffer.concat([packetSizeBuffer, pacektIdBuffer, packetData]);

  return responsePacketBuffer;

};

export default sendResponsePacket;
