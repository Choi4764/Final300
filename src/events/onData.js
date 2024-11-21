export const onData = (socket, data) => {
    console.log(`Data received from ${socket.remoteAddress}: ${data}`);
    socket.buffer = Buffer.concat([socket.buffer, data]);
};
