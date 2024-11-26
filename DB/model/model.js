import { Sequelize, DataTypes } from 'sequelize';
import { config } from '../env/config.js';

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

const db = {};

// 모델 정의
db.Potion = sequelize.define('Potion', {
    PotionId: { type: DataTypes.STRING, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    PotionCost: { type: DataTypes.INTEGER, allowNull: false },
    effect: { type: DataTypes.STRING, allowNull: false },
}, { timestamps: true });

db.User = sequelize.define('User', {
    UserId: { type: DataTypes.STRING, primaryKey: true },
    Password: { type: DataTypes.STRING, allowNull: false },
    Email: { type: DataTypes.STRING, allowNull: false },
}, { timestamps: true });

db.Class = sequelize.define('Class', {
    class: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    JobName: { type: DataTypes.STRING, unique: true, allowNull: false },
    BaseHp: { type: DataTypes.INTEGER, allowNull: false },
    BaseMp: { type: DataTypes.INTEGER, allowNull: false },
    BaseAttack: { type: DataTypes.INTEGER, allowNull: false },
    BaseDefense: { type: DataTypes.INTEGER, allowNull: false },
    BaseMagic: { type: DataTypes.INTEGER, allowNull: false },
    BaseEffect: { type: DataTypes.STRING, allowNull: false },
}, { timestamps: true });

db.Character = sequelize.define('Character', {
    playerId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    class: { type: DataTypes.INTEGER, allowNull: false },
    UserId: { type: DataTypes.STRING, allowNull: false },
    nickname: { type: DataTypes.STRING, unique: true, allowNull: false },
    level: { type: DataTypes.INTEGER, defaultValue: 1 },
    Exp: { type: DataTypes.INTEGER, defaultValue: 0 },
    hp: { type: DataTypes.INTEGER, defaultValue: 100 },
    maxHp: { type: DataTypes.INTEGER, defaultValue: 100 },
    mp: { type: DataTypes.INTEGER, defaultValue: 100 },
    maxMp: { type: DataTypes.INTEGER, defaultValue: 100 },
    atk: { type: DataTypes.INTEGER, defaultValue: 1 },
    def: { type: DataTypes.INTEGER, defaultValue: 1 },
    magic: { type: DataTypes.INTEGER, defaultValue: 1 },
    speed: { type: DataTypes.INTEGER, defaultValue: 1 },
    Critical: { type: DataTypes.INTEGER, defaultValue: 0 },
    Critical_Attack: { type: DataTypes.INTEGER, defaultValue: 2 },
    InventoryId: { type: DataTypes.INTEGER, allowNull: false },
    WeaponId: { type: DataTypes.INTEGER, allowNull: true },
    HeadId: { type: DataTypes.INTEGER, allowNull: true },
    BodyId: { type: DataTypes.INTEGER, allowNull: true },
    HandId: { type: DataTypes.INTEGER, allowNull: true },
    LegId: { type: DataTypes.INTEGER, allowNull: true },
    PartyNumber: { type: DataTypes.INTEGER, allowNull: true },
}, { timestamps: true });

db.Items = sequelize.define('Items', {
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

db.InventoryItems = sequelize.define('InventoryItems', {
    InventoryId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    playerId: { type: DataTypes.INTEGER, allowNull: false },
    itemId: { type: DataTypes.INTEGER, allowNull: false },
    PotionId: { type: DataTypes.STRING, allowNull: false },
    quantify: { type: DataTypes.INTEGER, allowNull: false },
}, { timestamps: false });

db.Shop = sequelize.define('Shop', {
    ShopId: { type: DataTypes.STRING, primaryKey: true },
    itemId: { type: DataTypes.STRING, allowNull: false },
    PotionId: { type: DataTypes.STRING, allowNull: true },
    cost: { type: DataTypes.INTEGER, allowNull: false },
}, { timestamps: true });

// 관계 설정
db.Character.belongsTo(db.Class, { foreignKey: 'class' });
db.Character.belongsTo(db.User, { foreignKey: 'UserId' });
db.InventoryItems.belongsTo(db.Character, { foreignKey: 'playerId' });
db.InventoryItems.belongsTo(db.Items, { foreignKey: 'itemId' });
db.InventoryItems.belongsTo(db.Potion, { foreignKey: 'PotionId' });
db.Shop.belongsTo(db.Potion, { foreignKey: 'PotionId' });

// Sequelize 인스턴스 및 모델 내보내기
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
