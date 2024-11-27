import { v4 as uuidv4 } from 'uuid';
import { loadProtos } from './loadProtos.js';
import { loadGameAssets } from './loadAssets.js';
import testConnection from '../utils/db/testConnection.js';

const initServer = async () => {
    try {
      await loadProtos();
      await loadGameAssets();
      console.log(`gameAssets : ${loadGameAssets()}`);
      await testConnection();

  } catch (err) {
      console.error(err);
      process.exit(1);
    }
  };
  
  export default initServer;