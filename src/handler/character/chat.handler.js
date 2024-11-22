import CustomError from '../../utils/error/customError.js';
import { ErrorCodes } from '../../utils/error/errorCodes.js';
import { handleError } from '../../utils/error/errorHandler.js';

export const chatHandler = ({ socket, payload }) => {
    const { playerId, chatContext } = payload;

    try {
        const { chatContext } = packet;

        const user = getUserById(playerId);
        if (!user) {
          throw new CustomError(ErrorCodes.USER_NOT_FOUND, '유저를 찾을 수 없습니다.');
        }
    
        const gameSession = user.getSession();
        if (!gameSession) {
          throw new CustomError(ErrorCodes.GAME_NOT_FOUND, '세션을 찾을 수 없습니다.');
        }
    
        gameSession.chatPlayer(playerId, chatContext);
      } catch (error) {
        handleError(socket, error);
    }
};