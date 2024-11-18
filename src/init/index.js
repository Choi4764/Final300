import { loadProtos } from "./loadProto.js";

const initServer = async () => {
    try{
        await loadProtos();
    }catch (err){
        console.error(err);
        process.exit(1);
    }
};

export default initServer;