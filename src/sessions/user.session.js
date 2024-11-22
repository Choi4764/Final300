import { userSessions } from "./sessions.js";

export const removeUser = (socket) => {
    const index = userSessions.findIndex((user) => user.socket === socket);
    if(index !== -1){
        return userSessions.splice(index, 1)[0];
    }
};

export const getUserById = (id) => {
    return userSessions.find((user) => user.playerId === id);
  };
  
  export const getUserBySocket = (socket) => {
    return userSessions.find((user) => user.socket === socket);
  };
  
  export const getUserByNickname = (nickname) => {
    return userSessions.find((user) => user.nickname === nickname);
  };

  export const getAllUsers = () => {
    return userSessions;
  }

  export const getAllUserNickname = () => {
    return userSessions.map((user) => user.nickname);
  }