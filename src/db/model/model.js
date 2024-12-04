import { Sequelize, DataTypes } from 'sequelize';
import { config } from '../../config/config.js';

// Sequelize 인스턴스 초기화
const sequelize = new Sequelize(
    config.database.database,
    config.database.user,
    config.database.password,
    {
        host: config.database.host,
        dialect: 'mysql',
        logging: false, // 콘솔에 SQL 쿼리 로그를 출력하지 않음
    }
);

// 모델 정의
export const Class = sequelize.define('class', {
    job: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    JobName: { type: DataTypes.STRING, unique: true, allowNull: false },
    BaseHp: { type: DataTypes.INTEGER, allowNull: false },
    BaseMp: { type: DataTypes.INTEGER, allowNull: false },
    BaseAttack: { type: DataTypes.INTEGER, allowNull: false },
    BaseDefense: { type: DataTypes.INTEGER, allowNull: false },
    BaseMagic: { type: DataTypes.INTEGER, allowNull: false },
    BaseEffect: { type: DataTypes.STRING, allowNull: false },
}, { timestamps: true });

export const CharacterInfo = sequelize.define('characterInfo', {
    playerId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nickname: { type: DataTypes.STRING, unique: true, allowNull: false },
    job: { type: DataTypes.INTEGER, allowNull: false },
    level: { type: DataTypes.INTEGER, defaultValue: 1 },
    Exp: { type: DataTypes.INTEGER, defaultValue: 0 },
    hp: { type: DataTypes.FLOAT, defaultValue: 100 },
    maxHp: { type: DataTypes.FLOAT, defaultValue: 100 },
    mp: { type: DataTypes.FLOAT, defaultValue: 100 },
    maxMp: { type: DataTypes.FLOAT, defaultValue: 100 },
    atk: { type: DataTypes.FLOAT, defaultValue: 1 },
    def: { type: DataTypes.FLOAT, defaultValue: 1 },
    magic: { type: DataTypes.FLOAT, defaultValue: 1 },
    speed: { type: DataTypes.FLOAT, defaultValue: 1 },
    critical: { type: DataTypes.FLOAT, defaultValue: 0 },
    critical_attack: { type: DataTypes.FLOAT, defaultValue: 2 },
    InventoryId: { type: DataTypes.INTEGER, allowNull: true },
    WeaponId: { type: DataTypes.INTEGER, allowNull: true },
    HeadId: { type: DataTypes.INTEGER, allowNull: true },
    BodyId: { type: DataTypes.INTEGER, allowNull: true },
    HandId: { type: DataTypes.INTEGER, allowNull: true },
    LegId: { type: DataTypes.INTEGER, allowNull: true },
    PartyNumber: { type: DataTypes.INTEGER, allowNull: true },
}, { timestamps: true });

export const Potion = sequelize.define('potion', {
    PotionId: { type: DataTypes.STRING, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    PotionCost: { type: DataTypes.INTEGER, allowNull: false },
    effect: { type: DataTypes.STRING, allowNull: false },
}, { timestamps: true });

export const Items = sequelize.define('items', {
    ItemId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    ItemName: { type: DataTypes.STRING, allowNull: false },
    RequireLevel: { type: DataTypes.INTEGER, allowNull: false },
    ItemType: { type: DataTypes.STRING, allowNull: false },
    ItemHp: { type: DataTypes.INTEGER, allowNull: true },
    ItemMp: { type: DataTypes.INTEGER, allowNull: true },
    ItemAttack: { type: DataTypes.INTEGER, allowNull: true },
    ItemDefense: { type: DataTypes.INTEGER, allowNull: true },
    ItemMagic: { type: DataTypes.INTEGER, allowNull: true },
    ItemCost: { type: DataTypes.INTEGER, allowNull: false },
}, { timestamps: true });

export const Effects = sequelize.define('effects', {
    effectsId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    EffectName: { type: DataTypes.STRING, allowNull: false },
    EffectType: { type: DataTypes.STRING, allowNull: false },
}, { timestamps: true });

export const Monsters = sequelize.define('monsters', {
    MonsterId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    DungeonMonstersId: { type: DataTypes.INTEGER, allowNull: false },
    MonsterName: { type: DataTypes.STRING, allowNull: false },
    MonsterHp: { type: DataTypes.INTEGER, allowNull: false },
    MonsterAttack: { type: DataTypes.INTEGER, allowNull: false },
    MonsterEXP: { type: DataTypes.INTEGER, allowNull: false },
    MonsterCritical: { type: DataTypes.INTEGER, allowNull: false },
    MonsterSpeed: { type: DataTypes.INTEGER, allowNull: false },
    MonsterCriticalAttack: { type: DataTypes.INTEGER, allowNull: false },
}, { timestamps: true });

export const Dungeons = sequelize.define('dungeons', {
    DungeonCode: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    DungeonMonstersId: { type: DataTypes.INTEGER, allowNull: false },
    DungeonsItemId: { type: DataTypes.INTEGER, allowNull: false },
    DungeonName: { type: DataTypes.STRING, allowNull: false },
    RequireLevel: { type: DataTypes.INTEGER, allowNull: false },
}, { timestamps: true });

export const DungeonMonsters = sequelize.define('dungeonMonsters', {
    DungeonMonstersId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    DungeonCode: { type: DataTypes.INTEGER, allowNull: false },
    MonsterId: { type: DataTypes.INTEGER, allowNull: false },
}, { timestamps: true });

export const DungeonItems = sequelize.define('dungeonItems', {
    DungeonsItemId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    DungeonCode: { type: DataTypes.INTEGER, allowNull: false },
    id: { type: DataTypes.INTEGER, allowNull: false },
    ItemProbability: { type: DataTypes.INTEGER, allowNull: false },
}, { timestamps: true });

export const Levels = sequelize.define('levels', {
    LevelsId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    RequiredEXP: { type: DataTypes.INTEGER, defaultValue: 1 },
    HP: { type: DataTypes.INTEGER, defaultValue: 1 },
    MP: { type: DataTypes.INTEGER, defaultValue: 1 },
    Attack: { type: DataTypes.INTEGER, defaultValue: 1 },
    Defense: { type: DataTypes.INTEGER, defaultValue: 1 },
    Magic: { type: DataTypes.INTEGER, defaultValue: 1 },
    Speed: { type: DataTypes.INTEGER, defaultValue: 1 },
    Critical: { type: DataTypes.INTEGER, defaultValue: 1 },
    CriticalAttack: { type: DataTypes.INTEGER, defaultValue: 1 },
}, { timestamps: true });

export const InventoryItems = sequelize.define('inventoryItems', {
    InventoryId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nickname: { type: DataTypes.STRING, allowNull: false },
    itemId: { type: DataTypes.INTEGER, allowNull: false },
    PotionId: { type: DataTypes.STRING, allowNull: false },
    quantify: { type: DataTypes.INTEGER, allowNull: false },
}, { timestamps: false });

export const Shop = sequelize.define('shop', {
    ShopId: { type: DataTypes.STRING, primaryKey: true },
    itemId: { type: DataTypes.STRING, allowNull: false },
    PotionId: { type: DataTypes.STRING, allowNull: true },
    cost: { type: DataTypes.INTEGER, allowNull: false },
}, { timestamps: true });

// 관계 설정
CharacterInfo.belongsTo(Class, { foreignKey: 'job' });
InventoryItems.belongsTo(CharacterInfo, { foreignKey: 'nickname' });
InventoryItems.belongsTo(Items, { foreignKey: 'itemId' });
InventoryItems.belongsTo(Potion, { foreignKey: 'PotionId' });
DungeonMonsters.belongsTo(Monsters, { foreignKey: 'MonsterId' });
DungeonMonsters.belongsTo(Dungeons, { foreignKey: 'DungeonCode' });
DungeonItems.belongsTo(Dungeons, { foreignKey: 'DungeonCode' });

// Sequelize 인스턴스 내보내기
export { sequelize as sequelizeInstance };
