import { userSessions } from "./sessions.js";

export const addUser = async (user) => {
  return userSessions.push(user);
}

export const removeUser = (socket) => {
    const index = userSessions.findIndex((user) => user.socket === socket);
    if(index !== -1){
        return userSessions.splice(index, 1)[0];
    }
};

export const getUserByUserId = (userId) => {
    return userSessions.find((user) => user.id === userId);
  };
  
  export const getUserBySocket = async (socket) => {
    return userSessions.find((user) => user.socket === socket);
  };
  
  export const getUserByNickname = (nickname) => {
    return userSessions.find((user) => user.nickname === nickname);
  };

  export const getAllUsers = async () => {
    return userSessions;
  }

  export const findUser = async (username) => {
    return userSessions.find((a) => a.id === username);

  }