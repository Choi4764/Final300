import { PACKET_TYPE } from '../../constants/header.js';
import { getProtoMessages } from '../../init/loadProtos.js';
import { serializer } from '../serializer.js';

const sendResponsePacket = (socket, packetType, responseMessage) => {
  try {
    const protoMessages = getProtoMessages();

    if(!protoMessages[packetType]){
      console.error(`유효하지 않은 패킷 타입: ${packetType}`);
      throw new Error(`유효하지 않은 패킷 타입: ${packetType}`);
    }

    const GamePacket = protoMessages.test.GamePacket;

    const responseGamePacket = GamePacket.create(responseMessage);
    const gamePacketBuffer = GamePacket.encode(responseGamePacket).finish();

    const serializedPacket = serializer(gamePacketBuffer, packetType);
    socket.write(serializedPacket);

    console.log(`Sent packet of type ${PACKET_TYPE[packetType]} to client.`);
  } catch (error) {
    console.error('Error sending response packet', error);
  }
};

export default sendResponsePacket;
