export const onEnd = (socket) => async () => {
    console.log(`Client disconnected: ${socket.remoteAddress}`);
};
