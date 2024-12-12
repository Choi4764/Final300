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

CREATE TABLE IF NOT EXISTS `characterInfo` (
    `playerId`        INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `nickname`        VARCHAR(50) NOT NULL UNIQUE,
    `job`             INT NOT NULL,
    `level`           INT NOT NULL DEFAULT 1,
    `Exp`             INT NOT NULL DEFAULT 0,
    `hp`              FLOAT NOT NULL DEFAULT 100,
    `maxHp`           FLOAT NOT NULL DEFAULT 100,
    `mp`              FLOAT NOT NULL DEFAULT 100,
    `maxMp`           FLOAT NOT NULL DEFAULT 100,
    `atk`             FLOAT NOT NULL DEFAULT 1,
    `def`             FLOAT NOT NULL DEFAULT 1,
    `magic`           FLOAT NOT NULL DEFAULT 1,
    `speed`           FLOAT NOT NULL DEFAULT 1,
    `critical`        FLOAT NOT NULL DEFAULT 0,
    `critical_attack` FLOAT NOT NULL DEFAULT 2,
    `InventoryId`     INT NULL,
    `WeaponId`        INT NULL,
    `HeadId`          INT NULL,
    `BodyId`          INT NULL,
    `HandId`          INT NULL,
    `LegId`           INT NULL,
    `PartyNumber`     INT NULL,
    `CreatedAt`       TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `UpdatedAt`       TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`job`) REFERENCES `class`(`job`)
);


CREATE TABLE IF NOT EXISTS `potion` (
    `PotionId` VARCHAR(255) NOT NULL UNIQUE,
    `name` VARCHAR(255) NOT NULL,
    `PotionCost` INT NOT NULL,
    `effect` VARCHAR(255) NOT NULL,
    `CreatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `UpdatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`PotionId`)
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
    `nickname` VARCHAR(50) NOT NULL,
    `itemId` INT NOT NULL,
    `PotionId` VARCHAR(255) NOT NULL,
    `quantify` INT NOT NULL,
    PRIMARY KEY (`InventoryId`),
    FOREIGN KEY (`nickname`) REFERENCES `characterInfo`(`nickname`),
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


INSERT INTO class (`job`, `JobName`, `BaseHp`, `BaseMp`, `BaseAttack`, `BaseDefense`, `BaseMagic`, `BaseEffect`) VALUE
(1001, "섭르탄", 3, 3, 3, 1, 3, 3004),
(1002, "클르탄", 1, 5, 1, 1, 5, 3004),
(1003, "디르탄", 2, 1, 2, 2, 1, 3004),
(1004, "큐르탄", 4, 0, 2, 4, 0, 3004),
(1005, "기르탄", 1, 5, 1, 1, 3, 3004);