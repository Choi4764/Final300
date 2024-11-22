import { PACKET_TYPE, PACKET_TYPE_LENGTH,  } from "../constants/header.js";

export const serializer = (message, packetSize, packetId = 1) => {
    //packetsize = 4bytes
    const packetSizeBuffer = Buffer.alloc(4);
    packetSizeBuffer.writeUint32BE(packetSize, 0);

    //packetid = 1bytes
    const packetIdBuffer = Buffer.alloc(1);
    packetIdBuffer.writeUInt8(packetId, 0);

    return Buffer.concat([
        packetSizeBuffer,
        packetIdBuffer,
        message,
    ]);
};