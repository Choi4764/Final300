import net from 'net';
import { PORT, HOST } from './constants/env.js';
import { onConnection } from './events/onConnection.js';

import initServer from './init/index.js'; 

const server = net.createServer(onConnection);

initServer()
    .then(() => {
        server.listen(PORT, HOST, () => {
            console.log(`Server is on ${HOST}:${PORT}`);
        });
    })
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });
