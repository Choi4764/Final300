import CustomError from '../../utils/error/customError.js';
import { ErrorCodes } from '../../utils/error/errorCodes.js';
import { handleError } from '../../utils/error/errorHandler.js';
import { getAllUsers, getUserByUserId } from '../../sessions/user.session.js';
import { getGameSession } from '../../sessions/game.session.js';
import { townSession } from '../../sessions/sessions.js';
import sendResponsePacket from '../../utils/response/createResponse.js';

export const ChatHandler = async ({ socket, payload }) => {
    const { playerId, chatContext } = payload;
  
    try {
        const sender = await getUserByUserId(playerId);
        if (!sender) throw new Error('player not found');

        const gameSession = getGameSession(townSession);
        if(!gameSession) throw new Error('session not found');

        if(chatContext[0] === '/'){

        }
        else{
          chatAll(sender, chatContext);
        }
      } catch (error) {
        handleError(socket, error);
    }
};

export async function chatAll(sender, context) {
    try{
        const allUsers = getAllUsers();

        const chatResponse = sendResponsePacket('response', 'S_ChatResponse', {
          playerId: sender.playerId,
          chatContext: `${sender.nickname}: ${context}`
        });

        allUsers.forEach((user) => {
          user.socket.write(chatResponse);
        });
    } catch (error) {
        handleError(socket, error);
    }
};