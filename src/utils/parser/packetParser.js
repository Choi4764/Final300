import { config } from '../../config/config.js';
import { getProtoTypeNameByHandlerId } from '../../handler/index.js';
import { getProtoMessages } from '../../init/loadProtos.js';
import CustomError from '../error/customError.js';
import { ErrorCodes } from '../error/errorCodes.js';
import { PACKET_TYPE } from '../../constants/header.js';

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

  return { payload };
};
