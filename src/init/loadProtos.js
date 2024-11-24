import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import protobuf from 'protobufjs';
import { packetNames } from '../protobuf/packetNames.js';
import { PACKET_TYPE } from '../constants/header.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const protoDir = path.join(__dirname, '../protobuf');

const getAllProtoFiles = (dir, fileList = []) => {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);

    if (fs.statSync(filePath).isDirectory()) {
      getAllProtoFiles(filePath, fileList);
    } else if (path.extname(file) === '.proto') {
      fileList.push(filePath);
    }
  });

  return fileList;
};

const protoFiles = getAllProtoFiles(protoDir);

const protoMessages = {};
const protoMessagesById = {};

export const loadProtos = async () => {
  try {
    const root = new protobuf.Root();

    await Promise.all(protoFiles.map((file) => root.load(file)));
    const processNamespace = (namespace) => {
      if (namespace.nested) {
        for (const [typeName, type] of Object.entries(namespace.nested)) {
          if (type instanceof protobuf.Type || type instanceof protobuf.Enum) {
            protoMessages[typeName] = type;
          } else if (type instanceof protobuf.Namespace) {
            processNamespace(type);
          }
        }
      }
    };

    processNamespace(root);

    for (const [packetName, types] of Object.entries(packetNames)) {
      protoMessages[packetName] = {};
      for (const [type, typeName] of Object.entries(types)) {
        protoMessages[packetName][type] = root.lookup(typeName);
      }
    }

    // PacketId를 protoMessages로 매핑
    for (const [packetName, packetId] of Object.entries(PACKET_TYPE)){
      if(protoMessages[packetName]){
        protoMessagesById[packetId] = protoMessages[packetName];
      }else{
        console.error(`Proto message corresponding to packet type not found: ${packetName}`);
      }
    }

    console.log(`Protobuf files have been loaded.`);
  } catch (error) {
    console.error(`An error occurred while loading Protobuf files.`, error);
  }
};

export const getProtoMessages = () => {
  return { ...protoMessages };
};

export const getProtoMessagesById = (packetId) => {
  return protoMessagesById[packetId];
}