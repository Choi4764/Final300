import { PACKET_TYPE } from "../../../constants/header.js";
import sendResponsePacket from "../../../utils/response/createResponse.js";
import { CommandMap } from "./Command.map.js"

export const Help = async (sender) => {
    const CommandList = CommandMap;

    const response = sendResponsePacket(PACKET_TYPE.S_ChatResponse, {
        playerId: sender.playerId,
        chatMsg: `${CommandList}`
    });
    sender.socket.write(response)
}