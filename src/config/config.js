import {PORT, HOST, DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT} from '../constants/env.js'
import { PACKET_HEADER_LENGTH, PACKET_ID_LENGTH, PACKET_SIZE_LENGTH } from '../constants/header.js'

export const config = {
    server: {
        port: PORT,
        host: HOST,
    },
    packet: {
        packetSizeLength: PACKET_SIZE_LENGTH,
        packetIdLength: PACKET_ID_LENGTH,
        packetHeaderLength: PACKET_HEADER_LENGTH,
    },

    database: {
        database: DB_NAME,
        user: DB_USER,
        password: DB_PASSWORD,
        host: DB_HOST,
        port: DB_PORT,
    },
}