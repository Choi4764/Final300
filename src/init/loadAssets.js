import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const assetDir = path.join(__dirname, '../../assets');
let gameAssets = {};

const readFileASync = (filename) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(assetDir, filename), 'utf8', (err, data) => {
        if(err){
            reject(err);
            return;
        }

        const cleanData = data.replace(/^\uFEFF/, '');
        try{
            resolve(JSON.parse(cleanData));
        }catch(err){
            console.error(err);
        }
    });
  });
};

export const loadGameAssets= async () => {
    try{
        const [playerCharacter] = await Promise.all([
            readFileASync('playerCharacter.json'),
        ])

        gameAssets = {playerCharacter};

        return gameAssets;
    }catch(err){
        console.error(err);
    }
};

export const getGameAssets = () => {
    return gameAssets;
};

export const getJobById = (jobId) => {
    const index = gameAssets.playerCharacter.data.findIndex((job) => job.id === jobId);
    return gameAssets.playerCharacter.data[index];
};