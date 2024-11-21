import { onData } from "./onData.js";
import { onEnd } from "./onEnd.js";
import { onError } from "./onError.js";


export const onConnection = async (socket) => {
    console.log(`Client connected from: ${socket.remoteAddress}`);

    // Initialize buffer for the socket
    socket.buffer = Buffer.alloc(0);

    // Attach event handlers
    socket.on('data', (data) => onData(socket, data));
    socket.on('end', () => onEnd(socket));
    socket.on('error', (err) => onError(socket, err));
};
