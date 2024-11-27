import gameClass from './game.class.js'

// game클래스의 자식인 town클래스 생성
class Town extends gameClass{
    constructor(townSessionId){
        super(townSessionId);
    }

    //town에 user참가
    addUser(user){
        this.users.push(user);
    }
}

export default Town;