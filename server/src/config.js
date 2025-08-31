import dotenv from 'dotenv';
dotenv.config();
export const PORT = process.env.PORT || 4000;
export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://pandeyshreya9967_db_user:tTaBzZbtgqsqZIue@cluster0.jsohb1g.mongodb.net/smca';

export const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

