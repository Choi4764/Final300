const { InventoryItems, Shop, Character, items } = require('../models'); // Sequelize 모델 로드

/**
 * 아이템 장착 핸들러
 * @param {Object} req - 클라이언트로부터 받은 요청
 * @param {Object} res - 클라이언트로 보낼 응답
 */
const handleEquipItem = async (req, res) => {
    const { playerId, itemId } = req.body;

    if (!playerId || !itemId) {
        return res.status(400).json({ success: false, message: 'playerId와 itemId는 필수입니다.' });
    }

    try {
        const item = await items.findOne({ where: { ItemId: itemId } });
        if (!item) {
            return res.status(404).json({ success: false, message: '아이템을 찾을 수 없습니다.' });
        }

        const { ItemHp, ItemMp, ItemAttack, ItemDefense, ItemMagic } = item;

        let column;
        if (itemId >= 1 && itemId <= 100) column = 'HeadId';
        else if (itemId >= 101 && itemId <= 200) column = 'BodyId';
        else if (itemId >= 201 && itemId <= 300) column = 'HandId';
        else if (itemId >= 301 && itemId <= 400) column = 'LegId';
        else if (itemId >= 1000 && itemId <= 2000) column = 'WeaponId';
        else {
            return res.status(400).json({ success: false, message: '장착할 수 없는 아이템입니다.' });
        }

        const character = await Character.findOne({ where: { playerId } });
        if (!character) {
            return res.status(404).json({ success: false, message: '캐릭터를 찾을 수 없습니다.' });
        }

        const currentItemId = character[column];

        const updatedStats = {
            hp: character.hp - (currentItemId ? ItemHp : 0) + (ItemHp || 0),
            mp: character.mp - (currentItemId ? ItemMp : 0) + (ItemMp || 0),
            atk: character.atk - (currentItemId ? ItemAttack : 0) + (ItemAttack || 0),
            def: character.def - (currentItemId ? ItemDefense : 0) + (ItemDefense || 0),
            magic: character.magic - (currentItemId ? ItemMagic : 0) + (ItemMagic || 0),
        };

        await Character.update(
            {
                [column]: itemId,
                hp: updatedStats.hp,
                mp: updatedStats.mp,
                atk: updatedStats.atk,
                def: updatedStats.def,
                magic: updatedStats.magic,
            },
            { where: { playerId } }
        );

        return res.status(200).json({
            success: true,
            message: '아이템이 성공적으로 장착되었습니다.',
            updatedStats,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: '서버 오류가 발생했습니다.' });
    }
};

/**
 * 아이템 해제 핸들러
 * @param {Object} req - 클라이언트로부터 받은 요청
 * @param {Object} res - 클라이언트로 보낼 응답
 */
const handleUnequipItem = async (req, res) => {
    const { playerId, itemType } = req.body;

    if (!playerId || !itemType) {
        return res.status(400).json({ success: false, message: 'playerId와 itemType은 필수입니다.' });
    }

    try {
        let column;

        if (itemType === 'Head') column = 'HeadId';
        else if (itemType === 'Body') column = 'BodyId';
        else if (itemType === 'Hand') column = 'HandId';
        else if (itemType === 'Leg') column = 'LegId';
        else if (itemType === 'Weapon') column = 'WeaponId';
        else {
            return res.status(400).json({ success: false, message: '해제할 수 없는 아이템 타입입니다.' });
        }

        const character = await Character.findOne({ where: { playerId } });
        if (!character) {
            return res.status(404).json({ success: false, message: '캐릭터를 찾을 수 없습니다.' });
        }

        const currentItemId = character[column];
        if (!currentItemId) {
            return res.status(400).json({ success: false, message: '해당 슬롯에 장착된 아이템이 없습니다.' });
        }

        const item = await items.findOne({ where: { ItemId: currentItemId } });
        if (!item) {
            return res.status(404).json({ success: false, message: '아이템을 찾을 수 없습니다.' });
        }

        const { ItemHp, ItemMp, ItemAttack, ItemDefense, ItemMagic } = item;

        const updatedStats = {
            hp: character.hp - (ItemHp || 0),
            mp: character.mp - (ItemMp || 0),
            atk: character.atk - (ItemAttack || 0),
            def: character.def - (ItemDefense || 0),
            magic: character.magic - (ItemMagic || 0),
        };

        await Character.update(
            {
                [column]: null,
                hp: updatedStats.hp,
                mp: updatedStats.mp,
                atk: updatedStats.atk,
                def: updatedStats.def,
                magic: updatedStats.magic,
            },
            { where: { playerId } }
        );

        return res.status(200).json({
            success: true,
            message: '아이템이 성공적으로 해제되었습니다.',
            updatedStats,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: '서버 오류가 발생했습니다.' });
    }
};

module.exports = {
    handleEquipItem,
    handleUnequipItem,
};
