import { InventoryItems, Shop, Character, Items, potion } from '../../db/model/model.js';
import CustomError from '../../utils/error/customError.js';
import { ErrorCodes } from '../../utils/error/errorCodes.js';
import { handleError } from '../../utils/error/errorHandler.js';
import { getAllUsers, getUserById, getUserByNickname } from '../../sessions/user.session.js';
import { getGameSession } from '../../sessions/game.session.js';
import { townSession } from '../../sessions/sessions.js';
import sendResponsePacket from '../../utils/response/createResponse.js';
import { PACKET_TYPE } from '../../constants/header.js';

/**
 * 아이템 장착 핸들러
 * @param {Object} data - { playerId, itemId }
 * @returns {Object}
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

        // 이미 해당 부위에 무언가 장착되어 있다면 해당 스탯을 빼줌
        const updatedStats = {
            hp: character.hp - (currentItemId ? (await getItemStat(currentItemId, 'ItemHp')) : 0) + (ItemHp || 0),
            mp: character.mp - (currentItemId ? (await getItemStat(currentItemId, 'ItemMp')) : 0) + (ItemMp || 0),
            atk: character.atk - (currentItemId ? (await getItemStat(currentItemId, 'ItemAttack')) : 0) + (ItemAttack || 0),
            def: character.def - (currentItemId ? (await getItemStat(currentItemId, 'ItemDefense')) : 0) + (ItemDefense || 0),
            magic: character.magic - (currentItemId ? (await getItemStat(currentItemId, 'ItemMagic')) : 0) + (ItemMagic || 0),
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
 * @param {Object} data - { playerId, itemType }
 * @returns {Object}
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

/**
 * 명령어로 아이템 장착 요청 처리 (예: /itemEquip 1234)
 * @param {number} playerId 
 * @param {string} command - "/itemEquip 1234" 형태의 채팅 명령어
 */
export const handleItemEquipCommand = async (playerId, command) => {
    const parts = command.trim().split(' '); // ['/itemEquip', '1234']
    const cmd = parts[0]; // '/itemEquip'
    const itemId = parts[1]; // '1234'

    if (cmd !== '/itemEquip') {
        return { success: false, message: '지원하지 않는 명령어입니다.' };
    }

    if (!itemId) {
        return { success: false, message: '아이템 ID를 입력해주세요.' };
    }

    const result = await EquipItemHandler({ playerId, itemId });
    return result;
};

/**
 * 명령어로 아이템 해제 요청 처리 (예: /itemUnequip Weapon)
 * @param {number} playerId
 * @param {string} command - "/itemUnequip Weapon" 형태의 채팅 명령어
 */
export const handleItemUnequipCommand = async (playerId, command) => {
    const parts = command.trim().split(' '); // ['/itemUnequip', 'Weapon']
    const cmd = parts[0]; // '/itemUnequip'
    const itemType = parts[1]; // 'Weapon', 'Head', 'Body', 'Hand', 'Leg' 등

    if (cmd !== '/itemUnequip') {
        return { success: false, message: '지원하지 않는 명령어입니다.' };
    }

    if (!itemType) {
        return { success: false, message: '아이템 타입을 입력해주세요. (Head, Body, Hand, Leg, Weapon)' };
    }

    const result = await UnequipItemHandler({ playerId, itemType });
    return result;
};

/**
 * 현재 장착된 아이템의 특정 스탯 값을 반환하는 헬퍼 함수
 * @param {number} itemId 
 * @param {string} statColumn - 'ItemHp', 'ItemMp', 'ItemAttack', 'ItemDefense', 'ItemMagic'
 */
async function getItemStat(itemId, statColumn) {
    const item = await Items.findOne({ where: { ItemId: itemId } });
    return item ? item[statColumn] || 0 : 0;
}

export default {
    EquipItemHandler,
    UnequipItemHandler,
    handleItemEquipCommand,
    handleItemUnequipCommand,
};
