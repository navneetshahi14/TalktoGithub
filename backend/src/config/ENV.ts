import dotenv from 'dotenv';
dotenv.config({quiet:true});


export const ENV = {
    PORT:process.env.PORT,
    DB_URL:process.env.DB_URL,
    REDIS_URL: process.env.REDIS_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    
}