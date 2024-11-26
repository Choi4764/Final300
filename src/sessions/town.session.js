import { townSession } from './sessions.js';

export const addUserAtTown = async (user) => {
  townSession.addUser(user);
  console.log(townSession);
};

export const getUserByUserId = (userId) => {
  return townSession.users.find((user) => user.id === userId);
};

export const removeUser = async (userId) => {
  const index = townSession.users.findIndex((user) => user.id === userId);
  if (index !== -1) {
    return townSession.users.splice(index, 1)[0];
  }
};

export const getUserBySocket = async (socket) => {
  return townSession.users.find((user) => user.socket === socket);
};

export const getAllUser = async () => {
  return townSession;
};

export const getAllUserExceptMyself = async (id) => {
  return townSession.users.filter((user) => user.id !== id);
};

export const findUser = async (username) => {
  return townSession.users.find((a) => a.id === username);;
};