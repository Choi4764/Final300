const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
app.use(express.json());

const db = mysql.createPool({
  host: 'localhost', // 데이터베이스 호스트
  user: 'root', // 데이터베이스 사용자
  password: '', // 데이터베이스 비밀번호
  database: 'game', // 데이터베이스 이름
});

// 아이템 장착 핸들러
app.post('/equipItem', async (req, res) => {
  const { playerId, itemId } = req.body;

  if (!playerId || !itemId) {
    return res.status(400).send({ success: false, message: 'playerId와 itemId는 필수입니다.' });
  }

  try {
    const [item] = await db.query('SELECT * FROM items WHERE ItemId = ?', [itemId]);
    if (item.length === 0) {
      return res.status(404).send({ success: false, message: '아이템을 찾을 수 없습니다.' });
    }

    const { ItemType, ItemHp, ItemMp, ItemAttack, ItemDefense, ItemMagic } = item[0];
    let column;

    // 아이템 타입에 따라 캐릭터의 슬롯 결정
    if (itemId >= 1 && itemId <= 100) column = 'HeadId';
    else if (itemId >= 101 && itemId <= 200) column = 'BodyId';
    else if (itemId >= 201 && itemId <= 300) column = 'HandId';
    else if (itemId >= 301 && itemId <= 400) column = 'LegId';
    else if (itemId >= 1000 && itemId <= 2000) column = 'WeaponId';
    else {
      return res.status(400).send({ success: false, message: '장착할 수 없는 아이템입니다.' });
    }

    // 기존 장착 아이템 정보 가져오기
    const [character] = await db.query('SELECT * FROM Character WHERE playerId = ?', [playerId]);
    if (character.length === 0) {
      return res.status(404).send({ success: false, message: '캐릭터를 찾을 수 없습니다.' });
    }

    const currentItemId = character[0][column];

    // 능력치 업데이트 (기존 아이템 제거 후 새로운 아이템 추가)
    const updatedStats = {
      hp: character[0].hp - (currentItemId ? ItemHp : 0) + (ItemHp || 0),
      mp: character[0].mp - (currentItemId ? ItemMp : 0) + (ItemMp || 0),
      atk: character[0].atk - (currentItemId ? ItemAttack : 0) + (ItemAttack || 0),
      def: character[0].def - (currentItemId ? ItemDefense : 0) + (ItemDefense || 0),
      magic: character[0].magic - (currentItemId ? ItemMagic : 0) + (ItemMagic || 0),
    };

    await db.query(
      `UPDATE Character 
      SET ${column} = ?, hp = ?, mp = ?, atk = ?, def = ?, magic = ?
      WHERE playerId = ?`,
      [itemId, updatedStats.hp, updatedStats.mp, updatedStats.atk, updatedStats.def, updatedStats.magic, playerId]
    );

    res.send({ success: true, message: '아이템이 성공적으로 장착되었습니다.', updatedStats });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: '서버 오류가 발생했습니다.' });
  }
});

// 아이템 해제 핸들러
app.post('/unequipItem', async (req, res) => {
  const { playerId, itemType } = req.body;

  if (!playerId || !itemType) {
    return res.status(400).send({ success: false, message: 'playerId와 itemType은 필수입니다.' });
  }

  try {
    let column;

    // 아이템 타입에 따라 캐릭터의 슬롯 결정
    if (itemType === 'Head') column = 'HeadId';
    else if (itemType === 'Body') column = 'BodyId';
    else if (itemType === 'Hand') column = 'HandId';
    else if (itemType === 'Leg') column = 'LegId';
    else if (itemType === 'Weapon') column = 'WeaponId';
    else {
      return res.status(400).send({ success: false, message: '해제할 수 없는 아이템 타입입니다.' });
    }

    // 캐릭터 정보 가져오기
    const [character] = await db.query('SELECT * FROM Character WHERE playerId = ?', [playerId]);
    if (character.length === 0) {
      return res.status(404).send({ success: false, message: '캐릭터를 찾을 수 없습니다.' });
    }

    const currentItemId = character[0][column];
    if (!currentItemId) {
      return res.status(400).send({ success: false, message: '해당 슬롯에 장착된 아이템이 없습니다.' });
    }

    const [item] = await db.query('SELECT * FROM items WHERE ItemId = ?', [currentItemId]);
    if (item.length === 0) {
      return res.status(404).send({ success: false, message: '아이템을 찾을 수 없습니다.' });
    }

    const { ItemHp, ItemMp, ItemAttack, ItemDefense, ItemMagic } = item[0];

    // 능력치 업데이트 (아이템 제거)
    const updatedStats = {
      hp: character[0].hp - (ItemHp || 0),
      mp: character[0].mp - (ItemMp || 0),
      atk: character[0].atk - (ItemAttack || 0),
      def: character[0].def - (ItemDefense || 0),
      magic: character[0].magic - (ItemMagic || 0),
    };

    await db.query(
      `UPDATE Character 
      SET ${column} = NULL, hp = ?, mp = ?, atk = ?, def = ?, magic = ?
      WHERE playerId = ?`,
      [updatedStats.hp, updatedStats.mp, updatedStats.atk, updatedStats.def, updatedStats.magic, playerId]
    );

    res.send({ success: true, message: '아이템이 성공적으로 해제되었습니다.', updatedStats });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: '서버 오류가 발생했습니다.' });
  }
});

// 서버 실행
app.listen(3000, () => {
  console.log('서버가 3000번 포트에서 실행 중입니다.');
});
