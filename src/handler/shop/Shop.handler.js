const { InventoryItems, Shop, Character, items } = require('../models'); // Sequelize 모델 로드

/**
 * 아이템 구매 핸들러
 * @param {Object} req - 클라이언트로부터 받은 요청
 * @param {Object} res - 클라이언트로 보낼 응답
 */
const handleBuyItem = async (req, res) => {
    const { inventoryId, shopId, itemId, quantity } = req.body;

    try {
        // 1. 상점에서 아이템 정보 가져오기
        const shopItem = await Shop.findOne({ where: { ShopId: shopId, itemId } });
        if (!shopItem) {
            return res.status(404).json({ success: false, message: '아이템이 상점에 없습니다.' });
        }

        const itemCost = shopItem.cost * quantity;

        // 2. 인벤토리에서 골드 확인
        const inventory = await InventoryItems.findOne({ where: { InventoryId: inventoryId } });
        const player = await Character.findOne({ where: { playerId: inventory.playerId } });

        if (player.gold < itemCost) {
            return res.status(400).json({ success: false, message: '골드가 부족합니다.' });
        }

        // 3. 골드 차감 및 인벤토리 업데이트
        await Character.update(
            { gold: player.gold - itemCost },
            { where: { playerId: player.playerId } }
        );

        const existingItem = await InventoryItems.findOne({
            where: { InventoryId: inventoryId, itemId },
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
                InventoryId: inventoryId,
                playerId: inventory.playerId,
                itemId,
                PotionId: null, // 일반 아이템이므로 PotionId는 null
                quantify: quantity,
            });
        }

        return res.status(200).json({ success: true, message: '아이템 구매 성공!' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: '서버 에러가 발생했습니다.' });
    }
};

/**
 * 아이템 판매 핸들러
 * @param {Object} req - 클라이언트로부터 받은 요청
 * @param {Object} res - 클라이언트로 보낼 응답
 */
const handleSellItem = async (req, res) => {
    const { inventoryId, itemId, quantity } = req.body;

    try {
        // 1. 인벤토리에서 아이템 확인
        const inventoryItem = await InventoryItems.findOne({
            where: { InventoryId: inventoryId, itemId },
        });
        if (!inventoryItem || inventoryItem.quantify < quantity) {
            return res.status(400).json({ success: false, message: '아이템 수량이 부족합니다.' });
        }

        // 2. 아이템 정보에서 판매 가격 가져오기
        const item = await items.findOne({ where: { Key: itemId } });
        if (!item) {
            return res.status(404).json({ success: false, message: '아이템 정보를 찾을 수 없습니다.' });
        }

        const sellPrice = item.ItemCost * quantity;

        // 3. 플레이어의 골드 증가
        const inventory = await InventoryItems.findOne({ where: { InventoryId: inventoryId } });
        const player = await Character.findOne({ where: { playerId: inventory.playerId } });

        await Character.update(
            { gold: player.gold + sellPrice },
            { where: { playerId: player.playerId } }
        );

        // 4. 인벤토리에서 아이템 수량 감소 또는 제거
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

        return res.status(200).json({ success: true, message: '아이템 판매 성공!' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: '서버 에러가 발생했습니다.' });
    }
};

module.exports = {
    handleBuyItem,
    handleSellItem,
};
