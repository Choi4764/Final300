import CustomError from '../../utils/error/customError.js';
import { ErrorCodes } from '../../utils/error/errorCodes.js';
import { handleError } from '../../utils/error/errorHandler.js';
import { getAllUsers, getUserById, getUserByNickname } from '../../sessions/user.session.js';
import { getGameSession } from '../../sessions/game.session.js';
import { townSession } from '../../sessions/sessions.js';
import sendResponsePacket from '../../utils/response/createResponse.js';
import { PACKET_TYPE } from '../../constants/header.js';

export const ChatHandler = async ({ socket, payload }) => {
  const { playerId, chatContext } = payload;

  try {
    const sender = await getUserById(playerId);
    if (!sender) throw new Error('player not found');

    const gameSession = getGameSession(townSession);
    if (!gameSession) throw new Error('session not found');

    if (chatContext[0] === '/') {//명령어 부분 추후 작성

    }
    else {
      chatAll(sender, chatContext);
    }
  } catch (error) {
    handleError(socket, error);
  }
};

async function chatAll(sender, context) {
  try {
    const allUsers = getAllUsers();

    const chatResponse = sendResponsePacket(PACKET_TYPE.S_ChatResponse, {
      playerId: sender.playerId,
      chatContext: `[전체] ${sender.nickname}: ${context}`
    });

    allUsers.forEach((user) => {
      user.socket.write(chatResponse);
    });


  } catch (error) {
  }
};