import CustomError from '../../utils/error/customError.js';
import { ErrorCodes } from '../../utils/error/errorCodes.js';
import { handleError } from '../../utils/error/errorHandler.js';
import { getUserById, getUserBySocket } from '../../sessions/user.session.js';
import { getGameSession } from '../../sessions/game.session.js';
import { townSession } from '../../sessions/sessions.js';
import sendResponsePacket from '../../utils/response/createResponse.js';
import { PACKET_TYPE } from '../../constants/header.js';

export const C_moveHandler = async ({ socket, payload }) => {
    try {
        const { transform } = payload;
        const userId = getUserById(playerId);
        if (!userId) {
            throw new Error('player not found');
        }

        const gameSession = getGameSession(townSession);
        if (!gameSession) {
            throw new Error('session not fouond');
        }

        const user = await getUserBySocket(socket);

        gameSession.transform[user.playerId] 

        const moveResponse = sendResponsePacket(PACKET_TYPE.S_MoveResponse, {
            playerId: user.playerId,
            transform
        });

        
    } catch (error) {
        handleError(socket, error);
    }
}