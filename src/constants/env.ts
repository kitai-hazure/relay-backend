import * as dotenv from 'dotenv';
dotenv.config();

export const { PORT, MONGODB_URL, JWT_SECRET_KEY } = process.env;
