import { v4 as uuidv4 } from 'uuid';
import { loadProtos } from './loadProtos.js';
import { loadGameAssets } from './loadAssets.js';

const initServer = async () => {
    try {
      await loadProtos();
      await loadGameAssets();
  } catch (error) {
      console.error(error);
      process.exit(1);
    }
  };
  
  export default initServer;