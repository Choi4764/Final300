CREATE TABLE IF NOT EXISTS `potion` (
    `PotionId` VARCHAR(255) NOT NULL UNIQUE,
    `name` VARCHAR(255) NOT NULL,
    `PotionCost` INT NOT NULL,
    `effect` VARCHAR(255) NOT NULL,
    `CreatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `UpdatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`PotionId`)
);

CREATE TABLE `User` (
    `UserId` VARCHAR(255) NOT NULL UNIQUE,
    `Password` VARCHAR(255) NOT NULL,
    `Email` VARCHAR(255) NOT NULL,
    `CreatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `UpdatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`UserId`)
);

CREATE TABLE `class` (
    `job` INT NOT NULL AUTO_INCREMENT,
    `JobName` VARCHAR(255) NOT NULL UNIQUE,
    `BaseHp` INT NOT NULL,
    `BaseMp` INT NOT NULL,
    `BaseAttack` INT NOT NULL,
    `BaseDefense` INT NOT NULL,
    `BaseMagic` INT NOT NULL,
    `BaseEffect` VARCHAR(255) NOT NULL,
    `CreatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `UpdatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`job`)
);


CREATE TABLE IF NOT EXISTS `character` (
    `playerId` INT NOT NULL AUTO_INCREMENT,
    `job` INT NOT NULL,
    `UserId` VARCHAR(255) NOT NULL,
    `nickname` VARCHAR(50) NOT NULL UNIQUE,
    `level` INT NOT NULL DEFAULT 1,
    `Exp` INT NOT NULL DEFAULT 0,
    `hp` INT NOT NULL DEFAULT 100,
    `maxHp` INT NOT NULL DEFAULT 100,
    `mp` INT NOT NULL DEFAULT 100,
    `maxMp` INT NOT NULL DEFAULT 100,
    `atk` INT NOT NULL DEFAULT 1,
    `def` INT NOT NULL DEFAULT 1,
    `magic` INT NOT NULL DEFAULT 1,
    `speed` INT NOT NULL DEFAULT 1,
    `Critical` INT NOT NULL DEFAULT 0,
    `Critical_Attack` INT NOT NULL DEFAULT 2,
    `InventoryId` INT NOT NULL,
    `WeaponId` INT NULL,
    `HeadId` INT NULL,
    `BodyId` INT NULL,
    `HandId` INT NULL,
    `LegId` INT NULL,
    `PartyNumber` INT NULL,
    `CreatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `UpdatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`playerId`),
    FOREIGN KEY (`job`) REFERENCES `class`(`job`),
    FOREIGN KEY (`UserId`) REFERENCES `User`(`UserId`)
);

CREATE TABLE `items` (
    `ItemId` INT NOT NULL AUTO_INCREMENT,
    `ItemName` VARCHAR(255) NOT NULL,
    `RequireLevel` INT NOT NULL,
    `ItemType` VARCHAR(255) NOT NULL,
    `ItemHp` INT NULL,
    `ItemMp` INT NULL,
    `ItemAttack` INT NULL,
    `ItemDefense` INT NULL,
    `ItemMagic` INT NULL,
    `ItemCost` INT NOT NULL,
    `CreatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `UpdatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`ItemId`)
);

CREATE TABLE `effects` (
    `effectsId` INT NOT NULL AUTO_INCREMENT,
    `EffectName` VARCHAR(255) NOT NULL,
    `EffectType` VARCHAR(255) NOT NULL,
    `CreatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `UpdatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`effectsId`)
);

CREATE TABLE `monsters` (
    `MonsterId` INT NOT NULL AUTO_INCREMENT,
    `DungeonMonstersId` INT NOT NULL,
    `MonsterName` VARCHAR(255) NOT NULL,
    `MonsterHp` INT NOT NULL,
    `MonsterAttack` INT NOT NULL,
    `MonsterEXP` INT NOT NULL,
    `MonsterCritical` INT NOT NULL,
    `MonsterSpeed` INT NOT NULL,
    `MonsterCriticalAttack` INT NOT NULL,
    `CreatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `UpdatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`MonsterId`)
);

CREATE TABLE `Dungeons` (
    `DungeonCode` INT NOT NULL AUTO_INCREMENT,
    `DungeonMonstersId` INT NOT NULL,
    `DungeonsItemId` INT NOT NULL,
    `DungeonName` VARCHAR(255) NOT NULL,
    `RequireLevel` INT NOT NULL,
    `CreatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `UpdatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`DungeonCode`)
);

CREATE TABLE `DungeonMonsters` (
    `DungeonMonstersId` INT NOT NULL AUTO_INCREMENT,
    `DungeonCode` INT NOT NULL,
    `MonsterId` INT NOT NULL,
    `CreatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `UpdatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`DungeonMonstersId`),
    FOREIGN KEY (`DungeonCode`) REFERENCES `Dungeons`(`DungeonCode`),
    FOREIGN KEY (`MonsterId`) REFERENCES `monsters`(`MonsterId`)
);

CREATE TABLE `DungeonItem` (
    `DungeonsItemId` INT NOT NULL AUTO_INCREMENT,
    `DungeonCode` INT NOT NULL,
    `id` INT NOT NULL,
    `ItemProbability` INT NOT NULL,
    `CreatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `UpdatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`DungeonsItemId`),
    FOREIGN KEY (`DungeonCode`) REFERENCES `Dungeons`(`DungeonCode`)
);

CREATE TABLE `levels` (
    `LevelsId` INT NOT NULL AUTO_INCREMENT,
    `RequiredEXP` INT NOT NULL DEFAULT 1,
    `HP` INT NOT NULL DEFAULT 1,
    `MP` INT NOT NULL DEFAULT 1,
    `Attack` INT NOT NULL DEFAULT 1,
    `Defense` INT NOT NULL DEFAULT 1,
    `magic` INT NOT NULL DEFAULT 1,
    `speed` INT NOT NULL DEFAULT 1,
    `critical` INT NOT NULL DEFAULT 1,
    `criticalAttack` INT NOT NULL DEFAULT 1,
    `CreatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `UpdatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`LevelsId`)
);

CREATE TABLE `InventoryItems` (
    `InventoryId` INT NOT NULL AUTO_INCREMENT,
    `playerId` INT NOT NULL,
    `itemId` INT NOT NULL,
    `PotionId` VARCHAR(255) NOT NULL,
    `quantify` INT NOT NULL,
    PRIMARY KEY (`InventoryId`),
    FOREIGN KEY (`playerId`) REFERENCES `Character`(`playerId`),
    FOREIGN KEY (`itemId`) REFERENCES `items`(`ItemId`),
    FOREIGN KEY (`PotionId`) REFERENCES `potion`(`PotionId`)
);

CREATE TABLE `Shop` (
    `ShopId` VARCHAR(255) NOT NULL UNIQUE,
    `itemId` VARCHAR(255) NOT NULL,
    `PotionId` VARCHAR(255) NULL,
    `cost` INT NOT NULL,
    `CreatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `UpdatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`ShopId`),
    FOREIGN KEY (`PotionId`) REFERENCES `potion`(`PotionId`)
);


CREATE TABLE IF NOT EXISTS `characterInfo` (
    `playerId`        INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `nickname`  VARCHAR(50) NOT NULL UNIQUE,
    `job`     INT NOT NULL,
    `level`     INT NOT NULL,
    `maxHp`     FLOAT NOT NULL,
    `maxMp`     FLOAT NOT NULL,
    `atk`       FLOAT NOT NULL,
    `def`       FLOAT NOT NULL,
    `magic`     FLOAT NOT NULL,
    `speed`     FLOAT NOT NULL,
    `critical`  FLOAT NOT NULL,
    `critical_attack`  FLOAT NOT NULL,
    `posX`      FLOAT NOT NULL DEFAULT -4,
    `posY`      FLOAT NOT NULL DEFAULT 0.7,
    `posZ`      FLOAT NOT NULL DEFAULT 137,
    `rot`       FLOAT NOT NULL DEFAULT 0
);

--class 데이터 삽입
-- INSERT INTO class (`class`, `JobName`, `BaseHp`, `BaseMp`, `BaseAttack`, `BaseDefense`, `BaseMagic`, `BaseEffect`) VALUE
-- (1001, "섭르탄", 3, 3, 3, 1, 3, 3004),
-- (1002, "클르탄", 1, 5, 1, 1, 5, 3004),
-- (1003, "디르탄", 2, 1, 2, 2, 1, 3004),
-- (1004, "큐르탄", 4, 0, 2, 4, 0, 3004),
-- (1005, "기르탄", 1, 5, 1, 1, 3, 3004);