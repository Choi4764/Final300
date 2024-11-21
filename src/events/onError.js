export const onError = (socket, err) => {
    console.error(`Error on connection with ${socket.remoteAddress}:`, err.message);
};
