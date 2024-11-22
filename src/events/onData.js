import { config } from '../config/config.js';
import { getHandlerByPacketType } from '../handler/index.js';
import { handleError } from '../utils/error/errorHandler.js';
import { packetParser } from '../utils/parser/packetParser.js';

export const onData = (socket) => async (data) => {
  socket.buffer = Buffer.concat([socket.buffer, data]);
  const totalHeaderLength = config.packet.totalLength + config.packet.typeLength;

  while (socket.buffer.length >= totalHeaderLength) {
    const length = socket.buffer.readUInt32LE(0);
    const packetId = socket.buffer.readUInt8(config.packet.totalLength);

    if (socket.buffer.length >= length) {
      const packet = socket.buffer.slice(totalHeaderLength, length);
      socket.buffer = socket.buffer.slice(length);

      try {
        const { payload } = packetParser(packet, packetId);

        const handler = getHandlerByPacketType(packetId);
        await handler({ socket, payload });
      } catch (err) {
        handleError(socket, err);
      }
    } else {
      break;
    }
  }
};