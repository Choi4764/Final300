import { InventoryItems, Shop, Character, Items, potion } from '../../db/model/model.js';

/**
 * 아이템 장착 핸들러
 * @param {Object} data - 클라이언트로부터 받은 요청 데이터
 * @returns {Object} - 처리 결과를 반환
 */
export const EquipItemHandler = async (data) => {
    const { playerId, itemId } = data;

    if (!playerId || !itemId) {
        return { success: false, message: 'playerId와 itemId는 필수입니다.' };
    }

    try {
        // 1. 아이템 정보 조회
        const item = await Items.findOne({ where: { ItemId: itemId } });
        if (!item) {
            return { success: false, message: '아이템을 찾을 수 없습니다.' };
        }

        const { ItemHp, ItemMp, ItemAttack, ItemDefense, ItemMagic, ItemType } = item;

        // 2. 장착 가능한 슬롯 결정
        let column;
        switch (ItemType) {
            case 'Head':
                column = 'HeadId';
                break;
            case 'Body':
                column = 'BodyId';
                break;
            case 'Hand':
                column = 'HandId';
                break;
            case 'Leg':
                column = 'LegId';
                break;
            case 'Weapon':
                column = 'WeaponId';
                break;
            default:
                return { success: false, message: '장착할 수 없는 아이템 타입입니다.' };
        }

        // 3. 캐릭터 정보 조회
        const character = await Character.findOne({ where: { playerId } });
        if (!character) {
            return { success: false, message: '캐릭터를 찾을 수 없습니다.' };
        }

        const currentItemId = character[column];

        // 4. 캐릭터 스탯 업데이트
        const updatedStats = {
            hp: character.hp - (currentItemId ? ItemHp : 0) + (ItemHp || 0),
            mp: character.mp - (currentItemId ? ItemMp : 0) + (ItemMp || 0),
            atk: character.atk - (currentItemId ? ItemAttack : 0) + (ItemAttack || 0),
            def: character.def - (currentItemId ? ItemDefense : 0) + (ItemDefense || 0),
            magic: character.magic - (currentItemId ? ItemMagic : 0) + (ItemMagic || 0),
        };

        // 5. 캐릭터 정보 업데이트
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

        return {
            success: true,
            message: '아이템이 성공적으로 장착되었습니다.',
            updatedStats,
        };
    } catch (error) {
        console.error(error);
        return { success: false, message: '서버 오류가 발생했습니다.' };
    }
};

/**
 * 아이템 해제 핸들러
 * @param {Object} data - 클라이언트로부터 받은 요청 데이터
 * @returns {Object} - 처리 결과를 반환
 */
export const UnequipItemHandler = async (data) => {
    const { playerId, itemType } = data;

    if (!playerId || !itemType) {
        return { success: false, message: 'playerId와 itemType은 필수입니다.' };
    }

    try {
        // 1. 슬롯 컬럼 결정
        let column;
        switch (itemType) {
            case 'Head':
                column = 'HeadId';
                break;
            case 'Body':
                column = 'BodyId';
                break;
            case 'Hand':
                column = 'HandId';
                break;
            case 'Leg':
                column = 'LegId';
                break;
            case 'Weapon':
                column = 'WeaponId';
                break;
            default:
                return { success: false, message: '해제할 수 없는 아이템 타입입니다.' };
        }

        // 2. 캐릭터 정보 조회
        const character = await Character.findOne({ where: { playerId } });
        if (!character) {
            return { success: false, message: '캐릭터를 찾을 수 없습니다.' };
        }

        const currentItemId = character[column];
        if (!currentItemId) {
            return { success: false, message: '해당 슬롯에 장착된 아이템이 없습니다.' };
        }

        // 3. 아이템 정보 조회
        const item = await Items.findOne({ where: { ItemId: currentItemId } });
        if (!item) {
            return { success: false, message: '아이템을 찾을 수 없습니다.' };
        }

        const { ItemHp, ItemMp, ItemAttack, ItemDefense, ItemMagic } = item;

        // 4. 캐릭터 스탯 업데이트
        const updatedStats = {
            hp: character.hp - (ItemHp || 0),
            mp: character.mp - (ItemMp || 0),
            atk: character.atk - (ItemAttack || 0),
            def: character.def - (ItemDefense || 0),
            magic: character.magic - (ItemMagic || 0),
        };

        // 5. 캐릭터 정보 업데이트
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

        return {
            success: true,
            message: '아이템이 성공적으로 해제되었습니다.',
            updatedStats,
        };
    } catch (error) {
        console.error(error);
        return { success: false, message: '서버 오류가 발생했습니다.' };
    }
};

export default {
    EquipItemHandler,
    UnequipItemHandler,
};
