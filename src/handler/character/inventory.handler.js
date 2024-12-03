import { InventoryItems, Character } from '../../db/model/model.js';

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
        // 캐릭터 조회
        const character = await Character.findOne({ where: { nickname } });
        if (!character) {
            return { success: false, message: '캐릭터를 찾을 수 없습니다.' };
        }

        // 이미 인벤토리가 존재하는지 확인
        const existingInventory = await InventoryItems.findOne({ where: { nickname } });
        if (existingInventory) {
            return { success: false, message: '이미 인벤토리가 존재합니다.' };
        }

        // 인벤토리 생성
        await InventoryItems.create({
            nickname,
            itemId: 0, // 초기 값
            PotionId: '', // 초기 값
            quantify: 0, // 초기 값
        });

        return {
            success: true,
            message: '인벤토리가 성공적으로 생성되었습니다.',
        };
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
        // 인벤토리 조회
        const inventory = await InventoryItems.findAll({ where: { nickname } });
        if (!inventory || inventory.length === 0) {
            return { success: false, message: '인벤토리를 찾을 수 없습니다.' };
        }

        return {
            success: true,
            message: '인벤토리를 성공적으로 조회했습니다.',
            inventory,
        };
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
        // 인벤토리 조회
        const inventory = await InventoryItems.findOne({ where: { nickname, itemId, PotionId } });

        if (inventory) {
            // 이미 존재하는 아이템의 수량 업데이트
            await InventoryItems.update(
                { quantify: inventory.quantify + quantify },
                { where: { nickname, itemId, PotionId } }
            );
        } else {
            // 새로운 아이템 추가
            await InventoryItems.create({
                nickname,
                itemId,
                PotionId,
                quantify,
            });
        }

        return {
            success: true,
            message: '아이템이 인벤토리에 성공적으로 추가되었습니다.',
        };
    } catch (error) {
        console.error(error);
        return { success: false, message: '서버 오류가 발생했습니다.' };
    }
};

export default {
    CreateInventoryHandler,
    GetInventoryHandler,
    AddItemToInventoryHandler,
};
