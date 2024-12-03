export const onError = (socket) => async (err) => {
    console.error(`Error on connection with ${socket.remoteAddress}:`, err.message);
};
