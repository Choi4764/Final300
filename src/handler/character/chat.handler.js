import CustomError from '../../utils/error/customError.js';
import { ErrorCodes } from '../../utils/error/errorCodes.js';
import { handleError } from '../../utils/error/errorHandler.js';
import { getUserById } from '../../sessions/user.session.js';
import { getGameSession } from '../../sessions/game.session.js';
import { TOWN_SESSION_ID } from '../../constants/session.js';

export const C_chatHandler = async ({ socket, payload }) => {
    const { playerId, chatContext } = payload;
  
    try {
        const sender = await getUserById(playerId);
        if (!sender) throw new Error('player not found');

        const gameSession = getGameSession(TOWN_SESSION_ID);
        if(!gameSession) throw new Error('session not found');

        if(chatContext[0] === '/'){}
    
        gameSession.chatPlayer(playerId, chatContext);
      } catch (error) {
        handleError(socket, error);
    }
};