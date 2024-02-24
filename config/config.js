import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 8888;

export const mongoDBURL = process.env.DATABASE_URL
