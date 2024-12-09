import { InventoryItems, Character } from '../../db/model/model.js';
import { getUserByNickname } from '../../sessions/user.session.js';
import sendResponsePacket from '../../utils/response/createResponse.js';
import { PACKET_TYPE } from '../../constants/header.js';

/**
 * 인벤토리 생성 핸들러
 * @param {Object} data - 클라이언트로부터 받은 요청 데이터
 * @returns {Object} - 처리 결과를 반환
 */
export const CreateInventoryHandler = async (data) => {
    const { nickname } = data;

    if (!nickname) {
        return { success: false, message: 'nickname은 필수입니다.' };
    }

    try {
        const character = await Character.findOne({ where: { nickname } });
        if (!character) {
            return { success: false, message: '캐릭터를 찾을 수 없습니다.' };
        }

        const existingInventory = await InventoryItems.findOne({ where: { nickname } });
        if (existingInventory) {
            return { success: false, message: '이미 인벤토리가 존재합니다.' };
        }

        await InventoryItems.create({
            nickname,
            itemId: 0,
            PotionId: '',
            quantify: 0,
        });

        return { success: true, message: '인벤토리가 성공적으로 생성되었습니다.' };
    } catch (error) {
        console.error(error);
        return { success: false, message: '서버 오류가 발생했습니다.' };
    }
};

/**
 * 인벤토리 조회 핸들러
 * @param {Object} data - 클라이언트로부터 받은 요청 데이터
 * @returns {Object} - 처리 결과를 반환
 */
export const GetInventoryHandler = async (data) => {
    const { nickname } = data;

    if (!nickname) {
        return { success: false, message: 'nickname은 필수입니다.' };
    }

    try {
        const inventory = await InventoryItems.findAll({ where: { nickname } });
        if (!inventory || inventory.length === 0) {
            return { success: false, message: '인벤토리를 찾을 수 없습니다.' };
        }

        return { success: true, message: '인벤토리를 성공적으로 조회했습니다.', inventory };
    } catch (error) {
        console.error(error);
        return { success: false, message: '서버 오류가 발생했습니다.' };
    }
};

/**
 * 아이템 추가 핸들러
 * @param {Object} data - 클라이언트로부터 받은 요청 데이터
 * @returns {Object} - 처리 결과를 반환
 */
export const AddItemToInventoryHandler = async (data) => {
    const { nickname, itemId, PotionId, quantify } = data;

    if (!nickname || (!itemId && !PotionId) || !quantify) {
        return { success: false, message: '필수 데이터가 누락되었습니다.' };
    }

    try {
        const inventory = await InventoryItems.findOne({ where: { nickname, itemId, PotionId } });

        if (inventory) {
            await InventoryItems.update(
                { quantify: inventory.quantify + quantify },
                { where: { nickname, itemId, PotionId } }
            );
        } else {
            await InventoryItems.create({ nickname, itemId, PotionId, quantify });
        }

        return { success: true, message: '아이템이 인벤토리에 성공적으로 추가되었습니다.' };
    } catch (error) {
        console.error(error);
        return { success: false, message: '서버 오류가 발생했습니다.' };
    }
};

/**
 * 채팅 명령어 처리 핸들러
 * @param {Object} socket - 클라이언트 소켓
 * @param {Object} payload - 클라이언트로부터 받은 데이터
 */
export const InventoryCommandHandler = async ({ socket, payload }) => {
    const { chatContext } = payload;
    const [command, nickname, ...args] = chatContext.split(' ');

    if (!nickname) {
        const response = sendResponsePacket(PACKET_TYPE.S_ChatResponse, {
            chatContext: '닉네임이 필요합니다.',
        });
        socket.write(response);
        return;
    }

    try {
        let result;

        switch (command) {
            case '/inventoryCreate':
                result = await CreateInventoryHandler({ nickname });
                break;

            case '/inventoryView':
                result = await GetInventoryHandler({ nickname });
                break;

            case '/itemCreate':
                const [itemId, PotionId, quantify] = args;
                result = await AddItemToInventoryHandler({
                    nickname,
                    itemId: parseInt(itemId, 10) || null,
                    PotionId: PotionId || null,
                    quantify: parseInt(quantify, 10),
                });
                break;

            default:
                const defaultResponse = sendResponsePacket(PACKET_TYPE.S_ChatResponse, {
                    chatContext: '알 수 없는 명령어입니다.',
                });
                socket.write(defaultResponse);
                return;
        }

        const response = sendResponsePacket(PACKET_TYPE.S_ChatResponse, {
            chatContext: result.message,
        });
        socket.write(response);

        if (result.inventory) {
            // 인벤토리 목록 전송
            result.inventory.forEach((item) => {
                const itemResponse = sendResponsePacket(PACKET_TYPE.S_ChatResponse, {
                    chatContext: `아이템: ${item.itemId}, 수량: ${item.quantify}`,
                });
                socket.write(itemResponse);
            });
        }
    } catch (error) {
        console.error(error);
        const errorResponse = sendResponsePacket(PACKET_TYPE.S_ChatResponse, {
            chatContext: '명령어 처리 중 오류가 발생했습니다.',
        });
        socket.write(errorResponse);
    }
};

export default {
    CreateInventoryHandler,
    GetInventoryHandler,
    AddItemToInventoryHandler,
    InventoryCommandHandler,
};
