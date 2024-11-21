export const onEnd = (socket) => {
    console.log(`Client disconnected: ${socket.remoteAddress}`);
};
