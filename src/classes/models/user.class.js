import Stat from "./stat.class.js";
import Position from "./position.class.js";

class User{
    constructor(socket, playerId, nickname, maxHp, maxMp, atk, def, magic, speed, critical, critical_attack){
        this.socket = socket;
        this.playerId = playerId;
        this.nickname = nickname;

        this.playerInfo = {};

        this.position = new Position(0, 0, 0, 0);
        // 초기 레벨 1
        this.stat = new Stat(1, maxHp, maxHp, maxMp, maxMp, atk, def, magic, speed, critical, critical_attack);
    }

    updateUserHP(damage){
        this.stat.hp = Math.max(0, this.stat.hp - damage);
    }

    resetUserStat(){
        this.stat.hp = this.stat.maxHp;
        this.stat.mp = this.stat.maxMp;
    }
}
export default User;