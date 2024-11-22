import { v4 as uuidv4 } from 'uuid';
import { loadProtos } from './loadProtos.js';

const initServer = async () => {
    try {
      await loadProtos();

    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  };
  
  export default initServer;