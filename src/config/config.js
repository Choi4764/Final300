import {DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT} from '../constants/env.js'
import { TOWN_SESSION_ID } from '../constants/session.js'

export const config = {
    server: {
        port: PORT,
        host: HOST,
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