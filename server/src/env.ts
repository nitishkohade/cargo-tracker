export const SERVER_HOST: string = process.env.SERVER_HOST || 'localhost';
export const SERVER_PORT: number = Number(process.env.SERVER_PORT) || 3000;
export const DB_CONFIG = require('./config/config.json')