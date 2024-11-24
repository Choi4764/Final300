import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 5555;
export const HOST = process.env.HOST || '127.0.0.1';

export const DB_NAME = process.env.DB_NAME || 'MORPG';
export const DB_USER = process.env.DB_USER || 'root';
export const DB_PASSWORD = process.env.DB_PASSWORD || 'rlatjsdn1';
export const DB_HOST = process.env.DB_HOST || '127.0.0.1';
export const DB_PORT = process.env.DB_PORT || 3306;