import { v4 as uuidv4 } from 'uuid';
import { loadProto } from './loadProto.js';

const initServer = async () => {
    try {
      await loadProto();
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  };
  
  export default initServer;
  