import { InventoryItems, Shop, CharacterInfo } from '../../../db/model/model.js'; // Sequelize 모델 로드
import fs from 'fs/promises'; // 파일 읽기를 위해 fs 모듈 사용
import path from 'path'; // 경로 조작을 위해 path 모듈 사용

let itemData = [];

// 애플리케이션 시작 시 items.json 로드
(async () => {
    try {
        // items.json의 절대 경로를 계산
        const itemsFilePath = path.resolve(__dirname, '../../../../assets/items.json');
        const data = await fs.readFile(itemsFilePath, 'utf-8'); // JSON 파일 읽기
        const parsedData = JSON.parse(data);
        itemData = parsedData.data; // "data" 배열에서 아이템 정보를 가져옴
        console.log('Items loaded successfully');
    } catch (error) {
        console.error('Failed to load items.json:', error);
    }
})();

/**
 * 아이템 구매 핸들러
 * @param {Object} data - 클라이언트로부터 받은 요청 데이터
 * @returns {Object} - 처리 결과를 담은 응답 데이터
 */
export const BuyItemHandler = async (data) => {
    const { playerId, itemName, quantity } = data;

    try {
        // 1. items.json에서 아이템 정보 가져오기
        const item = itemData.find(i => i.ItemName === itemName);
        if (!item) {
            return { success: false, message: '아이템을 찾을 수 없습니다.' };
        }

        const itemCost = item.ItemCost * quantity;

        // 2. 플레이어 정보 가져오기
        const player = await CharacterInfo.findOne({ where: { playerId } });
        if (!player) {
            return { success: false, message: '플레이어를 찾을 수 없습니다.' };
        }

        if (player.gold < itemCost) {
            return { success: false, message: '골드가 부족합니다.' };
        }

        // 3. 골드 차감 및 인벤토리 업데이트
        await CharacterInfo.update(
            { gold: player.gold - itemCost },
            { where: { playerId: player.playerId } }
        );

        const existingItem = await InventoryItems.findOne({
            where: { nickname: player.nickname, itemId: item.ItemId },
        });

        if (existingItem) {
            // 이미 인벤토리에 있는 경우 수량 증가
            await InventoryItems.update(
                { quantify: existingItem.quantify + quantity },
                { where: { InventoryId: existingItem.InventoryId } }
            );
        } else {
            // 인벤토리에 없으면 새로 추가
            await InventoryItems.create({
                nickname: player.nickname,
                itemId: item.ItemId,
                PotionId: null, // 일반 아이템이므로 PotionId는 null
                quantify: quantity,
            });
        }

        return { success: true, message: '아이템 구매 성공!', itemName, quantity };
    } catch (error) {
        console.error(error);
        return { success: false, message: '서버 에러가 발생했습니다.' };
    }
};

/**
 * 아이템 판매 핸들러
 * @param {Object} data - 클라이언트로부터 받은 요청 데이터
 * @returns {Object} - 처리 결과를 담은 응답 데이터
 */
export const SellItemHandler = async (data) => {
    const { playerId, itemName, quantity } = data;

    try {
        // 1. items.json에서 아이템 정보 가져오기
        const item = itemData.find(i => i.ItemName === itemName);
        if (!item) {
            return { success: false, message: '아이템 정보를 찾을 수 없습니다.' };
        }

        // 2. 플레이어 정보 가져오기
        const player = await CharacterInfo.findOne({ where: { playerId } });
        if (!player) {
            return { success: false, message: '플레이어를 찾을 수 없습니다.' };
        }

        // 3. 인벤토리에서 아이템 확인
        const inventoryItem = await InventoryItems.findOne({
            where: { nickname: player.nickname, itemId: item.ItemId },
        });
        if (!inventoryItem || inventoryItem.quantify < quantity) {
            return { success: false, message: '아이템 수량이 부족합니다.' };
        }

        const sellPrice = item.ItemCost * quantity;

        // 4. 플레이어의 골드 증가
        await CharacterInfo.update(
            { gold: player.gold + sellPrice },
            { where: { playerId: player.playerId } }
        );

        // 5. 인벤토리에서 아이템 수량 감소 또는 제거
        if (inventoryItem.quantify === quantity) {
            // 수량이 정확히 맞으면 삭제
            await InventoryItems.destroy({ where: { InventoryId: inventoryItem.InventoryId } });
        } else {
            // 수량 감소
            await InventoryItems.update(
                { quantify: inventoryItem.quantify - quantity },
                { where: { InventoryId: inventoryItem.InventoryId } }
            );
        }

        return { success: true, message: '아이템 판매 성공!', itemName, quantity, sellPrice };
    } catch (error) {
        console.error(error);
        return { success: false, message: '서버 에러가 발생했습니다.' };
    }
};

export default {
    BuyItemHandler,
    SellItemHandler,
};
