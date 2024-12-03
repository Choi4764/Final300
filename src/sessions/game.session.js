import { gameSessions } from "./sessions.js";
import Game from "../classes/models/game.class.js";

export const addGameSession = (id) => {
    const session = new Game(id);
    gameSessions.push(session);

    return session;
}


//게임 세션 삭제
export const removeGameSession = (id) => {
    const index = gameSessions.findIndex((session) => session.id === id);
    if(index !== -1){
        return gameSessions.splice(index, 1);
    }
};

//게임 세션 불러오기
export const getGameSession = () => {
    return gameSessions;
}


export const getGameSessionById = (id) => {
    return gameSessions.find((session) => session.id === id);
};
