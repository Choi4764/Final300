import CustomError from '../../utils/error/customError.js';
import { ErrorCodes } from '../../utils/error/errorCodes.js';
import { handleError } from '../../utils/error/errorHandler.js';
import { getAllUsers, getUserBySocket } from '../../sessions/user.session.js';
import { getGameSession } from '../../sessions/game.session.js';
import { townSession } from '../../sessions/sessions.js';
import sendResponsePacket from '../../utils/response/createResponse.js';
import { PACKET_TYPE } from '../../constants/header.js';
import { CommandMap } from './commands/Command.map.js';

export const ChatHandler = async ({ socket, payload }) => {
  const { chatMsg } = payload;

  try {
    const sender = await getUserBySocket(socket);
    if (!sender) throw new Error('player not found');

    const gameSession = getGameSession(townSession);
    if (!gameSession) throw new Error('session not found');

    if (chatMsg[0] === '/') {//명령어 작성ing
      const { CommandName, CommandTarget } = CommandDefine(chatMsg);

      const CommandHandler = CommandMap.get(CommandType);
      if (!CommandHandler) {
        const InvalidCommand = sendResponsePacket(PACKET_TYPE.S_ChatResponse, {
          chatMsg: `[시스템] 명령어가 존재하지 않습니다. /help로 명령어 목록을 확인하세요.`
        });
        user.socket.write(InvalidCommand);
        return;
      }
      CommandHandler(chatMsg);
    }

    else {
      const chatResponse = sendResponsePacket(PACKET_TYPE.S_ChatResponse, {
        chatMsg: `${chatMsg}`
      });

      townSession.users.forEach((user) => {
        user.socket.write(chatResponse);
      });
    }
  } catch (error) {
    handleError(socket, error);
  }
};

const CommandDefine = (command) => {
  const CommandFin = command.indexOf(' ');
  const CommandName = CommandFin !== -1 ? command.substring(0, Space) : command;
  const CommandTarget = CommandFin !== -1 ? command.substring(Space + 1) : '';

  return { CommandName, CommandTarget };
};