import { config } from 'dotenv';
config();

export const url = process.env.MONGO_URI;
