import { onData } from './onData.js'
import { onEnd } from './onEnd.js'
import { onError } from './onError.js'

export const onConnection = (socket) => {
    console.log(`Client connected from : ${socket.remoteAddress}, ${socket.remotePort}`);

    // Initialize buffer for the socket
    socket.buffer = Buffer.alloc(0);

    // Attach event handlers
    socket.on('data', onData(socket));
    socket.on('end', onEnd(socket));
    socket.on('error', onError(socket));
}