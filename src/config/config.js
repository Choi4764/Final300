import {PORT, HOST, DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT} from '../constants/env.js'
import { PACKET_TYPE_LENGTH, TOTAL_LENGTH } from '../constants/header.js'

import { TOWN_SESSION_ID } from '../constants/session.js'

export const config = {
    server: {
        port: PORT,
        host: HOST,
    },
    packet: {
        totalLength: TOTAL_LENGTH,
        typeLength: PACKET_TYPE_LENGTH,
    },

    database: {
        database: DB_NAME,
        user: DB_USER,
        password: DB_PASSWORD,
        host: DB_HOST,
        port: DB_PORT,
    },

    session: {
        townId: TOWN_SESSION_ID,
    },
}