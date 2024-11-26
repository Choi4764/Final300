import { getProtoMessagesById } from '../../init/loadProtos.js';

export const packetParser = (packetId, data) => {
  // packetId로 messageType가져오기
  const messageType = getProtoMessagesById(packetId);

  if(!messageType){
    console.error(`Unsupported PacketId: ${packetId}`);
  }

  let messageData;
  
  try{
    messageData = messageType.decode(data);
  } catch (err) {
    console.error(`PacketId ${packetId} Decoding error:`, err);
    throw e;
  }

  return messageData;
};