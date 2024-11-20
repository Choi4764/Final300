import protobuf from 'protobufjs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROTO_PATH = path.resolve(__dirname, '../protobuf/game.proto'); // .proto 파일 경로 설정

export let GamePacket = null;
export let GlobalFailCode = null;

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

export const loadProto = async () => {
  try {
    const root = await protobuf.load(PROTO_PATH);
    GamePacket = await root.lookupType('GamePacket');
    if (GamePacket) {      
      console.log(`성공적으로 로드됨: ${GamePacket}`);
    }
    
    GlobalFailCode = root.lookupEnum('GlobalFailCode');;

    if(GlobalFailCode)
    {
      console.log(`성공적으로 로드됨: ${GlobalFailCode}`);
    }
  } catch (err) {
    console.error("Proto 파일 로드 중 오류 발생:", err);
    throw err;
  }
};
